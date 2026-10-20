-- Ejecuta todo este archivo en Supabase > SQL Editor > New query.
create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) <= 160),
  description text not null default '',
  starts_at timestamptz,
  location text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) <= 160),
  summary text not null default '',
  body text not null default '',
  image_url text not null default '',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) <= 160),
  image_url text not null,
  caption text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.news enable row level security;
alter table public.gallery enable row level security;

-- Lectura pública solo de elementos publicados. No se permite escritura anónima.
drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events" on public.events for select to anon, authenticated using (published = true);
drop policy if exists "Public can read published news" on public.news;
create policy "Public can read published news" on public.news for select to anon, authenticated using (published = true);
drop policy if exists "Public can read published gallery" on public.gallery;
create policy "Public can read published gallery" on public.gallery for select to anon, authenticated using (published = true);

-- Solo usuarios autenticados pueden administrar el contenido. Crea usuarios solo para administradores autorizados.
drop policy if exists "Authenticated admins manage events" on public.events;
create policy "Authenticated admins manage events" on public.events for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Authenticated admins manage news" on public.news;
create policy "Authenticated admins manage news" on public.news for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Authenticated admins manage gallery" on public.gallery;
create policy "Authenticated admins manage gallery" on public.gallery for all to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create index if not exists events_published_starts_at_idx on public.events (published, starts_at);
create index if not exists news_published_published_at_idx on public.news (published, published_at desc);
create index if not exists gallery_published_created_at_idx on public.gallery (published, created_at desc);
