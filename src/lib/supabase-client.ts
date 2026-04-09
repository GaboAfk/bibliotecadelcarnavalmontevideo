import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// console.log('Supabase client config:', {
//     url: supabaseUrl,
//     hasKey: !!supabaseAnonKey,
//     keyLength: supabaseAnonKey?.length
// })

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

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
