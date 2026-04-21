import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const supabase = await createClient()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    const debugInfo = {
      timestamp: new Date().toISOString(),
      request: {
        email,
        hasPassword: !!password
      },
      response: {
        error: error ? error.message : null,
        success: !error,
        user: data.user ? {
          id: data.user.id,
          email: data.user.email,
          emailConfirmed: !!data.user.email_confirmed_at
        } : null,
        session: data.session ? {
          hasAccessToken: !!data.session.access_token,
          hasRefreshToken: !!data.session.refresh_token,
          expiresAt: data.session.expires_at,
          tokenType: data.session.token_type
        } : null
      },
      serverCookies: {
        all: request.cookies.getAll().map(c => c.name),
        authRelated: request.cookies.getAll().filter(c => 
          c.name.toLowerCase().includes('auth') || c.name.toLowerCase().includes('sb-')
        ).map(c => ({
          name: c.name,
          hasValue: !!c.value,
          valueLength: c.value?.length || 0
        }))
      }
    }

    if (error) {
      return NextResponse.json({ ...debugInfo, success: false }, { status: 400 })
    }

    return NextResponse.json(debugInfo)
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
