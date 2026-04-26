import Link from 'next/link';
import { SOLUTIONS } from '@/lib/solutions';
import { DynamicAccentGradient } from '@/components/DynamicAccentGradient';
import { getLocaleServer } from '@/lib/localeServer';
import type { Locale } from '@/lib/i18n';

const HOME_TEXT: Record<Locale, { 
  title: string;
  subtitle: string;
  discoverSolution: string;
  solutionsHeading: string;
  solutionsSubheading: string;
  solutionCardLabel: string;
  howTitle: string;
  step1Title: string;
  step1Body: string;
  step2Title: string;
  step2Body: string;
  step3Title: string;
  step3Body: string;
}> = {
  it: {
    title: 'UNITREE Shop + Accessori',
    subtitle: 'Scegli la soluzione, esplora i prodotti con prezzi trasparenti e costruisci il tuo kit.',
    discoverSolution: 'Scopri una soluzione',
    solutionsHeading: 'Soluzioni',
    solutionsSubheading: 'Landing dedicate (una per ogni soluzione).',
    solutionCardLabel: 'Soluzione',
    howTitle: 'Come funziona',
    step1Title: '1) Scegli la soluzione',
    step1Body: 'Apri la landing e vedi i prodotti consigliati.',
    step2Title: '2) Guarda lo shop',
    step2Body: 'Tutti i prodotti con prezzi esposti e carrello.',
    step3Title: '3) Contatta / richiesta',
    step3Body: 'Invia la richiesta dal carrello per il preventivo.',
  },
  en: {
    title: 'UNITREE Shop + Accessories',
    subtitle: 'Choose your solution, explore products with transparent pricing, and build your kit.',
    discoverSolution: 'Discover a solution',
    solutionsHeading: 'Solutions',
    solutionsSubheading: 'Dedicated landing pages (one for each solution).',
    solutionCardLabel: 'Solution',
    howTitle: 'How it works',
    step1Title: '1) Choose your solution',
    step1Body: 'Open the landing page and see the recommended products.',
    step2Title: '2) Browse the shop',
    step2Body: 'All products with visible prices and a cart.',
    step3Title: '3) Contact / request',
    step3Body: 'Send your request from the cart for a quote.',
  },
  de: {
    title: 'UNITREE Shop + Zubehör',
    subtitle: 'Wählen Sie Ihre Lösung, entdecken Sie Produkte mit transparenten Preisen und stellen Sie Ihr Kit zusammen.',
    discoverSolution: 'Entdecken Sie eine Lösung',
    solutionsHeading: 'Lösungen',
    solutionsSubheading: 'Dedicated Landingpages (eine für jede Lösung).',
    solutionCardLabel: 'Lösung',
    howTitle: 'So funktioniert’s',
    step1Title: '1) Wählen Sie Ihre Lösung',
    step1Body: 'Öffnen Sie die Landingpage und sehen Sie die empfohlenen Produkte.',
    step2Title: '2) Shop ansehen',
    step2Body: 'Alle Produkte mit sichtbaren Preisen und Warenkorb.',
    step3Title: '3) Kontakt / Anfrage',
    step3Body: 'Senden Sie Ihre Anfrage aus dem Warenkorb für ein Angebot.',
  },
  fr: {
    title: 'Boutique UNITREE + Accessoires',
    subtitle: 'Choisissez votre solution, explorez les produits avec des prix transparents et composez votre kit.',
    discoverSolution: 'Découvrir une solution',
    solutionsHeading: 'Solutions',
    solutionsSubheading: 'Pages d’atterrissage dédiées (une pour chaque solution).',
    solutionCardLabel: 'Solution',
    howTitle: 'Comment ça marche',
    step1Title: '1) Choisissez votre solution',
    step1Body: 'Ouvrez la landing et découvrez les produits recommandés.',
    step2Title: '2) Voir la boutique',
    step2Body: 'Tous les produits avec prix affichés et panier.',
    step3Title: '3) Contacter / demande',
    step3Body: 'Envoyez votre demande depuis le panier pour un devis.',
  },
  nl: {
    title: 'UNITREE Shop + Accessoires',
    subtitle: 'Kies je oplossing, bekijk producten met transparante prijzen en stel je kit samen.',
    discoverSolution: 'Ontdek een oplossing',
    solutionsHeading: 'Oplossingen',
    solutionsSubheading: 'Dedicated landings (één voor elke oplossing).',
    solutionCardLabel: 'Oplossing',
    howTitle: 'Zo werkt het',
    step1Title: '1) Kies je oplossing',
    step1Body: 'Open de landing en bekijk de aanbevolen producten.',
    step2Title: '2) Bekijk de shop',
    step2Body: 'Alle producten met zichtbare prijzen en winkelwagen.',
    step3Title: '3) Contact / aanvraag',
    step3Body: 'Stuur je aanvraag vanuit de winkelwagen voor een offerte.',
  },
  no: {
    title: 'UNITREE Shop + Tilbehør',
    subtitle: 'Velg løsning, utforsk produkter med transparente priser og bygg din pakke.',
    discoverSolution: 'Oppdag en løsning',
    solutionsHeading: 'Løsninger',
    solutionsSubheading: 'Dedikerte landingssider (én for hver løsning).',
    solutionCardLabel: 'Løsning',
    howTitle: 'Slik fungerer det',
    step1Title: '1) Velg løsning',
    step1Body: 'Åpne landingssiden og se anbefalte produkter.',
    step2Title: '2) Se butikken',
    step2Body: 'Alle produkter med synlige priser og handlekurv.',
    step3Title: '3) Kontakt / forespørsel',
    step3Body: 'Send forespørselen fra handlekurven for et tilbud.',
  },
  es: {
    title: 'Tienda UNITREE + Accesorios',
    subtitle: 'Elige tu solución, explora productos con precios transparentes y monta tu kit.',
    discoverSolution: 'Descubre una solución',
    solutionsHeading: 'Soluciones',
    solutionsSubheading: 'Landings dedicadas (una por cada solución).',
    solutionCardLabel: 'Solución',
    howTitle: 'Cómo funciona',
    step1Title: '1) Elige tu solución',
    step1Body: 'Abre la landing y ve los productos recomendados.',
    step2Title: '2) Ver la tienda',
    step2Body: 'Todos los productos con precios visibles y carrito.',
    step3Title: '3) Contactar / solicitud',
    step3Body: 'Envía tu solicitud desde el carrito para un presupuesto.',
  },
};

