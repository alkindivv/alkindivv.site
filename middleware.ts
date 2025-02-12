import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware for API routes and static files
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Handle URL canonicalization
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const isWWW = hostname.startsWith('www.');

  // Redirect www to non-www
  if (isWWW) {
    url.host = hostname.replace('www.', '');
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();

  // Set cache control headers for blog posts
  if (request.nextUrl.pathname.startsWith('/blog')) {
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes (/api/*)
     * - Static files
     * - Next.js internals
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|$).*)',
  ],
};
