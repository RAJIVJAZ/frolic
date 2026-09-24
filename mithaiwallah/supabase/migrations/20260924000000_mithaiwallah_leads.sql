-- Mithaiwallah lead capture.
--
-- Security model (same as FROLIC's signups table):
--   * The website writes with the PUBLISHABLE key. RLS lets that key INSERT a
--     row with status 'new' and nothing else — it cannot read, update or
--     delete. A leaked key costs junk rows, not the customer list.
--   * The lead dashboard reads and updates with the SECRET key, server-side
--     only, behind HTTP Basic Auth.

create table if not exists public.mithaiwallah_leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  reference       text not null unique check (reference ~ '^MW-[A-Z0-9]{6}$'),
  lead_type       text not null check (lead_type in ('corporate', 'wedding', 'wholesale', 'franchise', 'retail')),
  status          text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'quoted', 'won', 'lost')),
  priority        text not null default 'warm' check (priority in ('hot', 'warm', 'cold')),

  name            text not null check (char_length(name) between 1 and 120),
  phone           text not null check (phone ~ '^\+?[0-9][0-9 -]{8,16}$'),
  email           text check (email is null or (char_length(email) <= 254 and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$')),
  company         text check (char_length(company) <= 160),
  city            text check (char_length(city) <= 120),
  event_date      date,
  message         text check (char_length(message) <= 2000),
  details         jsonb not null default '{}'::jsonb check (pg_column_size(details) <= 4000),

  consent         boolean not null check (consent),
  marketing_opt_in boolean not null default false,

  source_path     text check (char_length(source_path) <= 400),
  landing_path    text check (char_length(landing_path) <= 400),
  referrer        text check (char_length(referrer) <= 500),
  utm_source      text check (char_length(utm_source) <= 120),
  utm_medium      text check (char_length(utm_medium) <= 120),
  utm_campaign    text check (char_length(utm_campaign) <= 160),
  user_agent      text check (char_length(user_agent) <= 500),

  notes           text check (char_length(notes) <= 4000),
  updated_at      timestamptz not null default now()
);

comment on table public.mithaiwallah_leads is 'Mithaiwallah website enquiries. Anon may insert status=new only; no read policy by design. Dashboard reads with the secret key.';

create index if not exists mithaiwallah_leads_created_idx on public.mithaiwallah_leads (created_at desc);
create index if not exists mithaiwallah_leads_status_idx on public.mithaiwallah_leads (status, lead_type);

alter table public.mithaiwallah_leads enable row level security;

drop policy if exists "anon can insert new leads" on public.mithaiwallah_leads;
create policy "anon can insert new leads"
  on public.mithaiwallah_leads for insert to anon
  with check (status = 'new' and notes is null);

-- Deliberately no select / update / delete policies for anon or authenticated.

create or replace function public.mithaiwallah_touch_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists mithaiwallah_leads_touch on public.mithaiwallah_leads;
create trigger mithaiwallah_leads_touch
  before update on public.mithaiwallah_leads
  for each row execute function public.mithaiwallah_touch_updated_at();

-- Weekly pipeline for the dashboard and for BI tools. security_invoker so the
-- view obeys the caller's RLS (anon sees nothing).
create or replace view public.mithaiwallah_lead_pipeline
with (security_invoker = true) as
select
  date_trunc('week', created_at)::date as week,
  lead_type,
  count(*)                                        as leads,
  count(*) filter (where priority = 'hot')        as hot,
  count(*) filter (where status = 'won')          as won,
  count(*) filter (where status = 'lost')         as lost
from public.mithaiwallah_leads
group by 1, 2
order by 1 desc, 2;
