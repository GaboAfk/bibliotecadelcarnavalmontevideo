-- ============================================================
-- MIGRACIÓN 001: Schema inicial - Biblioteca del Carnaval
-- ============================================================
-- Ejecutar en Supabase SQL Editor o como archivo de migración

-- ============================================================
-- 1. CATEGORIES
-- Representa las 5 categorías del carnaval
-- ============================================================
CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    slug        TEXT NOT NULL UNIQUE,
    image       TEXT,
    -- Info adicional para la página de cada categoría
    info_image       TEXT,
    info_alt         TEXT,
    info_badge       TEXT,
    info_description TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 2. AGRUPACIONES
-- Murgas, Humoristas, Parodistas, Revistas, Sociedades
-- ============================================================
CREATE TABLE agrupaciones (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug            TEXT NOT NULL UNIQUE,
    category_slug   TEXT NOT NULL REFERENCES categories(slug) ON DELETE RESTRICT,
    name            TEXT NOT NULL,
    description     TEXT,
    history         TEXT,
    information     TEXT,
    positions       TEXT[],     -- ej: ["2005: 1°", "2006: 1°", ...]
    discography     TEXT[],
    trivia          TEXT[],
    gallery         TEXT[],     -- array de URLs de imágenes
    disponible      BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agrupaciones_category ON agrupaciones(category_slug);
CREATE INDEX idx_agrupaciones_slug ON agrupaciones(slug);


-- ============================================================
-- 3. SHOWS
-- Espectáculos de cada agrupación (uno por año generalmente)
-- ============================================================
CREATE TABLE shows (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agrupacion_id   UUID NOT NULL REFERENCES agrupaciones(id) ON DELETE CASCADE,
    slug            TEXT NOT NULL,
    title           TEXT NOT NULL,
    image           TEXT,
    year            INTEGER,
    promotion_date  TEXT,
    data            TEXT,           -- campo libre para metadata adicional
    gallery         TEXT[],
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(agrupacion_id, slug)
);

CREATE INDEX idx_shows_agrupacion ON shows(agrupacion_id);
CREATE INDEX idx_shows_year ON shows(year);


-- ============================================================
-- 4. SHOW SECTIONS (Repertorio)
-- Las secciones/cuadros dentro de cada espectáculo
-- ============================================================
CREATE TABLE show_sections (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    show_id     UUID NOT NULL REFERENCES shows(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    content     TEXT,
    lyrics      TEXT,
    sort_order  INTEGER DEFAULT 0
);

CREATE INDEX idx_show_sections_show ON show_sections(show_id);


-- ============================================================
-- 5. STAFF
-- Personal técnico, componentes y créditos por espectáculo (unificado)
-- ============================================================
CREATE TABLE staff (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agrupacion_id UUID NOT NULL REFERENCES agrupaciones(id) ON DELETE CASCADE,
    show_id       UUID REFERENCES shows(id) ON DELETE CASCADE, -- NULL para staff general, no NULL para créditos de show específico
    role          TEXT NOT NULL,
    names         TEXT[] NOT NULL,
    category      TEXT NOT NULL, -- 'tecnico', 'componentes', 'bateria'
    order_index   INTEGER DEFAULT 0
);

CREATE INDEX idx_staff_agrupacion ON staff(agrupacion_id);
CREATE INDEX idx_staff_show ON staff(show_id);
CREATE INDEX idx_staff_category ON staff(category);


-- ============================================================
-- 6. NOVEDADES
-- Noticias y novedades de la biblioteca
-- ============================================================
CREATE TABLE novedades (
    id          TEXT PRIMARY KEY,   -- slug generado desde el título
    color       TEXT,
    title       TEXT NOT NULL,
    image       TEXT,
    description TEXT,
    content     TEXT,
    date        DATE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 7. CARNAVAL EDITIONS
-- Resultados del concurso oficial por año (ej: carnaval2026)
-- ============================================================
CREATE TABLE carnaval_editions (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year        INTEGER NOT NULL UNIQUE,
    title       TEXT NOT NULL,
    image       TEXT,
    alt         TEXT,
    badge       TEXT,
    intro       TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 8. PUNTAJES
-- Tabla de posiciones por categoría en cada edición
-- ============================================================
CREATE TABLE puntajes (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edition_id  UUID NOT NULL REFERENCES carnaval_editions(id) ON DELETE CASCADE,
    categoria   TEXT NOT NULL,  -- 'murgas', 'parodistas', 'sociedades', 'humoristas', 'revistas'
    puesto      INTEGER NOT NULL,
    nombre      TEXT NOT NULL,
    puntos      INTEGER NOT NULL
);

CREATE INDEX idx_puntajes_edition ON puntajes(edition_id);
CREATE INDEX idx_puntajes_categoria ON puntajes(categoria);


-- ============================================================
-- 9. MENCIONES
-- Premios y menciones del carnaval por edición
-- tipo puede ser:
--   'directa'              → mencionesDirectas (un solo ganador)
--   'tecnica_directa'      → mencionesTecnicasDirectas (por categoría)
--   'tecnica_nominacion'   → mencionesTecnicasNominacion (varios ganadores)
--   'colectiva'            → mencionesColectivas
--   'individual'           → mencionesIndividuales
-- ============================================================
CREATE TABLE menciones (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    edition_id  UUID NOT NULL REFERENCES carnaval_editions(id) ON DELETE CASCADE,
    tipo        TEXT NOT NULL,
    titulo      TEXT NOT NULL,
    seccion     TEXT,       -- agrupador para mencionesTecnicasDirectas
    categoria   TEXT,       -- subcategoría dentro del agrupador
    ganadores   TEXT[] NOT NULL
);

CREATE INDEX idx_menciones_edition ON menciones(edition_id);
CREATE INDEX idx_menciones_tipo ON menciones(tipo);


-- ============================================================
-- 10. HERO FRASES
-- Slides del hero de la home
-- ============================================================
CREATE TABLE hero_frases (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image       TEXT NOT NULL,
    subtitle    TEXT,
    title       TEXT NOT NULL,
    sort_order  INTEGER DEFAULT 0,
    active      BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 11. STATIC CONTENT
-- Contenido estático como "Nuestra Biblioteca"
-- ============================================================
CREATE TABLE static_content (
    id          TEXT PRIMARY KEY,   -- ej: 'nuestra-biblioteca'
    title       TEXT NOT NULL,
    body        TEXT,
    image       TEXT,
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Lectura pública, escritura solo autenticada
-- ============================================================
ALTER TABLE categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE agrupaciones        ENABLE ROW LEVEL SECURITY;
ALTER TABLE shows               ENABLE ROW LEVEL SECURITY;
ALTER TABLE show_sections       ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff               ENABLE ROW LEVEL SECURITY;
ALTER TABLE novedades           ENABLE ROW LEVEL SECURITY;
ALTER TABLE carnaval_editions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE puntajes            ENABLE ROW LEVEL SECURITY;
ALTER TABLE menciones           ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_frases        ENABLE ROW LEVEL SECURITY;
ALTER TABLE static_content      ENABLE ROW LEVEL SECURITY;

-- Política: cualquiera puede leer
CREATE POLICY "public_read_categories"       ON categories        FOR SELECT USING (true);
CREATE POLICY "public_read_agrupaciones"     ON agrupaciones      FOR SELECT USING (true);
CREATE POLICY "public_read_shows"            ON shows             FOR SELECT USING (true);
CREATE POLICY "public_read_show_sections"    ON show_sections     FOR SELECT USING (true);
CREATE POLICY "public_read_staff"            ON staff             FOR SELECT USING (true);
CREATE POLICY "public_read_novedades"        ON novedades         FOR SELECT USING (true);
CREATE POLICY "public_read_editions"         ON carnaval_editions FOR SELECT USING (true);
CREATE POLICY "public_read_puntajes"         ON puntajes          FOR SELECT USING (true);
CREATE POLICY "public_read_menciones"        ON menciones         FOR SELECT USING (true);
CREATE POLICY "public_read_hero_frases"     ON hero_frases      FOR SELECT USING (true);
CREATE POLICY "public_read_static_content"   ON static_content    FOR SELECT USING (true);

-- Política: solo usuarios autenticados pueden escribir
CREATE POLICY "auth_write_categories"        ON categories        FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_agrupaciones"      ON agrupaciones      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_shows"             ON shows             FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_show_sections"     ON show_sections     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_staff"              ON staff             FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_novedades"         ON novedades         FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_editions"          ON carnaval_editions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_puntajes"          ON puntajes          FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_menciones"         ON menciones         FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_hero_frases"      ON hero_frases      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_static_content"    ON static_content    FOR ALL USING (auth.role() = 'authenticated');

INSERT INTO storage.buckets (id, name, public)
VALUES ('agrupaciones', 'agrupaciones', true);

-- Bucket público para media general
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true);

-- Política: cualquiera puede leer
CREATE POLICY "public read agrupaciones"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'agrupaciones');

CREATE POLICY "public read media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Política: solo autenticados pueden subir/borrar
CREATE POLICY "auth upload agrupaciones"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'agrupaciones' AND auth.role() = 'authenticated');

CREATE POLICY "auth upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
