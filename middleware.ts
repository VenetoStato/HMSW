import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function localeFromCountry(country?: string | null) {
  const c = (country ?? '').toUpperCase();
  if (c === 'DE') return 'de';
  if (c === 'FR') return 'fr';
  if (c === 'NL') return 'nl';
  if (c === 'NO') return 'no';
  if (c === 'ES') return 'es';
  if (c === 'IT') return 'it';
  // default to English for unknown non-IT
  return 'en';
}

const ALLOWED = new Set(['it', 'en', 'de', 'fr', 'nl', 'no', 'es']);

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Explicit override: ?lang=it/en/de/fr/nl/no/es
  const qpLang = url.searchParams.get('lang');
  const cookieLang = req.cookies.get('locale')?.value;

  const locale = (() => {
    if (qpLang && ALLOWED.has(qpLang)) return qpLang;
    if (cookieLang && ALLOWED.has(cookieLang)) return cookieLang;
    return localeFromCountry(req.geo?.country);
  })();

  const res = NextResponse.next();
  // Persist for navigation
  res.cookies.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