export default async function Home() {
  const locale = getLocaleServer();
  const text = HOME_TEXT[locale] ?? HOME_TEXT.it;

  return (
    <main className="py-8">
      <section className="rounded-2xl border p-6 motion-gradient-hero bg-white">
        <h1 className="text-3xl font-bold tracking-tight">{text.title}</h1>
        <p className="mt-2 text-gray-700">{text.subtitle}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            href="/shop"
            className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            {locale === 'it' ? 'Vai allo shop' : locale === 'de' ? 'Zum Shop' : locale === 'fr' ? 'Aller à la boutique' : locale === 'nl' ? 'Ga naar de winkel' : locale === 'no' ? 'Gå til butikken' : locale === 'es' ? 'Ir a la tienda' : 'Go to shop'}
          </Link>
          <Link
            href={`/soluzioni/${SOLUTIONS[0]?.slug ?? 'robot-per-uso-quotidiano'}`}
            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            {text.discoverSolution}
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{text.solutionsHeading}</h2>
            <p className="mt-1 text-sm text-gray-600">{text.solutionsSubheading}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Link
              key={s.slug}
              href={`/soluzioni/${s.slug}`}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-2xl border bg-white/65 p-5 accent-surface backdrop-blur transition-shadow group-hover:shadow-sm"
                style={{
                  ['--acc-a' as any]: s.accentRgb?.a ?? '56 189 248',
                  ['--acc-b' as any]: s.accentRgb?.b ?? '99 102 241',
                  ['--acc-c' as any]: s.accentRgb?.c ?? '16 185 129',
                }}
              >
                <DynamicAccentGradient className="absolute inset-0 opacity-90" />

                <div className="relative z-10">
                  <div className="text-xs text-gray-600">{text.solutionCardLabel}</div>
                  <h3 className="mt-1 text-lg font-bold group-hover:underline">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.seoDescription}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border bg-white p-6">
        <h2 className="text-xl font-semibold">{text.howTitle}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">{text.step1Title}</div>
            <div className="mt-1 text-sm text-gray-600">{text.step1Body}</div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">{text.step2Title}</div>
            <div className="mt-1 text-sm text-gray-600">{text.step2Body}</div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4">
            <div className="text-sm font-semibold">{text.step3Title}</div>
            <div className="mt-1 text-sm text-gray-600">{text.step3Body}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
