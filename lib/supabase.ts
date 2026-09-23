import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for signup writes.
 *
 * SERVER ONLY. The env vars are deliberately NOT prefixed `NEXT_PUBLIC_`, so
 * this module must never be imported into a client component — doing so will
 * fail the build rather than silently shipping credentials to the browser.
 *
 * It uses the publishable (anon) key rather than the service-role key, on
 * purpose. With RLS as configured, that key can only INSERT into
 * `frolic_signups`: it cannot read the list, update it or delete from it. If
 * the key ever leaked, the worst case is junk rows, not a stolen mailing list.
 * The service-role key would turn the same leak into a data breach, and this
 * route has no need for that power.
 */

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export function getSupabase() {
  if (!url || !key) {
    throw new Error(
      'Supabase is not configured. Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY.',
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const SIGNUPS_TABLE = 'frolic_signups';
