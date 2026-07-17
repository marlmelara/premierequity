-- Premier Equity — full database setup.
-- Paste this into the SQL Editor of a fresh Supabase project to recreate
-- everything the site needs: the leads table, the admins allowlist, the
-- is_admin() function, and all row-level-security policies.
--
-- Safe to run more than once (idempotent).

-- ── Leads (public contact form target) ─────────────────────────────────────
create table if not exists public.leads (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  phone      text not null,
  acres      text not null,
  address    text not null,
  reason     text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- Anyone (anon) may submit a lead, but only insert — never read/update/delete.
drop policy if exists "Anyone can submit a lead" on public.leads;
create policy "Anyone can submit a lead"
  on public.leads for insert to anon with check (true);

-- ── Admin allowlist (who may read leads in the dashboard) ───────────────────
create table if not exists public.admins (
  email      text primary key,
  created_at timestamptz not null default now()
);

-- RLS on, no policies: the table is unreadable except via the SECURITY DEFINER
-- function below and the service role.
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where email = (auth.jwt() ->> 'email')
  );
$$;

revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Authenticated admins may read leads.
drop policy if exists "Admins can read leads" on public.leads;
create policy "Admins can read leads"
  on public.leads for select to authenticated
  using (public.is_admin());

-- ── Lead pipeline status (dashboard labels) ─────────────────────────────────
alter table public.leads
  add column if not exists status text not null default 'new',
  add column if not exists status_updated_at timestamptz;

do $$ begin
  alter table public.leads add constraint leads_status_check
    check (status in ('new','contacted','negotiating','offer_sent','won','lost'));
exception when duplicate_object then null; end $$;

-- Stamp status_updated_at automatically whenever the status actually changes.
create or replace function public.stamp_lead_status_change()
returns trigger language plpgsql as $$
begin
  if new.status is distinct from old.status then
    new.status_updated_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_stamp_lead_status on public.leads;
create trigger trg_stamp_lead_status
  before update on public.leads
  for each row execute function public.stamp_lead_status_change();

-- Admins may update leads (used by the dashboard to set the status label).
drop policy if exists "Admins can update leads" on public.leads;
create policy "Admins can update leads"
  on public.leads for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- Admins may delete leads (used by the dashboard to remove test/spam entries).
drop policy if exists "Admins can delete leads" on public.leads;
create policy "Admins can delete leads"
  on public.leads for delete to authenticated
  using (public.is_admin());

-- ── Seed the owner as an admin ──────────────────────────────────────────────
-- The matching Supabase Auth user must be created separately
-- (Authentication → Users → Add user, with "Auto Confirm").
insert into public.admins (email) values ('marlon@premierequityoffers.com')
  on conflict (email) do nothing;
