import Link from 'next/link';
import { getProducts, getSolutions } from '@/lib/catalog';
import { ProductGrid } from '@/components/ProductGrid';

export default async function SolutionPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const solutions = await getSolutions();
  const solution = solutions.find((s) => s.slug === slug);
  const products = await getProducts();

  const filtered = products.filter((p) => p.solutionSlug === slug);
  const hero = filtered[0]?.images[0] ?? '/next.svg';

  return (
    <main className="py-8">
      <section className="overflow-hidden rounded-2xl border bg-white">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="text-sm text-gray-500">Soluzione</div>
            <h1 className="mt-2 text-2xl font-bold">{solution?.title ?? slug}</h1>
            {solution?.description ? (
              <p className="mt-3 text-sm text-gray-600">{solution.description}</p>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/shop"
                className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                Vai allo shop
              </Link>
              <Link
                href="/carrello"
                className="rounded-lg border px-4 py-2 hover:bg-gray-50"
              >
                Carrello
              </Link>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              {filtered.length} prodotti consigliati per questa soluzione.
            </div>
          </div>

          <div className="relative min-h-[220px] bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* We keep it simple: hero image comes from uploads */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero} alt="Hero soluzione" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Prodotti della soluzione</h2>
        <ProductGrid products={filtered} />
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}
