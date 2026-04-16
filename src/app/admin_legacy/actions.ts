'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function signIn(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Redirigir al dashboard del admin
  redirect('/admin/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    return { error: error.message }
  }

  // Redirigir al login
  redirect('/admin')
}

export async function getSession() {
  const supabase = await createClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  return session
}
