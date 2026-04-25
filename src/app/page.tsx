import Link from 'next/link';
import { SOLUTIONS } from '@/lib/solutions';
import { DynamicAccentGradient } from '@/components/DynamicAccentGradient';

export default async function Home() {
  return (
    <main className="py-8">
      <section className="rounded-2xl border p-6 motion-gradient-hero bg-white">
        <h1 className="text-3xl font-bold tracking-tight">UNITREE Shop + Accessori</h1>
        <p className="mt-2 text-gray-700">
          Scegli la soluzione, esplora i prodotti con prezzi trasparenti e costruisci il tuo kit.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/shop"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Vai allo shop
          </Link>
          <Link
            href={`/soluzioni/${SOLUTIONS[0]?.slug ?? 'robot-per-uso-quotidiano'}`}
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
            <p className="mt-1 text-sm text-gray-600">Landing dedicate (una per ogni soluzione).</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Link
              key={s.slug}
              href={`/soluzioni/${s.slug}`}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-2xl border bg-white/65 p-5 accent-surface backdrop-blur transition-shadow group-hover:shadow-sm"
                style={{
                  ['--acc-a' as any]: s.accentRgb?.a ?? '56 189 248',
                  ['--acc-b' as any]: s.accentRgb?.b ?? '99 102 241',
                  ['--acc-c' as any]: s.accentRgb?.c ?? '16 185 129',
                }}
              >
                <DynamicAccentGradient className="absolute inset-0 opacity-90" />

                <div className="relative z-10">
                  <div className="text-xs text-gray-600">Soluzione</div>
                  <h3 className="mt-1 text-lg font-bold group-hover:underline">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.seoDescription}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-semibold">Come funziona</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">1) Scegli la soluzione</div>
            <div className="mt-1 text-sm text-gray-600">Apri la landing e vedi i prodotti consigliati.</div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">2) Guarda lo shop</div>
            <div className="mt-1 text-sm text-gray-600">Tutti i prodotti con prezzi esposti e carrello.</div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">3) Contatta / richiesta</div>
            <div className="mt-1 text-sm text-gray-600">Invia la richiesta dal carrello per il preventivo.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
