import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token');

  const publicPaths = ['/login'];

  if (publicPaths.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
