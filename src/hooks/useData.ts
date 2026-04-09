import { useEffect, useState } from 'react'
import {
  Novedad,
  Agrupacion,
  Category,
  Show,
  CarnavalEdition,
  HeroFrase,
  Mencion,
  Puntaje,
  Staff,
  ShowRepertory,
  StaticContent
} from '@/lib/supabase-client'
import {
  fetchNovedades,
  fetchNovedadById,
  fetchAgrupaciones,
  fetchAgrupacionesByCategory,
  fetchAgrupacionBySlug,
  fetchCategories,
  fetchCategoryBySlug,
  fetchShowsByAgrupacion,
  fetchShowBySlug,
  fetchStaffByShow,
  fetchStaff,
  fetchShowRepertory,
  fetchCarnavalEdiciones,
  fetchHeroFrases,
  fetchMencionesByEdition,
  fetchPuntajesByEdition,
  fetchStaticContent
} from '@/lib/data-queries'

// Hook para Novedades
export function useNovedades() {
  const [novedades, setNovedades] = useState<Novedad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchNovedades()
        setNovedades(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { novedades, loading, error }
}

export function useNovedad(id: string) {
  const [novedad, setNovedad] = useState<Novedad | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)

    async function fetchData() {
      try {
        const data = await fetchNovedadById(id)
        setNovedad(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  return { novedad, loading, error }
}

// Hook para Categorías y Agrupaciones
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCategories()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { categories, loading, error }
}

export function useAgrupaciones(categorySlug?: string) {
  const [agrupaciones, setAgrupaciones] = useState<Agrupacion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = categorySlug
          ? await fetchAgrupacionesByCategory(categorySlug)
          : await fetchAgrupaciones()
        setAgrupaciones(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [categorySlug])

  return { agrupaciones, loading, error }
}

// Hook para Espectáculos
export function useShow(slug: string) {
  const [show, setShow] = useState<Show | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)

    async function fetchData() {
      try {
        const data = await fetchShowBySlug(slug)
        setShow(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  return { show, loading, error }
}

export function useShowsByAgrupacion(agrupacionId: string) {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!agrupacionId) return
    setLoading(true)

    async function fetchData() {
      try {
        const data = await fetchShowsByAgrupacion(agrupacionId)
        setShows(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [agrupacionId])

  return { shows, loading, error }
}

// Hook para contenido promocional
export function useFrasesPromo() {
  const [frases, setFrases] = useState<HeroFrase[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchHeroFrases()
        setFrases(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { frases, loading, error }
}

// Hook para Carnaval Ediciones
export function useCarnavalEdiciones() {
  const [ediciones, setEdiciones] = useState<CarnavalEdition[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCarnavalEdiciones()
        setEdiciones(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return { ediciones, loading, error }
}
