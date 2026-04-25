import type { Locale } from './i18n';
import { normalizeLocale } from './i18n';

export function getLocaleClient(): Locale {
  if (typeof document === 'undefined') return 'it';
  const m = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/i);
  if (m?.[1]) return normalizeLocale(decodeURIComponent(m[1]));
  // fallback: browser language
  const lang = navigator.language || '';
  return normalizeLocale(lang);
}
