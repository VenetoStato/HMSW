import { cookies, headers } from 'next/headers';
import type { Locale } from './i18n';
import { detectLocaleFromLanguageTag, normalizeLocale } from './i18n';

export function getLocaleServer(): Locale {
  const c = cookies();
  const v = c.get('locale')?.value;
  if (v) return normalizeLocale(v);

  const h = headers();
  const acceptLang = h.get('accept-language');
  return detectLocaleFromLanguageTag(acceptLang);
}
