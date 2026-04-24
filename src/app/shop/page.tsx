import { getProducts } from '@/lib/catalog';
import { ProductGrid } from '@/components/ProductGrid';
import type { Product } from '@/lib/types';
import { ShopFilters } from '@/components/ShopFilters';

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Shop</h1>
          <p className="mt-1 text-sm text-gray-600">Unitree e accessori, con prezzi e carrello.</p>
        </div>
      </div>

      <ShopFilters products={products} />
    </main>
  );
}
