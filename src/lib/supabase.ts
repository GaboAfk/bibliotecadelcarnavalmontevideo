import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

// Browser Client - para componentes y hooks
export function createBrowserClientInstance() {
    return createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

// Instancia única para toda la app
export const supabase = createBrowserClientInstance()

// Tipos exportados para usar en toda la app
export type Agrupacion = Database['public']['Tables']['agrupaciones']['Row']
export type AgrupacionInsert = Database['public']['Tables']['agrupaciones']['Insert']
export type AgrupacionUpdate = Database['public']['Tables']['agrupaciones']['Update']

export type CarnavalEdition = Database['public']['Tables']['carnaval_editions']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type HeroFrase = Database['public']['Tables']['hero_frases']['Row']
export type Mencion = Database['public']['Tables']['menciones']['Row']
export type Novedad = Database['public']['Tables']['novedades']['Row']
export type Puntaje = Database['public']['Tables']['puntajes']['Row']
export type Staff = Database['public']['Tables']['staff']['Row']
export type ShowRepertory = Database['public']['Tables']['show_repertory']['Row']
export type Show = Database['public']['Tables']['shows']['Row']
export type StaticContent = Database['public']['Tables']['static_content']['Row']
