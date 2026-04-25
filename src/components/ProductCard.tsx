'use client';

import type { Product } from '@/lib/types';
import { formatEur } from '@/lib/price';
import Link from 'next/link';
import Image from 'next/image';
import { AddToCartButton } from '@/components/AddToCartButton';
import { t, type Locale } from '@/lib/i18n';
import { getLocaleClient } from '@/lib/localeClient';

export function ProductCard({ product }: { product: Product }) {
  const locale: Locale = getLocaleClient();
  const cover = product.images[0];
  const cover2 = product.images[1];

  const short = (product.shortDescription ?? '').trim();
  const shortTranslated =
    short.toUpperCase() === 'RICHIEDI INFORMAZIONI'
      ? t(locale, 'requestInfoShort')
      : product.shortDescription;

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-sm">
      <Link href={`/prodotti/${product.slug}`} className="block">
        {cover ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50">
            <div className="absolute inset-0">
              <Image
                src={cover}
                alt={product.name}
                fill
                className="object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-0"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={false}
              />
            </div>
            {cover2 ? (
              <div className="absolute inset-0">
                <Image
                  src={cover2}
                  alt={product.name}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={false}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="aspect-[16/10] w-full bg-gray-50" />
        )}

        <div className="p-4 pb-3">
          <div className="text-xs text-gray-500">{product.brand} • {product.category}</div>
          <h3 className="mt-1 text-base font-semibold leading-snug line-clamp-2">{product.name}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">{shortTranslated}</p>
          {product.priceEur > 0 ? (
            <div className="mt-3 text-sm font-bold">{formatEur(product.priceEur)}</div>
          ) : (
            <div className="mt-3 text-sm font-bold">{t(locale, 'priceOnRequest')}</div>
          )}
        </div>
      </Link>

      <div className="p-4 pt-0">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
