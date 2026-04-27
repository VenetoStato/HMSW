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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:shadow-[0_18px_60px_rgba(0,0,0,0.45)] hover:-translate-y-[2px]">
      {/* subtle accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(circle at 20% 0%, rgba(99,102,241,0.18), transparent 45%), radial-gradient(circle at 90% 30%, rgba(56,189,248,0.16), transparent 45%)',
        }}
      />

      <Link href={`/prodotti/${product.slug}`} className="block relative z-10">
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
          <div className="text-xs text-gray-300">
            <span className="rounded-full bg-white/5 px-2 py-0.5">
              {product.brand}
            </span>{' '}
            <span className="text-gray-500">•</span> {product.category}
          </div>
          <h3 className="mt-1 text-base font-semibold leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-300">
            {shortTranslated}
          </p>
          {product.priceEur > 0 ? (
            <div className="mt-3 text-sm font-bold">
              {formatEur(product.priceEur)}
            </div>
          ) : (
            <div className="mt-3 text-sm font-bold">{t(locale, 'priceOnRequest')}</div>
          )}
        </div>
      </Link>

      <div className="p-4 pt-0 relative z-10">
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
