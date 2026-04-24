'use client';

import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/types';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product, 1)}
      className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
    >
      Aggiungi al carrello
    </button>
  );
}
