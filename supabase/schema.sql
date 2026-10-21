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

-- Almacenamiento público de imágenes de noticias y galería.
-- Ejecuta esta sección también si las tablas ya estaban creadas.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 8388608, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view site media" on storage.objects;
create policy "Public can view site media" on storage.objects
  for select to public using (bucket_id = 'site-media');

drop policy if exists "Admins can upload site media" on storage.objects;
create policy "Admins can upload site media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'site-media' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update site media" on storage.objects;
create policy "Admins can update site media" on storage.objects
  for update to authenticated
  using (bucket_id = 'site-media' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
  with check (bucket_id = 'site-media' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can delete site media" on storage.objects;
create policy "Admins can delete site media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'site-media' and (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
