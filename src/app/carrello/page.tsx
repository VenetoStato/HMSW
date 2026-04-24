import { getProducts } from '@/lib/catalog';
import { CartPageClient } from '@/components/CartPageClient';

export default async function CartPage() {
  const products = await getProducts();
  return (
    <main className="py-8">
      <h1 className="text-2xl font-bold">Carrello</h1>
      <CartPageClient products={products} />
    </main>
  );
}
