import { supabase, Novedad, Agrupacion, Category, Show, CarnavalEdition, HeroFrase, Mencion, Puntaje, Staff, ShowSection, StaticContent } from '@/lib/supabase-client'

// Novedades
export async function fetchNovedades(): Promise<Novedad[]> {
    const { data, error } = await supabase
        .from('novedades')
        .select('*')
        .order('created_at', { ascending: false })


    if (error) {
        console.error('fetchNovedades: Supabase error', error)
        throw error
    }

    return data || []
}

export async function fetchNovedadById(id: string): Promise<Novedad | null> {
    const { data, error } = await supabase
        .from('novedades')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

// Agrupaciones
export async function fetchAgrupaciones(): Promise<Agrupacion[]> {
    const { data, error } = await supabase
        .from('agrupaciones')
        .select('*')
        .order('name', { ascending: true })

    if (error) throw error
    return data || []
}

export async function fetchAgrupacionesByCategory(categorySlug: string): Promise<Agrupacion[]> {
    const { data, error } = await supabase
        .from('agrupaciones')
        .select('*')
        .eq('category_slug', categorySlug)
        .order('name', { ascending: true })

    if (error) throw error
    return data || []
}

export async function fetchAgrupacionBySlug(slug: string): Promise<Agrupacion | null> {
    const { data, error } = await supabase
        .from('agrupaciones')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error
    return data
}

// Categorías
export async function fetchCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true })

    if (error) throw error
    return data || []
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error
    return data
}

// Espectáculos (Shows)
export async function fetchShowsByAgrupacion(agrupacionId: string): Promise<Show[]> {
    const { data, error } = await supabase
        .from('shows')
        .select('*')
        .eq('agrupacion_id', agrupacionId)
        .order('year', { ascending: false })

    if (error) throw error
    return data || []
}

export async function fetchShowBySlug(slug: string): Promise<Show | null> {
    const { data, error } = await supabase
        .from('shows')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) throw error
    return data
}

// Staff por espectáculo
export async function fetchStaffByShow(showId: string): Promise<Staff[]> {
    const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('show_id', showId)
        .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
}

// Staff general de agrupación
export async function fetchStaff(agrupacionId: string): Promise<Staff[]> {
    const { data, error } = await supabase
        .from('staff')
        .select('*')
        .eq('agrupacion_id', agrupacionId)
        .is('show_id', null)
        .order('category', { ascending: true })
        .order('order_index', { ascending: true })

    if (error) throw error
    return data || []
}

export async function fetchShowSections(showId: string): Promise<ShowSection[]> {
    const { data, error } = await supabase
        .from('show_sections')
        .select('*')
        .eq('show_id', showId)
        .order('sort_order', { ascending: true })

    if (error) throw error
    return data || []
}

// Carnaval Ediciones
export async function fetchCarnavalEdiciones(): Promise<CarnavalEdition[]> {
    const { data, error } = await supabase
        .from('carnaval_editions')
        .select('*')
        .order('year', { ascending: false })

    if (error) throw error
    return data || []
}

// Frases Promocionales
export async function fetchHeroFrases(): Promise<HeroFrase[]> {
    const { data, error } = await supabase
        .from('hero_frases')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
}

// Menciones y Puntajes
export async function fetchMencionesByEdition(editionId: string): Promise<Mencion[]> {
    const { data, error } = await supabase
        .from('menciones')
        .select('*')
        .eq('edition_id', editionId)
        .order('tipo', { ascending: true })

    if (error) throw error
    return data || []
}

export async function fetchPuntajesByEdition(editionId: string): Promise<Puntaje[]> {
    const { data, error } = await supabase
        .from('puntajes')
        .select('*')
        .eq('edition_id', editionId)
        .order('categoria', { ascending: true })
        .order('puesto', { ascending: true })

    if (error) throw error
    return data || []
}

// Static Content
export async function fetchStaticContent(id: string): Promise<StaticContent | null> {
    const { data, error } = await supabase
        .from('static_content')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}
