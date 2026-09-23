import { NextResponse } from 'next/server';
import { getSupabase, isSupabaseConfigured, SIGNUPS_TABLE } from '@/lib/supabase';
import { SIGNUP_INTENTS, type SignupIntent } from '@/lib/company';

export const runtime = 'nodejs';
/** Never cached — every request is a write. */
export const dynamic = 'force-dynamic';

const INTENTS = Object.keys(SIGNUP_INTENTS) as SignupIntent[];

/** Field lengths mirror the CHECK constraints on the table. */
const LIMITS = {
  email: 254,
  name: 120,
  city: 160,
  business: 160,
  firm: 160,
  about: 2000,
  source_path: 400,
  user_agent: 500,
} as const;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Crude per-IP rate limit.
 *
 * In-memory, so it resets on cold start and is per-instance — it deters casual
 * abuse and nothing more. Real protection belongs at the edge (a WAF rule, or
 * Upstash/Redis if this ever matters). Documented rather than pretended.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number): string | null => {
  if (typeof v !== 'string') return null;
  const trimmed = v.trim().slice(0, max);
  return trimmed.length ? trimmed : null;
};

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please try again shortly.' },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: a field hidden from humans. Anything that fills it is a bot.
  // Return 200 so the bot believes it succeeded and does not retry.
  if (clean(body.company_website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const intent = body.intent;
  if (typeof intent !== 'string' || !INTENTS.includes(intent as SignupIntent)) {
    return NextResponse.json({ ok: false, error: 'Unknown signup type.' }, { status: 400 });
  }

  const email = clean(body.email, LIMITS.email)?.toLowerCase() ?? null;
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: 'Please enter a valid email address.' },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured) {
    console.error('[frolic] signup received but Supabase is not configured', { intent, email });
    return NextResponse.json(
      { ok: false, error: 'Signups are temporarily unavailable.' },
      { status: 503 },
    );
  }

  const row = {
    intent,
    email,
    name: clean(body.name, LIMITS.name),
    city: clean(body.city, LIMITS.city),
    business: clean(body.business, LIMITS.business),
    firm: clean(body.firm, LIMITS.firm),
    about: clean(body.about, LIMITS.about),
    source_path: clean(body.source_path, LIMITS.source_path),
    user_agent: clean(request.headers.get('user-agent'), LIMITS.user_agent),
  };

  const { error } = await getSupabase().from(SIGNUPS_TABLE).insert(row);

  if (error) {
    // 23505 = unique violation: they already signed up for this intent. That is
    // a success from the visitor's point of view, not an error to show them.
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, alreadySignedUp: true });
    }
    console.error('[frolic] signup insert failed', { code: error.code, message: error.message });
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
