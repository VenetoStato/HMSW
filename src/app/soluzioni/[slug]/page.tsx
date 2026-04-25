import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { matchProductsForSolution, SOLUTIONS } from '@/lib/solutions';
import { pickUniqueImages } from '@/lib/imageUtils';
import { ProductGrid } from '@/components/ProductGrid';
import { SolutionKitBuilder } from '@/components/SolutionKitBuilder';

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  const title = solution?.title ?? `Soluzione ${slug}`;
  const description = solution?.seoDescription ?? 'Soluzione configurabile con prodotti e prezzi.';

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function SolutionPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const solution = SOLUTIONS.find((s) => s.slug === slug) ?? null;

  const products = await getProducts();
  const matched = solution ? matchProductsForSolution(solution, products) : products.slice(0, 12);

  const imagePool = matched.flatMap((p) => p.images ?? []).filter(Boolean);
  const heroImages = pickUniqueImages(imagePool, { limit: 10, minW: 400, minH: 200 });
  const heroImg = heroImages[0] ?? null;
  const gallery = heroImages.slice(0, 8);

  return (
    <main className="py-6 md:py-10">
      <section className="overflow-hidden rounded-2xl border bg-white">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                {solution?.familyLabel ?? 'Soluzione'}
              </div>
              <div className="text-xs text-gray-500">Kit configurabile • carrello con richiesta</div>
            </div>

            <h1 className="mt-3 text-2xl md:text-3xl font-bold">{solution?.title ?? slug}</h1>
            <p className="mt-3 text-sm md:text-base text-gray-600">
              {solution?.heroCopy ?? solution?.seoDescription ?? ''}
            </p>

            {(solution?.bullets ?? []).slice(0, 3).length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {(solution?.bullets ?? []).slice(0, 3).map((b, i) => (
                  <div key={i} className="rounded-xl border bg-white p-4">
                    <div className="text-xs font-semibold text-gray-700">{i + 1}</div>
                    <div className="mt-1 text-sm text-gray-600">{b}</div>
                  </div>
                ))}
              </div>
            ) : null}

            {solution?.include?.bullets?.length ? (
              <section className="mt-7">
                <h2 className="text-lg font-semibold">{solution.include.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {solution.include.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {solution?.audience?.bullets?.length ? (
              <section className="mt-7">
                <h2 className="text-lg font-semibold">{solution.audience.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {solution.audience.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {solution?.integration?.bullets?.length ? (
              <section className="mt-7">
                <h2 className="text-lg font-semibold">{solution.integration.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {solution.integration.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {solution?.faq?.length ? (
              <section className="mt-7">
                <h2 className="text-lg font-semibold">FAQ</h2>
                <div className="mt-3 space-y-3">
                  {solution.faq.map((item, idx) => (
                    <details key={idx} className="rounded-xl border bg-white p-4">
                      <summary className="cursor-pointer text-sm font-semibold text-gray-900">
                        {item.q}
                      </summary>
                      <div className="mt-2 text-sm text-gray-600">{item.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/shop"
                className="rounded-lg bg-black px-4 py-2 text-white text-sm font-semibold hover:bg-gray-900"
              >
                Vai allo shop
              </Link>
              <Link href="/carrello" className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50">
                Carrello
              </Link>
            </div>

            <div className="mt-6">
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Ispirazioni visive</div>
                  <div className="text-xs text-gray-500">Immagini e riferimenti coerenti con la soluzione scelta</div>
                </div>
                <div className="text-xs text-gray-500">{matched.length} selezionati</div>
              </div>

              {gallery.length ? (
                <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
                  {gallery.map((src, idx) => (
                    <div
                      key={src + idx}
                      className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-gray-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={solution?.title ?? 'immagine'}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

          </div>

          <div className="relative bg-gray-50">
            {heroImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroImg} alt={solution?.title ?? 'Immagine soluzione'} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}

            <div className="absolute inset-0 motion-gradient-hero" />

            <div className="relative p-6 md:p-8">
              <SolutionKitBuilder contextTitle={solution?.title ?? slug} products={matched} imagePool={matched} />

              <div className="mt-4 rounded-xl border bg-white/70 p-4 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">Componenti suggeriti</div>
                    <div className="text-xs text-gray-600">Scelti con keyword + categoria</div>
                  </div>
                  <div className="text-sm text-gray-700">{matched.length} prodotti</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Componenti consigliati</h2>
            <p className="mt-1 text-sm text-gray-600">
              Prodotti compatibili con la landing: <span className="font-medium">{solution?.title ?? slug}</span>
            </p>
          </div>
          <div className="text-sm text-gray-500">{matched.length} in evidenza</div>
        </div>

        <div className="mt-4">
          <ProductGrid products={matched} />
        </div>
      </section>
    </main>
  );
}
