'use client'

import { supabase } from '@/lib/supabase'
import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null)

            // Si no hay sesión y no estamos en login, redirigir
            if (!session?.user && window.location.pathname !== '/admin/login') {
                router.push('/admin/login')
            }

            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
            setUser(session?.user ?? null)

            // Si no hay sesión y no estamos en login, redirigir
            if (!session?.user && window.location.pathname !== '/admin/login') {
                router.push('/admin/login')
            }

            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [router])

    // Si está cargando, mostrar loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Verificando autenticación...</p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
