import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Placeholder for route protection and role validation
  // TODO: implement session verification using Firebase auth

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to specific routes
    '/dashboard/:path*',
    '/api/:path*',
  ],
};
