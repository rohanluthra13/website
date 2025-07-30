import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PASSWORD = process.env.SITE_PASSWORD || 'vibing2025'
const COOKIE_NAME = 'site-authenticated'

export function middleware(request: NextRequest) {
  // Check if password protection is enabled
  const isPasswordProtected = process.env.NEXT_PUBLIC_PASSWORD_PROTECT === 'true'
  
  if (!isPasswordProtected) {
    return NextResponse.next()
  }

  // Allow access to password page and API routes
  if (request.nextUrl.pathname === '/password' || 
      request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const isAuthenticated = request.cookies.get(COOKIE_NAME)?.value === 'true'

  if (!isAuthenticated) {
    // Redirect to password page
    const url = new URL('/password', request.url)
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}