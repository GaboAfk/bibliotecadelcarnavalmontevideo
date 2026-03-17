-- =============================================================================
-- Biblioteca del Carnaval Montevideano — Supabase Schema
-- =============================================================================
-- Run this entire file in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Safe to re-run: all statements use IF NOT EXISTS / ON CONFLICT DO NOTHING.
-- =============================================================================


-- ---------------------------------------------------------------------------
-- EXTENSIONS
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";   -- for gen_random_uuid()


-- =============================================================================
-- 1. CATEGORIES
--    The five competition categories: murgas, humoristas, parodistas,
--    revistas, sociedades.  Matches src/data/categoriesData.ts → Category[]
-- =============================================================================
create table if not exists public.categories (
    id         uuid primary key default gen_random_uuid(),
    slug       text not null unique,          -- "murgas", "humoristas", …
    name       text not null,                 -- "Murgas", "Sociedad de negros y lubolos", …
    image      text,                          -- hero image URL / storage path
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- 2. CONJUNTOS  (a.k.a. entities / groups)
--    One row per murga / humorista / parodista / revista / sociedad.
--    Matches MurgaData / HumoristaData / ParodistaData / … interfaces.
-- ---------------------------------------------------------------------------
create table if not exists public.conjuntos (
    id           uuid primary key default gen_random_uuid(),
    category_id  uuid not null references public.categories(id) on delete cascade,
    slug         text not null,               -- URL key, e.g. "agarrate-catalina"
    name         text not null,               -- Display name, e.g. "Agarrate Catalina"
    description  text,
    history      text,
    information  text,
    image        text,                        -- profile / cover image
    created_at   timestamptz not null default now(),
    updated_at   timestamptz not null default now(),
    unique (category_id, slug)
);

-- ---------------------------------------------------------------------------
-- 3. CONJUNTO_POSITIONS
--    Competition placement records per conjunto.
--    Matches the positions?: string[] array, e.g. "Primer lugar 2023"
-- ---------------------------------------------------------------------------
create table if not exists public.conjunto_positions (
    id           uuid primary key default gen_random_uuid(),
    conjunto_id  uuid not null references public.conjuntos(id) on delete cascade,
    position     text not null,               -- e.g. "Primer lugar 2023"
    year         int,                         -- extracted year for easy sorting (nullable)
    sort_order   int not null default 0
);

-- ---------------------------------------------------------------------------
-- 4. CONJUNTO_DISCOGRAPHY
--    Album / recording entries per conjunto.
--    Matches discography?: string[]
-- ---------------------------------------------------------------------------
create table if not exists public.conjunto_discography (
    id           uuid primary key default gen_random_uuid(),
    conjunto_id  uuid not null references public.conjuntos(id) on delete cascade,
    title        text not null,               -- e.g. "Agarrate Catalina - Álbum 2023"
    sort_order   int not null default 0
);

-- ---------------------------------------------------------------------------
-- 5. CONJUNTO_TRIVIA
--    Fun facts per conjunto.
--    Matches trivia?: string[]
-- ---------------------------------------------------------------------------
create table if not exists public.conjunto_trivia (
    id           uuid primary key default gen_random_uuid(),
    conjunto_id  uuid not null references public.conjuntos(id) on delete cascade,
    fact         text not null,
    sort_order   int not null default 0
);

-- ---------------------------------------------------------------------------
-- 6. CONJUNTO_GALLERY
--    Gallery images for the conjunto profile page (not show-specific).
--    Matches gallery?: string[]
-- ---------------------------------------------------------------------------
create table if not exists public.conjunto_gallery (
    id           uuid primary key default gen_random_uuid(),
    conjunto_id  uuid not null references public.conjuntos(id) on delete cascade,
    url          text not null,               -- Supabase Storage public URL or external URL
    caption      text,
    sort_order   int not null default 0
);

-- ---------------------------------------------------------------------------
-- 7. ESPECTACULOS  (shows)
--    One row per yearly show / espectáculo.
--    Matches the Show interface.
-- ---------------------------------------------------------------------------
create table if not exists public.espectaculos (
    id              uuid primary key default gen_random_uuid(),
    conjunto_id     uuid not null references public.conjuntos(id) on delete cascade,
    slug            text not null,            -- show URL key, e.g. "el-viaje"
    title           text not null,
    image           text,                     -- main show poster / photo
    year            int,
    promotion_date  date,
    data            text,                     -- free-text "Datos" block (credits paragraph, notes)
    created_at      timestamptz not null default now(),
    updated_at      timestamptz not null default now(),
    unique (conjunto_id, slug)
);

-- ---------------------------------------------------------------------------
-- 8. ESPECTACULO_REPERTOIRE
--    Ordered list of songs / cuadros in a show.
--    Matches repertoire?: ShowSection[]  →  { title, content?, lyrics? }
-- ---------------------------------------------------------------------------
create table if not exists public.espectaculo_repertoire (
    id              uuid primary key default gen_random_uuid(),
    espectaculo_id  uuid not null references public.espectaculos(id) on delete cascade,
    title           text not null,
    content         text,                     -- prose description / notes
    lyrics          text,                     -- song lyrics (multiline)
    sort_order      int not null default 0
);

-- ---------------------------------------------------------------------------
-- 9. ESPECTACULO_CREDITS
--    Production credits for a show.
--    Matches credits?: ShowCredit[]  →  { role, names: string[] }
-- ---------------------------------------------------------------------------
create table if not exists public.espectaculo_credits (
    id              uuid primary key default gen_random_uuid(),
    espectaculo_id  uuid not null references public.espectaculos(id) on delete cascade,
    role            text not null,            -- e.g. "Director Responsable"
    names           text[] not null,          -- e.g. ARRAY['Yamandú Cardozo']
    sort_order      int not null default 0
);

-- ---------------------------------------------------------------------------
-- 10. ESPECTACULO_GALLERY
--     Photo gallery for a specific show.
--     Matches gallery?: string[] on Show
-- ---------------------------------------------------------------------------
create table if not exists public.espectaculo_gallery (
    id              uuid primary key default gen_random_uuid(),
    espectaculo_id  uuid not null references public.espectaculos(id) on delete cascade,
    url             text not null,
    caption         text,
    sort_order      int not null default 0
);

-- ---------------------------------------------------------------------------
-- 11. NOVEDADES  (news / updates)
--     Matches Novedad interface in src/data/novedades.ts
-- ---------------------------------------------------------------------------
create table if not exists public.novedades (
    id          uuid primary key default gen_random_uuid(),
    slug        text not null unique,         -- slugified title, used in URL
    title       text not null,
    description text,
    content     text,
    image       text,
    color       text,                         -- CSS var, e.g. "var(--color-carnaval-orange)"
    date        date not null default current_date,
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);


-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

alter table public.categories          enable row level security;
alter table public.conjuntos           enable row level security;
alter table public.conjunto_positions  enable row level security;
alter table public.conjunto_discography enable row level security;
alter table public.conjunto_trivia     enable row level security;
alter table public.conjunto_gallery    enable row level security;
alter table public.espectaculos        enable row level security;
alter table public.espectaculo_repertoire enable row level security;
alter table public.espectaculo_credits enable row level security;
alter table public.espectaculo_gallery enable row level security;
alter table public.novedades           enable row level security;

-- Public SELECT for all tables (frontend reads via anon key)
do $$
declare
    t text;
begin
    foreach t in array array[
        'categories','conjuntos','conjunto_positions','conjunto_discography',
        'conjunto_trivia','conjunto_gallery','espectaculos',
        'espectaculo_repertoire','espectaculo_credits','espectaculo_gallery',
        'novedades'
    ] loop
        execute format(
            'create policy "Public read %I" on public.%I for select using (true)',
            t, t
        );
    end loop;
end$$;

-- Authenticated INSERT / UPDATE / DELETE for all tables (admin panel uses service role
-- server-side; these policies guard direct client-key writes)
do $$
declare
    t text;
begin
    foreach t in array array[
        'categories','conjuntos','conjunto_positions','conjunto_discography',
        'conjunto_trivia','conjunto_gallery','espectaculos',
        'espectaculo_repertoire','espectaculo_credits','espectaculo_gallery',
        'novedades'
    ] loop
        execute format(
            'create policy "Authenticated write %I" on public.%I
             for all using (auth.role() = ''authenticated'')',
            t, t
        );
    end loop;
end$$;


-- =============================================================================
-- UPDATED_AT TRIGGER
-- =============================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

do $$
declare
    t text;
begin
    foreach t in array array[
        'categories','conjuntos','espectaculos','novedades'
    ] loop
        execute format(
            'create trigger trg_%I_updated_at
             before update on public.%I
             for each row execute function public.set_updated_at()',
            t, t
        );
    end loop;
end$$;


-- =============================================================================
-- STORAGE BUCKET: carnaval-images
-- =============================================================================
insert into storage.buckets (id, name, public)
values ('carnaval-images', 'carnaval-images', true)
on conflict (id) do nothing;

create policy "Public read carnaval-images"
    on storage.objects for select
    using (bucket_id = 'carnaval-images');

create policy "Authenticated upload carnaval-images"
    on storage.objects for insert
    with check (bucket_id = 'carnaval-images' and auth.role() = 'authenticated');

create policy "Authenticated update carnaval-images"
    on storage.objects for update
    using (bucket_id = 'carnaval-images' and auth.role() = 'authenticated');

create policy "Authenticated delete carnaval-images"
    on storage.objects for delete
    using (bucket_id = 'carnaval-images' and auth.role() = 'authenticated');


-- =============================================================================
-- SEED: Categories
-- =============================================================================
insert into public.categories (slug, name, image) values
    ('murgas',      'Murgas',                        '/images/murgas/murgas.png'),
    ('humoristas',  'Humoristas',                    '/images/humoristas/humoristas.jpg'),
    ('parodistas',  'Parodistas',                    '/images/parodistas/parodistas.jpg'),
    ('revistas',    'Revistas',                      '/images/revistas/revistas.jpg'),
    ('sociedades',  'Sociedad de negros y lubolos',  '/images/sociedades/sociedad_de_negros_y_lubolos.jpg')
on conflict (slug) do nothing;


-- =============================================================================
-- USEFUL VIEWS
-- =============================================================================

-- Full conjunto detail with nested arrays (handy for single-row API reads)
create or replace view public.v_conjuntos_full as
select
    c.id,
    c.slug,
    c.name,
    c.description,
    c.history,
    c.information,
    c.image,
    cat.slug                                        as category_slug,
    cat.name                                        as category_name,
    coalesce(
        (select jsonb_agg(p.position order by p.sort_order)
         from public.conjunto_positions p where p.conjunto_id = c.id),
        '[]'::jsonb)                                as positions,
    coalesce(
        (select jsonb_agg(d.title order by d.sort_order)
         from public.conjunto_discography d where d.conjunto_id = c.id),
        '[]'::jsonb)                                as discography,
    coalesce(
        (select jsonb_agg(t.fact order by t.sort_order)
         from public.conjunto_trivia t where t.conjunto_id = c.id),
        '[]'::jsonb)                                as trivia,
    coalesce(
        (select jsonb_agg(g.url order by g.sort_order)
         from public.conjunto_gallery g where g.conjunto_id = c.id),
        '[]'::jsonb)                                as gallery
from public.conjuntos c
join public.categories cat on cat.id = c.category_id;

-- Full espectáculo detail with nested arrays
create or replace view public.v_espectaculos_full as
select
    e.id,
    e.slug,
    e.title,
    e.image,
    e.year,
    e.promotion_date,
    e.data,
    e.conjunto_id,
    c.slug                                          as conjunto_slug,
    c.name                                          as conjunto_name,
    cat.slug                                        as category_slug,
    coalesce(
        (select jsonb_agg(
            jsonb_build_object(
                'title', r.title,
                'content', r.content,
                'lyrics', r.lyrics
            ) order by r.sort_order
         ) from public.espectaculo_repertoire r where r.espectaculo_id = e.id),
        '[]'::jsonb)                                as repertoire,
    coalesce(
        (select jsonb_agg(
            jsonb_build_object(
                'role', cr.role,
                'names', cr.names
            ) order by cr.sort_order
         ) from public.espectaculo_credits cr where cr.espectaculo_id = e.id),
        '[]'::jsonb)                                as credits,
    coalesce(
        (select jsonb_agg(g.url order by g.sort_order)
         from public.espectaculo_gallery g where g.espectaculo_id = e.id),
        '[]'::jsonb)                                as gallery
from public.espectaculos e
join public.conjuntos c    on c.id  = e.conjunto_id
join public.categories cat on cat.id = c.category_id;


-- =============================================================================
-- NOTES
-- =============================================================================
-- After running this schema:
--
-- 1. Migrate existing static data by running the companion migration script
--    (see README or /scripts/migrate-to-supabase.ts).
--
-- 2. Update src/lib/data-fetcher.ts and src/hooks/useCategoryData.ts to query
--    the normalized tables instead of the flat category_data JSONB column.
--
-- 3. Update /api/admin/entities to write to the normalized tables.
--
-- Storage paths convention:
--   conjuntos/{category_slug}/{conjunto_slug}/cover.jpg
--   espectaculos/{category_slug}/{conjunto_slug}/{show_slug}/poster.jpg
--   espectaculos/{category_slug}/{conjunto_slug}/{show_slug}/gallery/{n}.jpg
--   novedades/{novedad_slug}/image.jpg
-- =============================================================================
