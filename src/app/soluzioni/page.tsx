import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { SOLUTIONS, matchProductsForSolution } from '@/lib/solutions';
import { pickUniqueImages } from '@/lib/imageUtils';

export default async function SolutionsIndexPage() {
  const products = await getProducts();
  const defaultAcc = SOLUTIONS[0]?.accentRgb ?? { a: '56 189 248', b: '99 102 241', c: '16 185 129' };

  const cards = SOLUTIONS.map((s) => {
    const matched = matchProductsForSolution(s, products);
    const heroCandidates = matched.flatMap((p) => p.images ?? []).filter(Boolean);
    const hero =
      pickUniqueImages(heroCandidates, { limit: 1, minW: 500, minH: 250 })[0] ?? heroCandidates[0] ?? null;
    return {
      slug: s.slug,
      title: s.title,
      description: s.heroCopy,
      hero,
      matchedCount: matched.length,
      familyLabel: s.familyLabel,
      accentRgb: s.accentRgb ?? defaultAcc,
    };
  });

  return (
    <main className="py-8">
      <section
        className="overflow-hidden rounded-2xl border bg-white/65 accent-surface"
        style={{
          ['--acc-a' as any]: defaultAcc.a,
          ['--acc-b' as any]: defaultAcc.b,
          ['--acc-c' as any]: defaultAcc.c,
        }}
      >
        <div className="p-6 md:p-10">
          <div className="max-w-2xl">
            <div className="text-sm text-gray-500">Soluzioni per automazione</div>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold">Scegli la soluzione e configura in 1 minuto</h1>
            <p className="mt-3 text-sm md:text-base text-gray-600">
              Landing dedicate (mobile-first) con immagini coerenti, copy ottimizzato e configurazione interattiva. Poi aggiungi al carrello e invii la richiesta.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.slug}
              className="group overflow-hidden rounded-2xl border bg-white/70 accent-surface border-black/10 transition-shadow hover:shadow-sm"
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
                    <img
                      src={c.hero}
                      alt={c.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}
                  <div className="absolute inset-0 accent-card-overlay" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-gray-500">{c.familyLabel}</div>
                  <h2 className="mt-1 text-base font-semibold leading-snug">{c.title}</h2>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{c.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-600">Componenti: {c.matchedCount}</span>
                    <span className="text-sm font-semibold">Apri →</span>
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
