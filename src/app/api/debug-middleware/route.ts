import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const targetPath = url.searchParams.get('path') || '/admin/dashboard'
  
  // Simular exactamente lo que hace el middleware
  const res = NextResponse.next()
  
  // Verificar si hay cookies de autenticación de Supabase
  const accessToken = request.cookies.get('sb-127-auth-token')?.value ||
                    request.cookies.get('sb-auth-token')?.value

  const debugInfo = {
    timestamp: new Date().toISOString(),
    requestedPath: targetPath,
    middlewareLogic: {
      startsWithAdmin: targetPath.startsWith('/admin'),
      isNotLoginPage: targetPath !== '/admin/login',
      shouldProtect: targetPath.startsWith('/admin') && targetPath !== '/admin/login',
      accessTokenFound: !!accessToken,
      wouldRedirect: !accessToken && targetPath.startsWith('/admin') && targetPath !== '/admin/login'
    },
    cookies: {
      all: request.cookies.getAll().map(c => c.name),
      authRelated: request.cookies.getAll().filter(c => 
        c.name.toLowerCase().includes('auth') || c.name.toLowerCase().includes('sb-')
      ).map(c => ({
        name: c.name,
        hasValue: !!c.value,
        valueLength: c.value?.length || 0
      }))
    },
    headers: {
      cookie: request.headers.get('cookie'),
      userAgent: request.headers.get('user-agent')
    }
  }

  return NextResponse.json(debugInfo)
}
