# 18 · Waitlist Signups — Supabase

The signup forms write to Supabase. This records the schema, the security
model, and the one setting that still needs changing.

## Setup

| | |
|---|---|
| Project | `service` (`qpjevyoqgugsztwzjfyw`), region `ap-southeast-1` |
| Table | `public.frolic_signups` |
| View | `public.frolic_signup_summary` — daily counts by intent |
| Endpoint | `POST /api/signup` |
| Client | `lib/supabase.ts` — **server only** |

## Security model

The key decision: the API route uses the **publishable (anon) key**, not the
service-role key.

With RLS as configured, that key can only `INSERT` into `frolic_signups`. It
cannot read the list, update it or delete from it. If the key ever leaked, the
worst case is junk rows — not a stolen mailing list. The service-role key would
turn the same leak into a data breach, and this route has no need for that
power.

```sql
alter table public.frolic_signups enable row level security;

create policy "anon can insert signups"
  on public.frolic_signups for insert to anon with check (true);

-- Deliberately no select / update / delete policies.
```

### Verified, not assumed

Policies were tested by actually assuming the `anon` role, rather than by
reading the policy text:

| Operation as `anon` | Result |
|---|---|
| `INSERT` | **succeeds** |
| `SELECT` | **0 rows** |
| `UPDATE` | **0 rows affected** |
| `DELETE` | **0 rows affected** |

Constraints were tested the same way:

| Case | Result |
|---|---|
| Invalid email format | rejected |
| Unknown intent value | rejected |
| Duplicate email + intent | rejected |
| Same email, different intent | allowed |

The env vars are **not** prefixed `NEXT_PUBLIC_`, so importing `lib/supabase.ts`
into a client component fails the build rather than silently shipping
credentials to the browser.

## Schema

```
id           uuid pk
created_at   timestamptz
intent       waitlist | taster | distributor | investor | partnership
email        validated + length-capped, lowercased by the route
name
city         taster
business     distributor
firm         investor
about        partnership
source_path  which page converted
user_agent
unique (email, intent)
```

## Route behaviour

| Input | Response |
|---|---|
| Valid signup | `200 {ok:true}` |
| Already signed up for that intent | `200 {ok:true, alreadySignedUp:true}` — not an error to the visitor |
| Invalid email | `400` with a usable message |
| Unknown intent | `400` |
| Honeypot filled | `200 {ok:true}` — bot believes it worked, nothing written |
| > 5 requests/min/IP | `429` |
| Supabase unreachable | `500`, logged server-side, error shown to the visitor |

A failure is **surfaced**, not swallowed. A waitlist form that silently drops
submissions is worse than no form, because you never find out.

### Rate limiting is deliberately weak

In-memory and per-instance, so it resets on cold start. It deters casual abuse
and nothing more. Real protection belongs at the edge — a WAF rule, or
Upstash/Redis if volume ever justifies it. Documented rather than pretended.

## Reading the signups

Anon cannot read the table, by design. Use either:

- **Supabase dashboard** → Table Editor → `frolic_signups`
- **SQL Editor** → `select * from frolic_signup_summary;` for daily counts

Export to CSV from the dashboard when you need to mail the list.

## One setting still needs changing

**This container cannot reach `qpjevyoqgugsztwzjfyw.supabase.co`** — the
environment's network policy denies it, so the endpoint returns 500 when tested
from here. Everything else was verified directly against the database.

Add that host to the environment's allowed domains (cloud environment menu in
the session title bar → Edit → Network access) to test locally. It does not
affect production: a deployed app reaches Supabase normally.

## Deploying

Set these in the hosting provider (Vercel → Settings → Environment Variables):

```
SUPABASE_URL=https://qpjevyoqgugsztwzjfyw.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_…
NEXT_PUBLIC_SITE_URL=https://frolic.in
```

`.env.example` documents the shape. `.env.local` holds the real values locally
and is gitignored — **the key is not in this repository.**
