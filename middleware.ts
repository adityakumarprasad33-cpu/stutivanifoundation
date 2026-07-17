import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTE_CATEGORIES, ROUTES } from './constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('stutivani_session')?.value;

  // 1. If it's a public route, just let it pass
  if (ROUTE_CATEGORIES.isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 2. If it's an Auth route (Login, Forgot Password), redirect to dashboard if already logged in
  if (ROUTE_CATEGORIES.isAuthRoute(pathname)) {
    if (sessionCookie) {
      // Instead of forcing Dashboard, redirect to a secure route that will route them properly
      // based on their actual role via server components.
      return NextResponse.redirect(new URL('/portal', request.url));
    }
    return NextResponse.next();
  }

  // 3. If it's a Protected route, verify session
  if (ROUTE_CATEGORIES.isProtectedRoute(pathname)) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
    }

    // Call internal verification API from Edge to get secure roles
    try {
      // Use standard origin instead of relying on localhost resolution which can fail in Edge
      const baseUrl = request.nextUrl.origin;
      const response = await fetch(`${baseUrl}/api/auth/verify`, {
        method: 'GET',
        headers: {
          Cookie: `stutivani_session=${sessionCookie}`
        }
      });

      if (!response.ok) {
        // Token invalid or expired: clear the cookie to break the redirect loop
        const redirectRes = NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
        redirectRes.cookies.delete('stutivani_session');
        return redirectRes;
      }

      const { data } = await response.json();
      // Role Based Routing
      const activeRole = data.lastSelectedRole?.toLowerCase();
      const roles = data.roles?.map((r: string) => r.toLowerCase()) || [activeRole];
      
      const isDashboardRoute = pathname.startsWith(ROUTES.PROTECTED.DASHBOARD) || pathname.startsWith(ROUTES.ADMIN.USERS);
      const isPortalRoute = pathname.startsWith('/portal');
      const isDonorRoute = pathname.startsWith('/donor');

      // 1. Protect Admin Dashboard
      if (isDashboardRoute && activeRole !== 'admin' && activeRole !== 'super_admin') {
        return NextResponse.redirect(new URL(ROUTES.AUTH.FORBIDDEN, request.url));
      }

      // 2. Protect Volunteer Portal
      if (isPortalRoute && activeRole !== 'volunteer') {
        if (activeRole === 'donor') return NextResponse.redirect(new URL('/donor', request.url));
        if (activeRole === 'admin' || activeRole === 'super_admin') return NextResponse.redirect(new URL('/dashboard', request.url));
        return NextResponse.redirect(new URL(ROUTES.AUTH.FORBIDDEN, request.url));
      }

      // 3. Protect Donor Portal
      if (isDonorRoute && activeRole !== 'donor') {
        if (activeRole === 'volunteer') return NextResponse.redirect(new URL('/portal', request.url));
        if (activeRole === 'admin' || activeRole === 'super_admin') return NextResponse.redirect(new URL('/dashboard', request.url));
        return NextResponse.redirect(new URL(ROUTES.AUTH.FORBIDDEN, request.url));
      }
      // We don't forbid here because even pending volunteers might need to reach /portal/pending.
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-pathname', pathname);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.warn('Middleware verification fetch failed (likely local Edge networking issue). Deferring to Server Components:', error);
      
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-pathname', pathname);

      // Fail open: Let Server Components (requireAuth) handle the actual validation in Node.js
      // Redirecting to login here causes an infinite loop because /login redirects back to /portal.
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
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
  ],
};
