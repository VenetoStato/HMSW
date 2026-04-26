import { FancyAnchor } from '@/components/FancyButton';
import { getProducts } from '@/lib/catalog';
import { matchProductsForSolution, SOLUTIONS, getLocalizedSolution } from '@/lib/solutions';
import { pickUniqueImages } from '@/lib/imageUtils';
import { ProductGrid } from '@/components/ProductGrid';
import { SolutionKitBuilder } from '@/components/SolutionKitBuilder';
import { DynamicAccentGradient } from '@/components/DynamicAccentGradient';
import { getLocaleServer } from '@/lib/localeServer';
import type { Locale } from '@/lib/i18n';

const TEXT: Record<Locale, {
  solutionChipFallback: string;
  heroMeta: string;
  faq: string;
  goShop: string;
  cart: string;
  visualInspiration: string;
  visualCaption: string;
  selectedCount: (n: number) => string;
  imageAltFallback: string;
  imageSolutionAlt: string;
  suggestedComponents: string;
  chosenHint: string;
  suggestedCountProducts: (n: number) => string;
  recommendedComponents: string;
  recommendedCount: (n: number) => string;
  compatibleLandingPrefix: (title: string) => string;
}> = {
  it: {
    solutionChipFallback: 'Soluzione',
    heroMeta: 'Kit configurabile • carrello con richiesta',
    faq: 'FAQ',
    goShop: 'Vai allo shop',
    cart: 'Carrello',
    visualInspiration: 'Ispirazioni visive',
    visualCaption: 'Immagini e riferimenti coerenti con la soluzione scelta',
    selectedCount: (n) => `${n} selezionati`,
    imageAltFallback: 'immagine',
    imageSolutionAlt: 'Immagine soluzione',
    suggestedComponents: 'Componenti suggeriti',
    chosenHint: 'Scelti con keyword + categoria',
    suggestedCountProducts: (n) => `${n} prodotti`,
    recommendedComponents: 'Componenti consigliati',
    recommendedCount: (n) => `${n} in evidenza`,
    compatibleLandingPrefix: (title) => `Prodotti compatibili con la landing: ${title}`,
  },
  en: {
    solutionChipFallback: 'Solution',
    heroMeta: 'Configurable kit • cart with request',
    faq: 'FAQ',
    goShop: 'Go to shop',
    cart: 'Cart',
    visualInspiration: 'Visual inspiration',
    visualCaption: 'Images and references consistent with the selected solution',
    selectedCount: (n) => `${n} selected`,
    imageAltFallback: 'image',
    imageSolutionAlt: 'Solution image',
    suggestedComponents: 'Suggested components',
    chosenHint: 'Chosen by keyword + category',
    suggestedCountProducts: (n) => `${n} products`,
    recommendedComponents: 'Recommended components',
    recommendedCount: (n) => `${n} featured`,
    compatibleLandingPrefix: (title) => `Compatible products for the landing: ${title}`,
  },
  de: {
    solutionChipFallback: 'Lösung',
    heroMeta: 'Konfigurierbares Kit • Warenkorb mit Anfrage',
    faq: 'FAQ',
    goShop: 'Zum Shop',
    cart: 'Warenkorb',
    visualInspiration: 'Visuelle Inspiration',
    visualCaption: 'Bilder und Referenzen passend zur gewählten Lösung',
    selectedCount: (n) => `${n} ausgewählt`,
    imageAltFallback: 'Bild',
    imageSolutionAlt: 'Lösungsbild',
    suggestedComponents: 'Vorgeschlagene Komponenten',
    chosenHint: 'Ausgewählt nach Keyword + Kategorie',
    suggestedCountProducts: (n) => `${n} Produkte`,
    recommendedComponents: 'Empfohlene Komponenten',
    recommendedCount: (n) => `${n} in Highlights`,
    compatibleLandingPrefix: (title) => `Kompatible Produkte für die Landing: ${title}`,
  },
  fr: {
    solutionChipFallback: 'Solution',
    heroMeta: 'Kit configurable • panier avec demande',
    faq: 'FAQ',
    goShop: 'Aller à la boutique',
    cart: 'Panier',
    visualInspiration: 'Inspiration visuelle',
    visualCaption: 'Images et références cohérentes avec la solution choisie',
    selectedCount: (n) => `${n} sélectionnés`,
    imageAltFallback: 'image',
    imageSolutionAlt: 'Image de la solution',
    suggestedComponents: 'Composants suggérés',
    chosenHint: 'Choisis par mot-clé + catégorie',
    suggestedCountProducts: (n) => `${n} produits`,
    recommendedComponents: 'Composants recommandés',
    recommendedCount: (n) => `${n} en vedette`,
    compatibleLandingPrefix: (title) => `Produits compatibles avec la landing : ${title}`,
  },
  nl: {
    solutionChipFallback: 'Oplossing',
    heroMeta: 'Configureerbare kit • winkelwagen met aanvraag',
    faq: 'FAQ',
    goShop: 'Ga naar de winkel',
    cart: 'Winkelwagen',
    visualInspiration: 'Visuele inspiratie',
    visualCaption: 'Afbeeldingen en referenties consistent met de gekozen oplossing',
    selectedCount: (n) => `${n} geselecteerd`,
    imageAltFallback: 'afbeelding',
    imageSolutionAlt: 'Oplossingsafbeelding',
    suggestedComponents: 'Gesuggereerde componenten',
    chosenHint: 'Gekozen op basis van keyword + categorie',
    suggestedCountProducts: (n) => `${n} producten`,
    recommendedComponents: 'Aanbevolen componenten',
    recommendedCount: (n) => `${n} in de kijker`,
    compatibleLandingPrefix: (title) => `Compatibele producten voor de landing: ${title}`,
  },
  no: {
    solutionChipFallback: 'Løsning',
    heroMeta: 'Konfigurerbart kit • handlekurv med forespørsel',
    faq: 'FAQ',
    goShop: 'Gå til butikken',
    cart: 'Handlekurv',
    visualInspiration: 'Visuell inspirasjon',
    visualCaption: 'Bilder og referanser som passer den valgte løsningen',
    selectedCount: (n) => `${n} valgt`,
    imageAltFallback: 'bilde',
    imageSolutionAlt: 'Løsningsbilde',
    suggestedComponents: 'Foreslåtte komponenter',
    chosenHint: 'Valgt etter nøkkelord + kategori',
    suggestedCountProducts: (n) => `${n} produkter`,
    recommendedComponents: 'Anbefalte komponenter',
    recommendedCount: (n) => `${n} i fokus`,
    compatibleLandingPrefix: (title) => `Kompatible produkter for landing: ${title}`,
  },
  es: {
    solutionChipFallback: 'Solución',
    heroMeta: 'Kit configurable • carrito con solicitud',
    faq: 'Preguntas frecuentes',
    goShop: 'Ir a la tienda',
    cart: 'Carrito',
    visualInspiration: 'Inspiración visual',
    visualCaption: 'Imágenes y referencias coherentes con la solución elegida',
    selectedCount: (n) => `${n} seleccionados`,
    imageAltFallback: 'imagen',
    imageSolutionAlt: 'Imagen de la solución',
    suggestedComponents: 'Componentes sugeridos',
    chosenHint: 'Elegidos por palabra clave + categoría',
    suggestedCountProducts: (n) => `${n} productos`,
    recommendedComponents: 'Componentes recomendados',
    recommendedCount: (n) => `${n} destacados`,
    compatibleLandingPrefix: (title) => `Productos compatibles para la landing: ${title}`,
  },
};

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const locale = getLocaleServer();
  const solution = SOLUTIONS.find((s) => s.slug === slug);
  const localized = solution ? getLocalizedSolution(solution, locale) : null;
  const title = localized?.title ?? `Soluzione ${slug}`;
  const description =
    localized?.seoDescription ?? 'Soluzione configurabile con prodotti e prezzi.';
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function SolutionPage({ params }: { params: { slug: string } }) {
  const locale = getLocaleServer();
  const txt = TEXT[locale] ?? TEXT.it;

  const slug = params.slug;
  const solution = SOLUTIONS.find((s) => s.slug === slug) ?? null;
  const localizedSolution = solution ? getLocalizedSolution(solution, locale) : null;

  const products = await getProducts();
  const matched = solution ? matchProductsForSolution(solution, products) : products.slice(0, 12);

  const imagePool = matched.flatMap((p) => p.images ?? []).filter(Boolean);
  const heroImages = pickUniqueImages(imagePool, { limit: 10, minW: 400, minH: 200 });
  const heroImg = heroImages[0] ?? null;
  const gallery = heroImages.slice(0, 8);

  return (
    <main className="py-6 md:py-10">
      <section
        className="overflow-hidden rounded-2xl border bg-white/65 accent-surface"
        style={{
          ['--acc-a' as any]: solution?.accentRgb?.a ?? '56 189 248',
          ['--acc-b' as any]: solution?.accentRgb?.b ?? '99 102 241',
          ['--acc-c' as any]: solution?.accentRgb?.c ?? '16 185 129',
        }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-5 md:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                {localizedSolution?.familyLabel ?? txt.solutionChipFallback}
              </div>
              <div className="text-xs text-gray-500">{txt.heroMeta}</div>
            </div>

            <h1 className="mt-3 text-2xl md:text-3xl font-bold">{localizedSolution?.title ?? slug}</h1>
            <p className="mt-3 text-sm md:text-base text-gray-600">
              {localizedSolution?.heroCopy ?? localizedSolution?.seoDescription ?? ''}
            </p>

            {(localizedSolution?.bullets ?? []).slice(0, 3).length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {(localizedSolution?.bullets ?? []).slice(0, 3).map((b, i) => (
                  <div key={i} className="rounded-xl border bg-white p-4">
                    <div className="text-xs font-semibold text-gray-700">{i + 1}</div>
                    <div className="mt-1 text-sm text-gray-600">{b}</div>
                  </div>
                ))}
              </div>
            ) : null}

            {localizedSolution?.include?.bullets?.length ? (
              <section className="mt-7">
                <h2 className="text-lg font-semibold">{localizedSolution.include.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {localizedSolution.include.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {localizedSolution?.audience?.bullets?.length ? (
              <section className="mt-7">
                <h2 className="text-lg font-semibold">{localizedSolution.audience.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {localizedSolution.audience.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {localizedSolution?.integration?.bullets?.length ? (
              <section className="mt-7">
                <h2 className="text-lg font-semibold">{localizedSolution.integration.title}</h2>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {localizedSolution.integration.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {localizedSolution?.faq?.length ? (
              <section className="mt-7">
                <h2 className="text-lg font-semibold">{txt.faq}</h2>
                <div className="mt-3 space-y-3">
                  {localizedSolution.faq.map((item, idx) => (
                    <details key={idx} className="rounded-xl border bg-white p-4">
                      <summary className="cursor-pointer text-sm font-semibold text-gray-900">
                        {item.q}
                      </summary>
                      <div className="mt-2 text-sm text-gray-600">{item.a}</div>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <FancyAnchor variant="primary" href="/shop" className="text-sm">
                {txt.goShop}
              </FancyAnchor>
              <FancyAnchor variant="secondary" href="/carrello" className="text-sm">
                {txt.cart}
              </FancyAnchor>
            </div>

            <div className="mt-6">
              <div className="mt-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{txt.visualInspiration}</div>
                  <div className="text-xs text-gray-500">{txt.visualCaption}</div>
                </div>
                <div className="text-xs text-gray-500">{txt.selectedCount(matched.length)}</div>
              </div>

              {gallery.length ? (
                <div className="mt-3 w-full max-w-full flex items-center gap-2 overflow-x-auto pb-1">
                  {gallery.map((src, idx) => (
                    <div
                      key={src + idx}
                      className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border bg-gray-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={localizedSolution?.title ?? txt.imageAltFallback}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative bg-gray-50 aspect-[4/3] md:aspect-[16/10] overflow-hidden">
            {heroImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImg}
                alt={localizedSolution?.title ?? txt.imageSolutionAlt}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-100" />
            )}
            <DynamicAccentGradient className="absolute inset-0" />

            <div className="relative p-6 md:p-8">
              <SolutionKitBuilder contextTitle={solution?.title ?? slug} products={matched} imagePool={matched} />

              <div className="mt-4 rounded-xl border bg-white/55 p-4 backdrop-blur accent-surface">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{txt.suggestedComponents}</div>
                    <div className="text-xs text-gray-600">{txt.chosenHint}</div>
                  </div>
                  <div className="text-sm text-gray-700">{txt.suggestedCountProducts(matched.length)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{txt.recommendedComponents}</h2>
            <p className="mt-1 text-sm text-gray-600">
              {txt.compatibleLandingPrefix(localizedSolution?.title ?? slug)}
            </p>
          </div>
          <div className="text-sm text-gray-500">{txt.recommendedCount(matched.length)}</div>
        </div>

        <div className="mt-4">
          <ProductGrid products={matched} />
        </div>
      </section>
    </main>
  );
}
