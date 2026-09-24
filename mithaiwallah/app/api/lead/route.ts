import { createHmac, randomInt } from 'node:crypto';
import { NextResponse } from 'next/server';
import { DETAIL_FIELDS, EMAIL_RE, LEAD_TYPES, PHONE_RE, isLeadType, type LeadType } from '@/lib/leads';
import { LEADS_TABLE, isLeadStoreConfigured, leadWriter } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/lead — every enquiry form on the site lands here.
 *
 *   1. validate against the same field list the form renders (lib/leads.ts)
 *   2. score it hot / warm / cold so the sales team calls the right people first
 *   3. store it in Supabase (insert-only key)
 *   4. forward it to the CRM / automation webhook, signed
 *   5. return a reference the visitor can quote on WhatsApp
 *
 * If storage is not configured but the webhook is, the lead still goes to the
 * webhook — a lead is never silently dropped because one system is missing.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/** Per-instance, in-memory. Deters casual abuse only; real limits belong at the edge. */
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null;
  const t = v.trim().slice(0, max);
  return t.length ? t : null;
};

const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I — read aloud over the phone
const newReference = () => 'MW-' + Array.from({ length: 6 }, () => REF_ALPHABET[randomInt(REF_ALPHABET.length)]).join('');

/** Bigger orders and nearer dates get called first. */
function score(type: LeadType, details: Record<string, string>, eventDate: string | null): 'hot' | 'warm' | 'cold' {
  const big = /^(250|500|1,000)/.test(details.quantity ?? '') || /^(200|500|1 tonne)/.test(details.volume ?? '');
  const days = eventDate ? (new Date(eventDate).getTime() - Date.now()) / 86_400_000 : null;
  const soon = days !== null && days >= 0 && days <= 45;
  if (type === 'franchise') return details.investment && !/Under/.test(details.investment) ? 'warm' : 'cold';
  if (big || (soon && type !== 'retail')) return 'hot';
  if (type === 'retail' && !soon) return 'cold';
  return 'warm';
}

async function forward(payload: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const body = JSON.stringify({ event: 'lead.created', lead: payload });
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (secret) headers['X-Mithaiwallah-Signature'] = createHmac('sha256', secret).update(body).digest('hex');
  try {
    const res = await fetch(url, { method: 'POST', headers, body, signal: AbortSignal.timeout(5000) });
    if (!res.ok) console.error('[mithaiwallah] lead webhook responded', res.status);
    return res.ok;
  } catch (err) {
    console.error('[mithaiwallah] lead webhook failed', err);
    return false;
  }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? request.headers.get('x-real-ip') ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: pretend success so the bot moves on.
  if (clean(body.company_website, 200)) return NextResponse.json({ ok: true, reference: newReference() });

  const type = body.lead_type;
  if (!isLeadType(type)) return NextResponse.json({ ok: false, error: 'Please choose an enquiry type.' }, { status: 400 });

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 20)?.replace(/\s+/g, ' ') ?? null;
  const email = clean(body.email, 254)?.toLowerCase() ?? null;
  if (!name) return NextResponse.json({ ok: false, error: 'Please tell us your name.' }, { status: 400 });
  if (!phone || !PHONE_RE.test(phone)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid mobile number.' }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please check your email address.' }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json({ ok: false, error: 'Please agree to be contacted about your enquiry.' }, { status: 400 });
  }

  // Type-specific answers: allow-listed names, bounded values.
  const def = LEAD_TYPES[type];
  const details: Record<string, string> = {};
  const raw = typeof body.details === 'object' && body.details ? (body.details as Record<string, unknown>) : {};
  for (const f of def.fields) {
    if (!DETAIL_FIELDS.has(f.name)) continue;
    const v = clean(raw[f.name], 160);
    if (!v) continue;
    if (f.options && !f.options.includes(v)) continue;
    details[f.name] = v;
  }
  for (const f of def.fields) {
    if (f.required && f.name !== 'event_date' && !details[f.name]) {
      return NextResponse.json({ ok: false, error: `Please fill in “${f.label}”.` }, { status: 400 });
    }
  }

  const eventDateRaw = clean(body.event_date, 10);
  const event_date = eventDateRaw && /^\d{4}-\d{2}-\d{2}$/.test(eventDateRaw) ? eventDateRaw : null;
  if (def.fields.some((f) => f.name === 'event_date' && f.required) && !event_date) {
    return NextResponse.json({ ok: false, error: 'Please add the date.' }, { status: 400 });
  }

  const reference = newReference();
  const row = {
    reference,
    lead_type: type,
    status: 'new',
    priority: score(type, details, event_date),
    name,
    phone,
    email,
    company: def.companyLabel ? clean(body.company, 160) : null,
    city: clean(body.city, 120),
    event_date,
    message: clean(body.message, 2000),
    details,
    consent: true,
    marketing_opt_in: body.marketing_opt_in === true,
    source_path: clean(body.source_path, 400),
    landing_path: clean(body.landing_path, 400),
    referrer: clean(body.referrer, 500),
    utm_source: clean(body.utm_source, 120),
    utm_medium: clean(body.utm_medium, 120),
    utm_campaign: clean(body.utm_campaign, 160),
    user_agent: clean(request.headers.get('user-agent'), 500),
  };

  let stored = false;
  if (isLeadStoreConfigured) {
    const { error } = await leadWriter().from(LEADS_TABLE).insert(row);
    if (error) {
      console.error('[mithaiwallah] lead insert failed', { code: error.code, message: error.message });
    } else {
      stored = true;
    }
  }

  const forwarded = await forward({ ...row, created_at: new Date().toISOString(), user_agent: undefined });

  if (!stored && !forwarded) {
    // Nothing captured it. Tell the visitor honestly and point them to WhatsApp/phone.
    console.error('[mithaiwallah] lead NOT captured — configure Supabase or LEAD_WEBHOOK_URL', { reference, type });
    return NextResponse.json(
      { ok: false, error: 'We could not send your enquiry just now. Please WhatsApp or call us instead.' },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, reference });
}
