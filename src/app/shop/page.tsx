import { getProducts } from '@/lib/catalog';
import { ShopFilters } from '@/components/ShopFilters';
import { getLocaleServer } from '@/lib/localeServer';
import { t, type Locale } from '@/lib/i18n';

export default async function ShopPage() {
  const products = await getProducts();
  const locale: Locale = getLocaleServer();

  return (
    <main className="py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{t(locale, 'shopTitle')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t(locale, 'shopSubtitle')}</p>
        </div>
      </div>

      <ShopFilters products={products} />
    </main>
  );
}
