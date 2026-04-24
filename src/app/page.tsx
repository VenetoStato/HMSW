import Link from 'next/link';
import { getProducts, getSolutions } from '@/lib/catalog';
import { ProductGrid } from '@/components/ProductGrid';

export default async function Home() {
  const solutions = await getSolutions();
  const products = await getProducts();

  const featured = products.slice(0, 6);

  return (
    <main className="py-8">
      <section className="rounded-2xl border bg-gradient-to-br from-sky-50 via-white to-white p-6">
        <h1 className="text-3xl font-bold tracking-tight">Shop UNITREE + Accessori</h1>
        <p className="mt-2 text-gray-700">
          Prezzi visibili, carrello e schede prodotto. Ogni soluzione ha una landing dedicata.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/shop"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Vai allo shop
          </Link>
          <Link
            href={`/soluzioni/${solutions[0]?.slug ?? 'robot-per-uso-quotidiano'}`}
            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            Scopri una soluzione
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Soluzioni</h2>
            <p className="mt-1 text-sm text-gray-600">Landing separate per ogni soluzione.</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/soluzioni/${s.slug}`}
              className="group rounded-2xl border p-4 hover:bg-gray-50"
            >
              <div className="text-sm text-gray-500">Soluzione</div>
              <h3 className="mt-1 text-lg font-bold group-hover:underline">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">In evidenza</h2>
        <ProductGrid products={featured} />
      </section>
    </main>
  );
}
