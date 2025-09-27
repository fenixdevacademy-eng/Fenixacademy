import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas que precisam de autenticação
const protectedRoutes = [
  '/profile',
  '/dashboard',
  '/settings',
  '/my-courses',
  '/progress',
  '/certificates',
  '/admin',
  '/ceo'
]

// Rotas de autenticação (redirecionar se já logado)
const authRoutes = [
  '/auth/login',
  '/auth/register'
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('fenix-jwt-token')?.value

  // Verificar se é uma rota protegida
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Verificar se é uma rota de auth
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Se for rota protegida e não tiver token, redirecionar para login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Se for rota de auth e tiver token, redirecionar para perfil
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/profile', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]}