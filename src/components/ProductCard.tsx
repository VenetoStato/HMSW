import type { Product } from '@/lib/types';
import { formatEur } from '@/lib/price';
import Link from 'next/link';
import Image from 'next/image';

export function ProductCard({ product }: { product: Product }) {
  const cover = product.images[0];

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white hover:shadow-sm">
      <Link href={`/prodotti/${product.slug}`} className="block">
        {cover ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50">
            <Image
              src={cover}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
          </div>
        ) : (
          <div className="aspect-[16/10] w-full bg-gray-50" />
        )}

        <div className="p-4">
          <div className="text-xs text-gray-500">{product.brand} • {product.category}</div>
          <h3 className="mt-1 text-base font-semibold leading-snug">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {product.shortDescription}
          </p>

          <div className="mt-3 text-sm font-bold">{formatEur(product.priceEur)}</div>
        </div>
      </Link>
    </div>
  );
}
