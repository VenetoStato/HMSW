import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/catalog';
import { formatEur } from '@/lib/price';
import { ProductGallery } from '@/components/ProductGallery';
import { AddToCartButton } from '@/components/AddToCartButton';
import type { Product } from '@/lib/types';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | UNITREE Shop`,
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <main className="py-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <div className="w-full md:flex-1">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div className="w-full md:w-[420px]">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{product.brand}</span>
            <span>•</span>
            <span>{product.category}</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold">{product.name}</h1>
          <p className="mt-3 text-sm text-gray-600">{product.description}</p>

          <div className="mt-4 rounded-2xl border bg-white p-4">
            <div className="text-2xl font-bold">{formatEur(product.priceEur)}</div>
            <div className="mt-1 text-xs text-gray-500">IVA inclusa (esempio)</div>

            <div className="mt-4">
              <AddToCartButton product={product} />
            </div>
          </div>

          {product.features?.length ? (
            <ul className="mt-6 space-y-2 text-sm text-gray-700">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                  {f}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 text-sm text-gray-600">
            <Link className="underline" href={`/soluzioni/${product.solutionSlug}`}>
              Vedi la soluzione correlata
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
