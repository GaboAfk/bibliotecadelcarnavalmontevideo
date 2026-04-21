import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Este endpoint se llama inmediatamente después del login
  // para ver qué cookies se establecieron realmente
  
  const allCookies = request.cookies.getAll()
  const authCookies = allCookies.filter(cookie => 
    cookie.name.toLowerCase().includes('auth') || 
    cookie.name.toLowerCase().includes('sb-') ||
    cookie.name.toLowerCase().includes('supabase')
  )
  
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    url: request.url,
    headers: {
      cookie: request.headers.get('cookie'),
      userAgent: request.headers.get('user-agent'),
      host: request.headers.get('host')
    },
    cookies: {
      total: allCookies.length,
      allNames: allCookies.map(c => c.name),
      authRelated: authCookies.map(cookie => ({
        name: cookie.name,
        hasValue: !!cookie.value,
        valueLength: cookie.value?.length || 0,
        valuePreview: cookie.value ? `${cookie.value.substring(0, 50)}...` : 'empty'
      }))
    },
    middlewareCheck: {
      // Simular exactamente lo que busca el middleware
      sb127AuthToken: !!request.cookies.get('sb-127-auth-token')?.value,
      sbAuthToken: !!request.cookies.get('sb-auth-token')?.value,
      sb127RefreshToken: !!request.cookies.get('sb-127-refresh-token')?.value,
      sbRefreshToken: !!request.cookies.get('sb-refresh-token')?.value,
      wouldFindToken: !!(
        request.cookies.get('sb-127-auth-token')?.value ||
        request.cookies.get('sb-auth-token')?.value
      )
    }
  }

  return NextResponse.json(debugInfo)
}
