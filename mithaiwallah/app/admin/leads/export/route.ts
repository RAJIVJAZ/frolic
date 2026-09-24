import { LEAD_STATUSES, LEAD_TYPES } from '@/lib/leads';
import { LEADS_TABLE, isAdminConfigured, leadAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const COLUMNS = [
  'reference', 'created_at', 'lead_type', 'priority', 'status', 'name', 'phone', 'email', 'company', 'city',
  'event_date', 'details', 'message', 'marketing_opt_in', 'utm_source', 'utm_medium', 'utm_campaign', 'source_path', 'notes',
] as const;

/** Quote every cell; neutralise leading =+-@ so the CSV cannot run formulas in Excel. */
const cell = (v: unknown) => {
  let s = v === null || v === undefined ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

/** GET /admin/leads/export — behind the same Basic Auth as the dashboard. */
export async function GET(request: Request) {
  if (!isAdminConfigured) return new Response('Not configured', { status: 503 });
  const params = new URL(request.url).searchParams;
  let q = leadAdmin().from(LEADS_TABLE).select(COLUMNS.join(',')).order('created_at', { ascending: false }).limit(5000);
  const type = params.get('type');
  const status = params.get('status');
  const priority = params.get('priority');
  if (type && type in LEAD_TYPES) q = q.eq('lead_type', type);
  if (status && (LEAD_STATUSES as readonly string[]).includes(status)) q = q.eq('status', status);
  if (priority && ['hot', 'warm', 'cold'].includes(priority)) q = q.eq('priority', priority);
  const { data, error } = await q;
  if (error) return new Response(error.message, { status: 500 });
  const rows = (data ?? []) as unknown as Record<string, unknown>[];
  const csv = [COLUMNS.join(','), ...rows.map((r) => COLUMNS.map((c) => cell(r[c])).join(','))].join('\n');
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="mithaiwallah-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
