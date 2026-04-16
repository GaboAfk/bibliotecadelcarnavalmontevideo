import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()

  // Verificar si hay cookies de autenticación de Supabase
  // Supabase usa diferentes nombres local vs producción
  const accessToken = request.cookies.get('sb-127-auth-token')?.value ||
    request.cookies.get('sb-auth-token')?.value

  console.log('accessToken', accessToken ? 'present' : 'missing')

  // Proteger rutas de admin
  if (request.nextUrl.pathname.startsWith('/admin') &&
    request.nextUrl.pathname !== '/admin/login') {
    // Si no hay access token, redirigir a login
    if (!accessToken) {
      // Agregar un pequeño delay para evitar loops de redirección
      await new Promise(resolve => setTimeout(resolve, 100))

      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return res
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
