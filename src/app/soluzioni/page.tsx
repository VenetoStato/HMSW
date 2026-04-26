import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { SOLUTIONS, getLocalizedSolution, matchProductsForSolution } from '@/lib/solutions';
import { pickUniqueImages } from '@/lib/imageUtils';
import { getLocaleServer } from '@/lib/localeServer';
import { t, type Locale } from '@/lib/i18n';

export default async function SolutionsIndexPage() {
  const products = await getProducts();
  const locale: Locale = getLocaleServer();

  const defaultAcc =
    SOLUTIONS[0]?.accentRgb ?? { a: '56 189 248', b: '99 102 241', c: '16 185 129' };

  const cards = SOLUTIONS.map((s) => {
    const matched = matchProductsForSolution(s, products);
    const heroCandidates = matched.flatMap((p) => p.images ?? []).filter(Boolean);
    const localized = getLocalizedSolution(s, locale);
    const hero =
      pickUniqueImages(heroCandidates, { limit: 1, minW: 500, minH: 250 })[0] ??
      heroCandidates[0] ??
      null;
    return {
      slug: s.slug,
      title: localized.title,
      description: localized.heroCopy,
      hero,
      matchedCount: matched.length,
      familyLabel: localized.familyLabel,
      accentRgb: s.accentRgb ?? defaultAcc,
    };
  });

  return (
    <main className="py-8">
      <section
        className="overflow-hidden rounded-2xl border bg-white/65 accent-surface overflow-x-hidden"
        style={{
          ['--acc-a' as any]: defaultAcc.a,
          ['--acc-b' as any]: defaultAcc.b,
          ['--acc-c' as any]: defaultAcc.c,
        }}
      >
        <div className="p-6 md:p-10">
          <div className="max-w-2xl">
            <div className="text-sm text-gray-500">{t(locale, 'solutionsIndexLabel')}</div>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold">{t(locale, 'solutionsIndexH1')}</h1>
            <p className="mt-3 text-sm md:text-base text-gray-600">{t(locale, 'solutionsIndexP')}</p>
          </div>
        </div>
      </section>

      <section className="mt-8 overflow-x-hidden">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.slug}
              className="group relative overflow-hidden rounded-2xl border bg-white/70 accent-surface border-black/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-[2px]"
              style={{
                ['--acc-a' as any]: c.accentRgb?.a ?? defaultAcc.a,
                ['--acc-b' as any]: c.accentRgb?.b ?? defaultAcc.b,
                ['--acc-c' as any]: c.accentRgb?.c ?? defaultAcc.c,
              }}
            >
              <Link href={`/soluzioni/${c.slug}`} className="block">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50">
                  {c.hero ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.hero} alt={c.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}
                  <div className="absolute inset-0 motion-gradient-hero opacity-25 pointer-events-none" />
                  <div className="absolute inset-0 accent-card-overlay pointer-events-none" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-500">{c.familyLabel}</div>
                  <h2 className="mt-1 text-base font-semibold leading-snug tracking-tight break-words">{c.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2 break-words">{c.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {t(locale, 'componentiLabel')}: {c.matchedCount}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-sm font-semibold text-gray-900 transition-colors group-hover:bg-black/10">
                      {t(locale, 'openLabel')} <span className="text-gray-600">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
