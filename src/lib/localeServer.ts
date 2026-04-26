import { cookies, headers } from 'next/headers';
import type { Locale } from './i18n';
import { detectLocaleFromLanguageTag, normalizeLocale } from './i18n';

export function getLocaleServer(): Locale {
  const h = headers();
  const x = h.get('x-locale');
  if (x) return normalizeLocale(x as any);

  const c = cookies();
  const v = c.get('locale')?.value;
  if (v) return normalizeLocale(v);

  const acceptLang = h.get('accept-language');
  return detectLocaleFromLanguageTag(acceptLang);
}
