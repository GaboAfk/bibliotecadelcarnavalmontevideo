import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function auth(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Primero setea en el request (para que la sesión esté disponible)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Luego setea en la response (para que el browser las guarde)
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANTE: llamar getUser() para refrescar la sesión si es necesario
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isAdminRoot = request.nextUrl.pathname === '/admin'

  // Si está en ruta protegida y no hay usuario → redirigir a login
  const shouldRedirectToLogin = isAdminRoute && !isLoginPage && !user


  if (shouldRedirectToLogin) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Si ya está autenticado y va a /admin/login → redirigir a /admin
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // Si está autenticado en /admin (raíz) → redirigir a dashboard
  if (isAdminRoot && user) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  // MUY IMPORTANTE: devolver siempre supabaseResponse, no NextResponse.next()
  // para que las cookies actualizadas se propaguen correctamente
  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
