-- ============================================================
-- MIGRACIÓN: GRANTs explícitos para el Data API de Supabase
-- Requerido a partir del 30/10/2026 para proyectos existentes
-- Ref: https://supabase.com/docs/guides/database/postgres/grants
-- ============================================================

-- categories
GRANT SELECT                       ON public.categories        TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories      TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories      TO service_role;

-- agrupaciones
GRANT SELECT                       ON public.agrupaciones      TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agrupaciones    TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agrupaciones    TO service_role;

-- shows
GRANT SELECT                       ON public.shows             TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shows           TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shows           TO service_role;

-- show_repertory
GRANT SELECT                       ON public.show_repertory    TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.show_repertory  TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.show_repertory  TO service_role;

-- staff
GRANT SELECT                       ON public.staff             TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.staff           TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.staff           TO service_role;

-- novedades
GRANT SELECT                       ON public.novedades         TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.novedades       TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.novedades       TO service_role;

-- carnaval_editions
GRANT SELECT                       ON public.carnaval_editions TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.carnaval_editions TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.carnaval_editions TO service_role;

-- puntajes
GRANT SELECT                       ON public.puntajes          TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.puntajes        TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.puntajes        TO service_role;

-- menciones
GRANT SELECT                       ON public.menciones         TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menciones       TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menciones       TO service_role;

-- hero_frases
GRANT SELECT                       ON public.hero_frases       TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_frases     TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_frases     TO service_role;

-- static_content
GRANT SELECT                       ON public.static_content    TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.static_content  TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.static_content  TO service_role;
