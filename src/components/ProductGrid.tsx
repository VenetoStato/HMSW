'use client';

import type { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

export function ProductGrid({
  products,
  excludeKeywords,
}: {
  products: Product[];
  // opzionale: per rimuovere componenti “sbagliati” su alcune landing (es. dexterous hands nella tending CNC)
  excludeKeywords?: string[];
}) {
  const hayNeedles = (excludeKeywords ?? [])
    .map((s) => (s ?? '').toLowerCase().trim())
    .filter(Boolean);

  const filtered = hayNeedles.length
    ? products.filter((p) => {
        const hay = [p.name, p.shortDescription, p.category, p.brand]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return !hayNeedles.some((kw) => kw && hay.includes(kw));
      })
    : products;

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
