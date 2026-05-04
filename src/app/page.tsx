import Image from 'next/image';
import Link from 'next/link';

import { SOLUTIONS } from '@/lib/solutions';
import type { Locale } from '@/lib/i18n';
import { getLocaleServer } from '@/lib/localeServer';
import { DynamicAccentGradient } from '@/components/DynamicAccentGradient';
import { FancyAnchor } from '@/components/FancyButton';
import { LeadMagnetClient } from '@/components/LeadMagnetClient';

type HomeCopy = {
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;

  solutionsHeading: string;
  solutionsSubheading: string;

  approachTitle: string;
  approachBullets: string[];

  servicesTitle: string;
  servicesBullets: string[];

  costTitle: string;
  costBody: string;
  costBullets: string[];

  processTitle: string;
  processSteps: Array<{ title: string; body: string }>;

  aboutTitle: string;
  aboutBody: string;
  aboutBullets: string[];
};

const HOME_TEXT: Partial<Record<Locale, HomeCopy>> = {
  it: {
    heroTitle: 'UNITREE Shop + Accessori: scegli la soluzione, costruisci il kit',
    heroSubtitle:
      'Una landing per ogni scenario, uno shop con prezzi trasparenti dove disponibili e un flusso guidato per arrivare alla tua configurazione.',
    heroPrimaryCta: 'Configura la tua soluzione',
    heroSecondaryCta: 'Vai allo shop',

    solutionsHeading: 'Soluzioni',
    solutionsSubheading: 'Una landing dedicata (una per ogni soluzione) per accelerare scelta e compatibilità.',

    approachTitle: 'Approccio high-level (senza perdere tempo)',
    approachBullets: [
      'Partiamo dai tuoi obiettivi (demo, R&D o integrazione) e ti mostriamo la direzione giusta.',
      'Selezioniamo componenti coerenti e ti guidiamo nel configuratore.',
      'Carrello e richiesta servono a confermare disponibilità, spedizione e dettagli di integrazione.',
    ],

    servicesTitle: 'Cosa facciamo',
    servicesBullets: [
      'Fornitura e configurazione: kit pronti per partire subito',
      'Assessment / POC: verifiche mirate prima di andare “in produzione”',
      'Sviluppo codice e training: supporto per integrare più velocemente',
    ],

    costTitle: 'Obiezione: “Quanto mi costa?”',
    costBody:
      'Il punto è chiarire budget e fattibilità prima di iniziare. Dove possibile mostriamo prezzi; dove non lo è, gestiamo “su richiesta” con conferma guidata.',
    costBullets: [
      'Trasparenza: prezzi esposti dove disponibili',
      'Conferma: per i componenti su richiesta il totale viene validato prima di procedere',
      'Zero sorprese: il carrello serve a finalizzare dettagli e disponibilità',
    ],

    processTitle: 'Processo di lavoro',
    processSteps: [
      { title: '1) Scelta guidata', body: 'Apri la landing della soluzione e prendi la direzione giusta.' },
      { title: '2) Configura lo shop', body: 'Aggiungi al carrello i componenti compatibili con prezzi esposti quando presenti.' },
      { title: '3) Richiesta di conferma', body: 'Invia dal carrello: verifichiamo disponibilità, spedizione e requisiti.' },
      { title: '4) Kit / POC / integrazione', body: 'Ricevi conferma e supporto per partire (o validare con un POC).' },
    ],

    aboutTitle: 'About us (chi siamo)',
    aboutBody:
      'Siamo un team orientato a robotica applicata: aiutiamo team R&D, formazione e integrazione a ridurre tempi di setup e rischio tecnico.',
    aboutBullets: [
      'Approccio pragmatico: prima l’obiettivo, poi la configurazione',
      'Focus su compatibilità e integrazione',
      'Supporto tecnico quando serve (POC / training / sviluppo)',
    ],
  },
  en: {
    heroTitle: 'UNITREE Shop + Accessories: pick a solution, build your kit',
    heroSubtitle:
      'Landing pages for each scenario, a shop with transparent pricing where available, and a guided flow to reach your configuration.',
    heroPrimaryCta: 'Configure your solution',
    heroSecondaryCta: 'Go to shop',

    solutionsHeading: 'Solutions',
    solutionsSubheading: 'Dedicated landing (one per solution) to speed up choices and compatibility.',

    approachTitle: 'High-level approach (no time wasted)',
    approachBullets: [
      'We start from your goals (demo, R&D or integration) and point you to the right direction.',
      'We select coherent components and guide you through the configurator.',
      'Cart + request are used to confirm availability, shipping and integration details.',
    ],

    servicesTitle: 'What we do',
    servicesBullets: [
      'Supply & configuration: kits you can start with right away',
      'Assessment / POC: targeted checks before going “production”',
      'Code development & training: help for faster integration',
    ],

    costTitle: 'Concern: “How much will it cost?”',
    costBody:
      'We clarify budget and feasibility upfront. Where possible we show prices; otherwise we handle “on request” with guided confirmation.',
    costBullets: [
      'Transparency: listed prices when available',
      'Confirmation: totals for “on request” components are validated before proceeding',
      'No surprises: the cart finalizes details and availability',
    ],

    processTitle: 'Workflow',
    processSteps: [
      { title: '1) Guided choice', body: 'Open the solution landing to get the right direction.' },
      { title: '2) Configure the shop', body: 'Add compatible components to the cart with visible prices when present.' },
      { title: '3) Confirmation request', body: 'Send from the cart: we verify availability, shipping and requirements.' },
      { title: '4) Kit / POC / integration', body: 'Receive confirmation and support to start (or validate via POC).' },
    ],

    aboutTitle: 'About us',
    aboutBody:
      'We focus on applied robotics: we help R&D teams, education and integration reduce setup time and technical risk.',
    aboutBullets: [
      'Pragmatic approach: first goals, then configuration',
      'Compatibility & integration focus',
      'Technical support when needed (POC / training / development)',
    ],
  },
};

