import Link from 'next/link';
import { getProducts, getSolutions } from '@/lib/catalog';
import { ProductGrid } from '@/components/ProductGrid';
import { SolutionKitBuilder } from '@/components/SolutionKitBuilder';

export default async function SolutionPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const solutions = await getSolutions();
  const solution = solutions.find((s) => s.slug === slug);

  const products = await getProducts();
  const filtered = products.filter((p) => p.solutionSlug === slug);

  const heroImg = filtered[0]?.images?.[0];

  return (
    <main className="py-8">
      <section className="overflow-hidden rounded-2xl border bg-white">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="text-sm text-gray-500">Soluzione pronta</div>
            <h1 className="mt-2 text-2xl font-bold">{solution?.title ?? slug}</h1>
            {solution?.description ? (
              <p className="mt-3 text-sm text-gray-600">{solution.description}</p>
            ) : null}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link href="/shop" className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800">
                Vai allo shop e completa il kit
              </Link>
              <Link href="/carrello" className="rounded-lg border px-4 py-2 hover:bg-gray-50">
                Carrello
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-white p-4">
                <div className="text-sm font-semibold">1) Seleziona scenario</div>
                <div className="mt-1 text-sm text-gray-600">Demo, Ricerca o Integrazione.</div>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <div className="text-sm font-semibold">2) Kit pronto</div>
                <div className="mt-1 text-sm text-gray-600">Componenti coerenti + prezzi trasparenti.</div>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <div className="text-sm font-semibold">3) Aggiungi al carrello</div>
                <div className="mt-1 text-sm text-gray-600">In 1 click, poi invii la richiesta.</div>
              </div>
              <div className="rounded-xl border bg-white p-4">
                <div className="text-sm font-semibold">4) Ricevi conferma</div>
                <div className="mt-1 text-sm text-gray-600">Niente pagamento online.</div>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              * Se un componente è “Prezzo su richiesta”, vedrai “Su richiesta” anche nel totale.
            </div>
          </div>

          <div className="relative min-h-[220px] bg-gray-50">
            {heroImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroImg} alt="Immagine soluzione" className="h-full w-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50/60 via-white/60 to-white/90" />
            <div className="relative p-6 md:p-8">
              <SolutionKitBuilder solutionSlug={slug} products={filtered} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Componenti consigliati</h2>
            <p className="mt-1 text-sm text-gray-600">
              I prodotti che compongono la soluzione “{solution?.title ?? slug}”.
            </p>
          </div>
          <div className="text-sm text-gray-500">{filtered.length} prodotti</div>
        </div>

        <div className="mt-4">
          <ProductGrid products={filtered} />
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const solutions = await getSolutions();
  return solutions.map((s) => ({ slug: s.slug }));
}
