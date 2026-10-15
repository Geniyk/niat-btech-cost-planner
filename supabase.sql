-- Run in Supabase SQL Editor. Only server-side code uses the service-role key.
create extension if not exists pgcrypto;

create table if not exists public.planner_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text,
  phone text,
  city text,
  budget numeric,
  stage text,
  interest text,
  language text,
  university_fee numeric,
  program_fee numeric,
  hostel_fee numeric,
  entered_total numeric not null default 0,
  source text,
  consent boolean not null default false
);

alter table public.planner_leads enable row level security;
-- No public policies are created. The server route uses SUPABASE_SERVICE_ROLE_KEY.
-- Never put the service-role key in a NEXT_PUBLIC_* variable.