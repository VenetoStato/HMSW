'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { ProductGrid } from './ProductGrid';

export function ShopFilters({ products }: { products: Product[] }) {
  const brands = useMemo(() => Array.from(new Set(products.map((p) => p.brand))), [products]);
  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), [products]);

  const [brand, setBrand] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (brand && p.brand !== brand) return false;
      if (category && p.category !== category) return false;
      return true;
    });
  }, [products, brand, category]);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-white p-4">
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

        <div className="ml-auto text-sm text-gray-600">
          {filtered.length} prodotti
        </div>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
