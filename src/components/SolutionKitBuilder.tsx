'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { formatEur } from '@/lib/price';

type Scenario = 'demo' | 'rd' | 'integrato';

function pickBaseAndAccessories(products: Product[], accessoryCount: number) {
  const priced = products.filter((p) => (p.priceEur ?? 0) > 0);
  const base = priced.sort((a, b) => b.priceEur - a.priceEur)[0] ?? products[0];

  const accessories = products
    .filter((p) => p.id !== base?.id)
    .filter((p) => (p.priceEur ?? 0) > 0)
    .sort((a, b) => a.priceEur - b.priceEur);

  const chosen = accessories.slice(0, accessoryCount);
  return { base, chosen };
}

export function SolutionKitBuilder({ solutionSlug, products }: { solutionSlug: string; products: Product[] }) {
  const { addToCart } = useCart();
  const [scenario, setScenario] = useState<Scenario>('rd');
  const [status, setStatus] = useState<'idle' | 'added'>('idle');

  const kit = useMemo(() => {
    const accessoryCount = scenario === 'demo' ? 1 : scenario === 'rd' ? 2 : 4;
    const { base, chosen } = pickBaseAndAccessories(products, accessoryCount);
    const items = [base, ...chosen].filter(Boolean) as Product[];
    return items;
  }, [products, scenario]);

  const pricing = useMemo(() => {
    const priced = kit.filter((p) => (p.priceEur ?? 0) > 0);
    const knownSubtotal = priced.reduce((sum, p) => sum + p.priceEur, 0);
    const hasUnknown = kit.some((p) => (p.priceEur ?? 0) <= 0);
    return { knownSubtotal, hasUnknown };
  }, [kit]);

  const scenarioLabel = useMemo(() => {
    if (scenario === 'demo') return 'Demo & Formazione';
    if (scenario === 'rd') return 'Ricerca & Sviluppo';
    return 'Integrazione pronta';
  }, [scenario]);

  function addKit() {
    kit.forEach((p) => addToCart(p, 1));
    setStatus('added');
    setTimeout(() => setStatus('idle'), 2200);
  }

  const heroImage = kit[0]?.images?.[0];
  const thumbImages = useMemo(() => {
    const imgs: string[] = [];
    for (const p of kit) {
      for (const img of p.images ?? []) {
        if (img && !imgs.includes(img)) imgs.push(img);
        if (imgs.length >= 10) break;
      }
      if (imgs.length >= 10) break;
    }
    return imgs;
  }, [kit]);

  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const effectiveImg = selectedImg ?? heroImage ?? (thumbImages[0] ?? null);

  return (
    <div className="rounded-2xl border bg-white p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="text-sm text-gray-500">Crea il tuo kit</div>
          <h3 className="mt-1 text-xl font-bold">{scenarioLabel}</h3>
          <p className="mt-2 text-sm text-gray-600">
            Selezioniamo automaticamente il componente “base” e gli accessori più utili per il tuo scenario.
            Prezzi trasparenti dove disponibili, per il resto richiediamo il preventivo.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setScenario('demo')}
              className={
                scenario === 'demo'
                  ? 'rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white'
                  : 'rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50'
              }
            >
              Demo
            </button>
            <button
              type="button"
              onClick={() => setScenario('rd')}
              className={
                scenario === 'rd'
                  ? 'rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white'
                  : 'rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50'
              }
            >
              Ricerca
            </button>
            <button
              type="button"
              onClick={() => setScenario('integrato')}
              className={
                scenario === 'integrato'
                  ? 'rounded-lg bg-black px-3 py-2 text-sm font-semibold text-white'
                  : 'rounded-lg border px-3 py-2 text-sm font-semibold hover:bg-gray-50'
              }
            >
              Integrazione
            </button>
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">Totale stimato</div>
              {pricing.hasUnknown ? (
                <div className="text-sm font-bold">Su richiesta</div>
              ) : (
                <div className="text-sm font-bold">{formatEur(pricing.knownSubtotal)}</div>
              )}
            </div>
            {pricing.hasUnknown ? (
              <div className="mt-1 text-xs text-gray-600">Almeno un componente è “prezzo su richiesta”.</div>
            ) : (
              <div className="mt-1 text-xs text-gray-600">Stima basata sui prezzi confermati.</div>
            )}
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold">Componenti nel kit</div>
            <ul className="mt-2 space-y-2 text-sm text-gray-700">
              {kit.map((p) => (
                <li key={p.id} className="flex items-start justify-between gap-3">
                  <span className="min-w-0 flex-1">{p.name}</span>
                  <span className="flex-none font-semibold">
                    {p.priceEur > 0 ? formatEur(p.priceEur) : 'Prezzo su richiesta'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={addKit}
              className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
            >
              {status === 'added' ? 'Kit aggiunto ✅' : 'Aggiungi kit al carrello'}
            </button>
          </div>
        </div>

        <div className="md:w-[320px]">
          <div className="rounded-2xl border bg-gray-50 p-3">
            {effectiveImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={effectiveImg}
                alt={`Immagine kit ${solutionSlug}`}
                className="h-48 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="h-48 w-full rounded-xl bg-gray-200" />
            )}

            {thumbImages.length > 1 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {thumbImages.slice(0, 8).map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedImg(src)}
                    className={
                      (selectedImg ?? effectiveImg) === src
                        ? 'h-12 w-12 overflow-hidden rounded-lg border-2 border-black'
                        : 'h-12 w-12 overflow-hidden rounded-lg border hover:border-black/50'
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="thumb" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
