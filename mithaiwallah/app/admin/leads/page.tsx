import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { LEAD_STATUSES, LEAD_TYPES, LEAD_TYPE_KEYS } from '@/lib/leads';
import { LEADS_TABLE, isAdminConfigured, leadAdmin } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { updateLead } from './actions';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Lead dashboard', robots: { index: false, follow: false } };

type Lead = {
  id: string;
  created_at: string;
  reference: string;
  lead_type: keyof typeof LEAD_TYPES;
  status: (typeof LEAD_STATUSES)[number];
  priority: 'hot' | 'warm' | 'cold';
  name: string;
  phone: string;
  email: string | null;
  company: string | null;
  city: string | null;
  event_date: string | null;
  message: string | null;
  details: Record<string, string>;
  marketing_opt_in: boolean;
  source_path: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  notes: string | null;
};

const PRIORITY_STYLE = { hot: 'bg-maroon text-cream', warm: 'bg-gold-200 text-gold-900', cold: 'bg-cream-300 text-ink-soft' };

export default async function LeadsDashboard({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  if (!isAdminConfigured) {
    return (
      <main className="container-luxe py-20">
        <h1 className="font-display text-4xl text-maroon">Lead dashboard</h1>
        <p className="mt-4 text-ink-soft">Set SUPABASE_URL and SUPABASE_SECRET_KEY on the server to enable this dashboard.</p>
      </main>
    );
  }

  const { type, status, priority } = searchParams;
  let q = leadAdmin().from(LEADS_TABLE).select('*').order('created_at', { ascending: false }).limit(500);
  if (type && type in LEAD_TYPES) q = q.eq('lead_type', type);
  if (status && (LEAD_STATUSES as readonly string[]).includes(status)) q = q.eq('status', status);
  if (priority && ['hot', 'warm', 'cold'].includes(priority)) q = q.eq('priority', priority);
  const { data, error } = await q;
  const leads = (data ?? []) as Lead[];

  const since = (days: number) => leads.filter((l) => Date.now() - new Date(l.created_at).getTime() < days * 86_400_000).length;
  const open = leads.filter((l) => !['won', 'lost'].includes(l.status));
  const won = leads.filter((l) => l.status === 'won').length;
  const closed = won + leads.filter((l) => l.status === 'lost').length;
  const bySource = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => {
      const k = l.utm_source || 'direct / organic';
      acc[k] = (acc[k] ?? 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const filterHref = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    const merged = { type, status, priority, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
    const s = p.toString();
    return `/admin/leads${s ? `?${s}` : ''}`;
  };

  return (
    <main className="min-h-screen bg-cream-100 pb-20">
      <header className="border-b border-gold-300/60 bg-cream-50">
        <div className="container-luxe flex h-20 items-center justify-between">
          <Logo showHindi={false} />
          <div className="flex items-center gap-4 text-sm">
            <span className="text-ink-muted">Lead dashboard</span>
            <Link href={`/admin/leads/export${filterHref({}).replace('/admin/leads', '')}`} className="rounded-full bg-maroon px-4 py-2 font-semibold text-cream">
              Export CSV
            </Link>
          </div>
        </div>
      </header>

      <div className="container-luxe mt-10">
        {error && <p className="mb-6 rounded-xl bg-maroon-50 p-4 text-maroon">Could not load leads: {error.message}</p>}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'Last 7 days', value: since(7) },
            { label: 'Last 30 days', value: since(30) },
            { label: 'Open pipeline', value: open.length },
            { label: 'Hot & open', value: open.filter((l) => l.priority === 'hot').length },
            { label: 'Win rate (closed)', value: closed ? `${Math.round((won / closed) * 100)}%` : '—' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-gold-300/60 bg-cream-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">{s.label}</p>
              <p className="mt-2 font-display text-4xl font-semibold text-maroon">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-2xl border border-gold-300/60 bg-cream-50 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">By type</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {LEAD_TYPE_KEYS.map((k) => (
                <span key={k} className="rounded-full border border-gold-300/60 px-3 py-1 text-sm">
                  {LEAD_TYPES[k].short}: <strong>{leads.filter((l) => l.lead_type === k).length}</strong>
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-gold-300/60 bg-cream-50 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">Top sources</p>
            <ul className="mt-3 space-y-1 text-sm">
              {bySource.slice(0, 5).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span>{k}</span>
                  <strong>{v}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <nav className="mt-8 flex flex-wrap gap-2 text-sm" aria-label="Filters">
          <Link href="/admin/leads" className="rounded-full border border-gold-300 px-3 py-1.5">
            All
          </Link>
          {LEAD_TYPE_KEYS.map((k) => (
            <Link key={k} href={filterHref({ type: k })} className={cn('rounded-full border px-3 py-1.5', type === k ? 'border-maroon bg-maroon text-cream' : 'border-gold-300')}>
              {LEAD_TYPES[k].short}
            </Link>
          ))}
          <span className="mx-2 text-gold-500">|</span>
          {(['hot', 'warm', 'cold'] as const).map((p) => (
            <Link key={p} href={filterHref({ priority: p })} className={cn('rounded-full border px-3 py-1.5 capitalize', priority === p ? 'border-maroon bg-maroon text-cream' : 'border-gold-300')}>
              {p}
            </Link>
          ))}
          <span className="mx-2 text-gold-500">|</span>
          {LEAD_STATUSES.map((s) => (
            <Link key={s} href={filterHref({ status: s })} className={cn('rounded-full border px-3 py-1.5 capitalize', status === s ? 'border-maroon bg-maroon text-cream' : 'border-gold-300')}>
              {s}
            </Link>
          ))}
        </nav>

        <section className="mt-6 space-y-3">
          {leads.length === 0 && <p className="rounded-2xl bg-cream-50 p-8 text-center text-ink-muted">No leads match these filters yet.</p>}
          {leads.map((l) => (
            <article key={l.id} className="grid gap-4 rounded-2xl border border-gold-300/60 bg-cream-50 p-5 lg:grid-cols-[1.4fr_1.2fr_1fr]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold uppercase', PRIORITY_STYLE[l.priority])}>{l.priority}</span>
                  <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-semibold">{LEAD_TYPES[l.lead_type]?.short ?? l.lead_type}</span>
                  <span className="text-xs text-ink-muted">
                    {l.reference} · {new Date(l.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}
                  </span>
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold text-maroon">
                  {l.name}
                  {l.company && <span className="text-ink-soft"> · {l.company}</span>}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">
                  <a className="underline" href={`tel:${l.phone.replace(/[\s-]/g, '')}`}>{l.phone}</a>
                  {' · '}
                  <a className="text-[#1F7A4D] underline" href={`https://wa.me/${l.phone.replace(/\D/g, '').replace(/^(\d{10})$/, '91$1')}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                  {l.email && (
                    <>
                      {' · '}
                      <a className="underline" href={`mailto:${l.email}`}>{l.email}</a>
                    </>
                  )}
                  {l.city && ` · ${l.city}`}
                </p>
              </div>
              <div className="text-sm text-ink-soft">
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
                  {l.event_date && (
                    <>
                      <dt className="text-ink-muted">Date</dt>
                      <dd>{l.event_date}</dd>
                    </>
                  )}
                  {Object.entries(l.details ?? {}).map(([k, v]) => (
                    <div key={k} className="contents">
                      <dt className="capitalize text-ink-muted">{k.replace(/_/g, ' ')}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                  <dt className="text-ink-muted">Source</dt>
                  <dd>
                    {l.utm_source ?? 'direct'}
                    {l.utm_campaign ? ` / ${l.utm_campaign}` : ''} · {l.source_path}
                  </dd>
                </dl>
                {l.message && <p className="mt-2 rounded-lg bg-cream p-2 italic">“{l.message}”</p>}
              </div>
              <form action={updateLead} className="flex flex-col gap-2">
                <input type="hidden" name="id" value={l.id} />
                <select name="status" defaultValue={l.status} className="field py-2 capitalize">
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <textarea name="notes" defaultValue={l.notes ?? ''} rows={2} placeholder="Notes" className="field py-2 text-sm" />
                <button className="rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-cream">Save</button>
              </form>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
