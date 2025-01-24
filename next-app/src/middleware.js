import { NextResponse } from 'next/server';

const publicRoutes = ['/signin', '/signup', '/forgot-password'];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  const isProtectedRoute = pathname.startsWith('/products') || 
                          pathname.startsWith('/summary') ||
                          pathname.startsWith('/account');

  // Skip middleware for non-matching routes
  if (!isPublicRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (/api/*)
     * - static files (_next/static/*, _next/image/*, favicon.ico, etc.)
     * - public assets (/public/*)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 