import { getProducts } from '@/lib/catalog';
import { CartPageClient } from '@/components/CartPageClient';
import { getLocaleServer } from '@/lib/localeServer';
import { t, type Locale } from '@/lib/i18n';

export default async function CartPage() {
  const products = await getProducts();
  const locale: Locale = getLocaleServer();

  return (
    <main className="py-8">
      <h1 className="text-2xl font-bold">{t(locale, 'cartPageTitle')}</h1>
      <CartPageClient products={products} />
    </main>
  );
}
