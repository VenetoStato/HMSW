import { getProducts } from '@/lib/catalog';
import { getLocaleServer } from '@/lib/localeServer';
import type { Locale } from '@/lib/i18n';
import { QuoteRequestClient } from '@/components/QuoteRequestClient';

export default async function RichiestaPreventivoPage() {
  const products = await getProducts();
  const locale: Locale = getLocaleServer();

  return (
    <main className="py-8">
      <QuoteRequestClient products={products} locale={locale} />
    </main>
  );
}
