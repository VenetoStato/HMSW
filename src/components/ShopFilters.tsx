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
      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <div className="w-full sm:min-w-[220px] sm:flex-1">
          <label className="block text-xs font-medium text-gray-300">Cerca</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Es: GO2, B2, H2, Z1..."
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-white/20 min-h-[44px] placeholder:text-gray-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300">Brand</label>
          <select
            className="mt-1 w-full sm:w-auto rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-gray-100 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white/20"
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
          <label className="block text-xs font-medium text-gray-300">Categoria</label>
          <select
            className="mt-1 w-full sm:w-auto rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-gray-100 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white/20"
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
          <label className="block text-xs font-medium text-gray-300">Ordina</label>
          <select
            className="mt-1 w-full sm:w-auto rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-sm text-gray-100 min-h-[44px] focus-visible:ring-2 focus-visible:ring-white/20"
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
