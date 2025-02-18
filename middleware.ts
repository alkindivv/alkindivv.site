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

  // Hanya terapkan routing bahasa untuk blog dan glossary
  const shouldHandleLocale =
    request.nextUrl.pathname.startsWith('/blog') ||
    request.nextUrl.pathname.startsWith('/glossary');

  if (!shouldHandleLocale) {
    return NextResponse.next();
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
    // Hanya match blog dan glossary untuk routing bahasa
    '/blog/:path*',
    '/glossary/:path*',
    // Dan juga match rute lain yang perlu middleware
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|$).*)',
  ],
};
