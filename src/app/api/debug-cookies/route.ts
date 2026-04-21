import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Debug: Mostrar todas las cookies que contienen "auth"
  const allCookies = request.cookies.getAll()
  const authCookies = allCookies.filter(cookie =>
    cookie.name.toLowerCase().includes('auth')
  )

  // También verificar los tokens específicos que busca el middleware
  const accessToken = request.cookies.get('sb-127-auth-token')?.value ||
    request.cookies.get('sb-auth-token')?.value

  const debugInfo = {
    timestamp: new Date().toISOString(),
    totalCookies: allCookies.length,
    authCookiesFound: authCookies.length,
    authCookies: authCookies.map(cookie => ({
      name: cookie.name,
      hasValue: !!cookie.value,
      valueLength: cookie.value?.length || 0
    })),
    allCookieNames: allCookies.map(c => c.name),
    url: request.url,
    userAgent: request.headers.get('user-agent'),
    accessTokenCheck: accessToken ? 'present' : 'missing'
  }

  return NextResponse.json(debugInfo)
}
