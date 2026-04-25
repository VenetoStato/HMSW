'use client';

import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/types';
import { t, type Locale } from '@/lib/i18n';
import { getLocaleClient } from '@/lib/localeClient';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const locale: Locale = getLocaleClient();

  return (
    <button
      onClick={() => addToCart(product, 1)}
      className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
    >
      {t(locale, 'addToCart')}
    </button>
  );
}
