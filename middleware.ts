import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function localeFromCountry(country?: string | null) {
  const c = (country ?? '').toUpperCase();
  if (c && c !== 'IT') return 'en';
  return 'it';
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Explicit override: ?lang=en|it
  const qpLang = url.searchParams.get('lang');
  const cookieLang = req.cookies.get('locale')?.value;

  const locale = (() => {
    if (qpLang === 'en' || qpLang === 'it') return qpLang;
    if (cookieLang === 'en' || cookieLang === 'it') return cookieLang;
    return localeFromCountry(req.geo?.country);
  })();

  const res = NextResponse.next();
  // Persist for navigation
  res.cookies.set('locale', locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
