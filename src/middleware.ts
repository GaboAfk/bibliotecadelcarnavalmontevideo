import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // Solo proteger rutas de admin
  if (!request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname === '/admin/login') {
    return res
  }

  // Verificar si hay cookies de autenticación de Supabase
  // Supabase usa diferentes nombres local vs producción
  const accessToken = request.cookies.get('sb-127-auth-token')?.value ||
    request.cookies.get('sb-auth-token')?.value

  // Debug en desarrollo
  // if (process.env.NODE_ENV === 'development') {
  const allCookies = request.cookies.getAll()
  const authCookies = allCookies.filter(cookie =>
    cookie.name.toLowerCase().includes('auth')
  )

  console.log('=== Middleware Debug ===')
  console.log('Path:', request.nextUrl.pathname)
  console.log('Total cookies:', allCookies.length)
  console.log('Auth cookies:', authCookies.length)
  authCookies.forEach(cookie => {
    console.log(`- ${cookie.name}: ${cookie.value ? 'present' : 'empty'}`)
  })
  console.log('Access token:', accessToken ? 'present' : 'missing')
  console.log('========================')
  // }

  // Si no hay access token, redirigir a login
  if (!accessToken) {
    console.log('No access token found, redirecting to login')
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  console.log('Access token found, allowing access')
  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
