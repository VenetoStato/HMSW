'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { ProductGrid } from './ProductGrid';

export function ShopFilters({ products }: { products: Product[] }) {
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), [products]);
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);

  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [q, setQ] = useState<string>('');
  const [sort, setSort] = useState<'featured' | 'priceAsc' | 'priceDesc' | 'nameAsc'>('featured');

  const filtered = useMemo(() => {
    const base = products.filter((p) => {
      if (brand && p.brand !== brand) return false;
      if (category && p.category !== category) return false;
      const query = q.trim().toLowerCase();
      if (query) {
        const hay = `${p.name} ${p.shortDescription}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    const sorted = [...base];
    if (sort === 'priceAsc') sorted.sort((a, b) => a.priceEur - b.priceEur);
    if (sort === 'priceDesc') sorted.sort((a, b) => b.priceEur - a.priceEur);
    if (sort === 'nameAsc') sorted.sort((a, b) => a.name.localeCompare(b.name));
    // 'featured' keeps original order
    return sorted;
  }, [products, brand, category, q, sort]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white p-4">
        <div className="min-w-[220px] flex-1">
          <label className="block text-xs font-medium text-gray-600">Cerca</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Es: GO2, B2, H2, Z1..."
            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Brand</label>
          <select
            className="mt-1 rounded-lg border bg-white px-3 py-2 text-sm"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">Tutti</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Categoria</label>
          <select
            className="mt-1 rounded-lg border bg-white px-3 py-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Tutte</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Ordina</label>
          <select
            className="mt-1 rounded-lg border bg-white px-3 py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
          >
            <option value="featured">In evidenza</option>
            <option value="priceAsc">Prezzo ↑</option>
            <option value="priceDesc">Prezzo ↓</option>
            <option value="nameAsc">Nome A→Z</option>
          </select>
        </div>

        <div className="ml-auto text-sm text-gray-600">
          {filtered.length} prodotti
        </div>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