export default async function Home() {
  const locale = getLocaleServer();
  const text = HOME_TEXT[locale] ?? HOME_TEXT.it;

  const primarySolutionSlug = SOLUTIONS[0]?.slug ?? 'quadrupedi';
  const primarySolutionAccent = SOLUTIONS[0]?.accentRgb ?? { a: '56 189 248', b: '99 102 241', c: '16 185 129' };

  return (
    <main className="py-8">
      <section
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur"
        style={{
          ['--acc-a' as any]: primarySolutionAccent.a,
          ['--acc-b' as any]: primarySolutionAccent.b,
          ['--acc-c' as any]: primarySolutionAccent.c,
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <div className="absolute inset-0 accent-surface" />
        </div>

        <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-gray-200/90">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400/90" />
              {locale === 'it' ? 'Setup guidato • pricing trasparente dove possibile' : 'Guided setup • transparent pricing where available'}
            </div>

            <h1 className="mt-5 text-3xl md:text-4xl font-bold tracking-tight text-white">
              {text?.heroTitle}
            </h1>
            <p className="mt-3 text-sm md:text-base text-gray-200/80 leading-relaxed max-w-xl">
              {text?.heroSubtitle}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
              <FancyAnchor variant="primary" href={`/soluzioni/${primarySolutionSlug}`} className="justify-center">
                {text?.heroPrimaryCta}
              </FancyAnchor>
              <FancyAnchor variant="secondary" href="/shop" className="justify-center">
                {text?.heroSecondaryCta}
              </FancyAnchor>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { label: locale === 'it' ? 'Landing dedicate' : 'Dedicated landings', value: locale === 'it' ? 'per soluzione' : 'per solution' },
                { label: locale === 'it' ? 'Prezzi esposti' : 'Visible prices', value: locale === 'it' ? 'dove disponibili' : 'where available' },
                { label: locale === 'it' ? 'Richiesta guidata' : 'Guided request', value: locale === 'it' ? 'dal carrello' : 'from cart' },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-gray-200/70">{s.label}</div>
                  <div className="mt-1 text-sm font-semibold">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/25 via-indigo-500/25 to-emerald-500/25 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-black/25 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white">UNITREE Shop</div>
                <div className="text-xs rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-200/80">
                  {SOLUTIONS.length} soluzioni
                </div>
              </div>
              <div className="mt-4">
                {/* Use our local asset (no external branding images) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src="/logo.jpg"
                    alt="UNITREE Shop"
                    width={640}
                    height={360}
                    className="h-52 w-full object-cover opacity-95"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0">
                    <DynamicAccentGradient className="absolute inset-0 opacity-50" />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs md:text-sm text-gray-200/80 leading-relaxed">
                {locale === 'it'
                  ? 'Dalla scelta alla configurazione: meno tentativi, più risultati.'
                  : 'From choice to configuration: fewer attempts, more results.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">{text?.solutionsHeading}</h2>
            <p className="mt-1 text-sm text-gray-200/70">{text?.solutionsSubheading}</p>
          </div>
          <Link href="/soluzioni" className="text-sm text-gray-200/80 underline underline-offset-4 hover:text-white">
            {locale === 'it' ? 'Vedi tutte' : 'View all'}
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <Link
              key={s.slug}
              href={`/soluzioni/${s.slug}`}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 group-hover:-translate-y-[2px] group-hover:bg-white/7"
                style={{
                  ['--acc-a' as any]: s.accentRgb?.a ?? '56 189 248',
                  ['--acc-b' as any]: s.accentRgb?.b ?? '99 102 241',
                  ['--acc-c' as any]: s.accentRgb?.c ?? '16 185 129',
                }}
              >
                <div className="pointer-events-none absolute inset-0">
                  <DynamicAccentGradient className="absolute inset-0 opacity-35" />
                </div>
                <div className="relative z-10">
                  <div className="text-xs text-gray-200/70">{locale === 'it' ? 'Soluzione' : 'Solution'}</div>
                  <h3 className="mt-1 text-lg font-bold text-white group-hover:underline">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
                    {s.seoDescription}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">{text?.approachTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm md:text-base text-gray-200/80">
              {text?.approachBullets.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-400/90" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">{text?.servicesTitle}</h2>
            <ul className="mt-4 space-y-3 text-sm md:text-base text-gray-200/80">
              {text?.servicesBullets.map((b, i) => (
                <li key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4 flex gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-indigo-400/90" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 rounded-3xl border border-white/10 bg-black/20 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight">{text?.costTitle}</h2>
              <p className="mt-2 text-sm md:text-base text-gray-200/80 leading-relaxed">{text?.costBody}</p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm md:text-base text-gray-200/80">
            {text?.costBullets.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-cyan-300/90" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">{text?.processTitle}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {text?.processSteps.map((s, idx) => (
            <div key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-sm font-bold">
                  {idx + 1}
                </div>
                <div>
                  <div className="text-base font-semibold text-white">{s.title}</div>
                  <div className="mt-1 text-sm text-gray-200/80 leading-relaxed">{s.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur">
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr] items-start">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">{text?.aboutTitle}</h2>
            <p className="mt-3 text-sm md:text-base text-gray-200/80 leading-relaxed">{text?.aboutBody}</p>
          </div>
          <div>
            <ul className="space-y-3">
              {text?.aboutBullets.map((b, i) => (
                <li key={i} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-gray-200/80">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <LeadMagnetClient locale={locale} />

      <section className="mt-8">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-xl font-bold">{locale === 'it' ? 'Vuoi passare subito all’azione?' : 'Ready to move?'}</h2>
              <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
                {locale === 'it'
                  ? 'Scegli una soluzione e costruisci il tuo kit nello shop con compatibilità guidata.'
                  : 'Pick a solution and build your kit in the shop with guided compatibility.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <FancyAnchor variant="primary" href={`/soluzioni/${primarySolutionSlug}`}>
                {locale === 'it' ? 'Apri una soluzione' : 'Open a solution'}
              </FancyAnchor>
              <FancyAnchor variant="secondary" href="/shop">
                {locale === 'it' ? 'Vai allo shop' : 'Go to shop'}
              </FancyAnchor>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
