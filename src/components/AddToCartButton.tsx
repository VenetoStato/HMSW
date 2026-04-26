'use client';

import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/types';
import { t, type Locale } from '@/lib/i18n';
import { getLocaleClient } from '@/lib/localeClient';
import { FancyButton } from '@/components/FancyButton';

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const locale: Locale = getLocaleClient();

  return (
    <FancyButton
      variant="primary"
      className="w-full px-4 py-3 justify-center"
      onClick={() => addToCart(product, 1)}
    >
      {t(locale, 'addToCart')}
    </FancyButton>
  );
}
