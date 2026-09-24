import 'server-only';
import { createClient } from '@supabase/supabase-js';

/**
 * Two clients, two powers.
 *
 * `leadWriter` uses the PUBLISHABLE key — RLS lets it insert a new lead and
 * nothing else. It is what the public /api/lead route uses.
 *
 * `leadAdmin` uses the SECRET key and bypasses RLS. Only the /admin dashboard
 * (behind Basic Auth in middleware.ts) uses it. `server-only` makes importing
 * this module from a client component a build error.
 */

const url = process.env.SUPABASE_URL;
const publishable = process.env.SUPABASE_PUBLISHABLE_KEY;
const secret = process.env.SUPABASE_SECRET_KEY;

export const LEADS_TABLE = 'mithaiwallah_leads';

export const isLeadStoreConfigured = Boolean(url && publishable);
export const isAdminConfigured = Boolean(url && secret);

const opts = { auth: { persistSession: false, autoRefreshToken: false } };

export function leadWriter() {
  if (!url || !publishable) throw new Error('Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.');
  return createClient(url, publishable, opts);
}

export function leadAdmin() {
  if (!url || !secret) throw new Error('Set SUPABASE_URL and SUPABASE_SECRET_KEY.');
  return createClient(url, secret, opts);
}
