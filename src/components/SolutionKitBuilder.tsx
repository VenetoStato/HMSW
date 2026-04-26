'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { formatEur } from '@/lib/price';
import { pickUniqueImages } from '@/lib/imageUtils';
import { t, type Locale } from '@/lib/i18n';
import { getLocaleClient } from '@/lib/localeClient';

type Scenario = 'demo' | 'rd' | 'integrato';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function pickBaseAndAccessories(products: Product[], accessoryCount: number, contextTitle: string) {
  const priced = products.filter((p) => (p.priceEur ?? 0) > 0);

  const ctx = contextTitle.toLowerCase();
  const baseCategoryHints: string[] = [];
  if (ctx.includes('quad') || ctx.includes('quadruped')) baseCategoryHints.push('mobile robots', 'quadruped');
  if (ctx.includes('braccia') || ctx.includes('gripper') || ctx.includes('robotic arm')) {
    baseCategoryHints.push('robotic arms', 'robotic gripper', 'arm', 'gripper', 'z1');
  }
  if (ctx.includes('umano')) baseCategoryHints.push('humanoid robots', 'humanoid');
  if (ctx.includes('accessor')) baseCategoryHints.push('accessory', 'charger', 'battery', 'dock', 'controller');

  const normalize = (s: string) => s.toLowerCase();
  const matchesHint = (p: Product) => {
    const hay = normalize([p.name, p.category, p.brand].filter(Boolean).join(' '));
    return baseCategoryHints.some((h) => hay.includes(h));
  };

  const baseCandidates = priced.length ? priced.filter(matchesHint) : [];
  const base =
    baseCandidates
      .sort((a, b) => b.priceEur - a.priceEur || a.name.localeCompare(b.name))[0] ??
    priced.sort((a, b) => b.priceEur - a.priceEur || a.name.localeCompare(b.name))[0] ??
    products[0];

  const accessories = priced
    .filter((p) => p.id !== base?.id)
    .sort((a, b) => a.priceEur - b.priceEur)
    .slice(0, accessoryCount);

  const chosen = accessories;
  return { base, chosen };
}

export function SolutionKitBuilder({
  contextTitle,
  products,
  imagePool,
}: {
  contextTitle: string;
  products: Product[];
  imagePool?: Product[];
}) {
  const { addToCart } = useCart();
  const [scenario, setScenario] = useState<Scenario>('rd');
  const [status, setStatus] = useState<'idle' | 'added'>('idle');

  const kit = useMemo(() => {
    const accessoryCount = scenario === 'demo' ? 1 : scenario === 'rd' ? 2 : 4;
    const { base, chosen } = pickBaseAndAccessories(products, accessoryCount, contextTitle);
    const items = [base, ...chosen].filter(Boolean) as Product[];
    return items;
  }, [products, scenario, contextTitle]);

  const pricing = useMemo(() => {
    const priced = kit.filter((p) => (p.priceEur ?? 0) > 0);
    const knownSubtotal = priced.reduce((sum, p) => sum + p.priceEur, 0);
    const hasUnknown = kit.some((p) => (p.priceEur ?? 0) <= 0);
    return { knownSubtotal, hasUnknown };
  }, [kit]);

  const locale: Locale = getLocaleClient();

  const scenarioLabel = useMemo(() => {
    if (scenario === 'demo') return t(locale, 'scenarioQuickLabel');
    if (scenario === 'rd') return t(locale, 'scenarioResearchLabel');
    return t(locale, 'scenarioIntegrationLabel');
  }, [scenario, locale]);

  const NOTES_KEY = 'unitree_shop_cart_note_v1';
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    try {
      const v = localStorage.getItem(NOTES_KEY);
      if (typeof v === 'string' && v.trim()) setNote(v);
    } catch {
      // ignore
    }
  }, []);

  function persistNote(nextNote: string) {
    try {
      const cleaned = (nextNote ?? '').toString();
      localStorage.setItem(NOTES_KEY, cleaned);
    } catch {
      // ignore
    }
  }

  function addKit() {
    persistNote(note);

    kit.forEach((p) => addToCart(p, 1));
    setStatus('added');
    setTimeout(() => setStatus('idle'), 2200);
  }

  const pool = imagePool ?? products;

  const allImages = useMemo(() => {
    const all: string[] = [];
    for (const p of pool) {
      for (const img of p.images ?? []) {
        if (img) all.push(img);
      }
    }
    return all;
  }, [pool]);
  const thumbImages = useMemo(() => {
    return pickUniqueImages(allImages, { limit: 12, minW: 200, minH: 100 });
  }, [allImages]);

  const heroImage = useMemo(() => {
    return pickUniqueImages(allImages, { limit: 1, minW: 500, minH: 250 })[0] ?? thumbImages[0] ?? null;
  }, [allImages, thumbImages]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const effectiveImg = selectedImg ?? heroImage;

  const progress = scenario === 'demo' ? 33 : scenario === 'rd' ? 66 : 100;

  const scenarioAccents =
    scenario === 'demo'
      ? { a: '56 189 248', b: '99 102 241', c: '16 185 129' }
      : scenario === 'rd'
        ? { a: '168 85 247', b: '99 102 241', c: '56 189 248' }
        : { a: '251 191 36', b: '244 63 94', c: '59 130 246' };

  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let tx = 55;
    let ty = 35;

    const onPointerMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / Math.max(1, r.width);
      const y = (e.clientY - r.top) / Math.max(1, r.height);
      tx = clamp(x * 100, 0, 100);
      ty = clamp(y * 100, 0, 100);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const speed = scenario === 'demo' ? 0.35 : scenario === 'rd' ? 0.45 : 0.55;

    let raf = 0;
    const start = performance.now();

    const tick = (t: number) => {
      const s = (t - start) / 1000;

      const sx1 = 12 + Math.sin(s * speed) * 18;
      const sy1 = 22 + Math.cos(s * (speed * 0.9)) * 16;

      const sx2 = 88 + Math.cos(s * (speed * 0.7)) * 14;
      const sy2 = 26 + Math.sin(s * (speed * 0.8)) * 12;

      const gx1 = 0.6 * sx1 + 0.4 * tx;
      const gy1 = 0.6 * sy1 + 0.4 * ty;
      const gx2 = 0.6 * sx2 + 0.4 * (100 - tx);
      const gy2 = 0.6 * sy2 + 0.4 * ty;

      el.style.setProperty('--gx1', `${clamp(gx1, 0, 100)}%`);
      el.style.setProperty('--gy1', `${clamp(gy1, 0, 100)}%`);
      el.style.setProperty('--gx2', `${clamp(gx2, 0, 100)}%`);
      el.style.setProperty('--gy2', `${clamp(gy2, 0, 100)}%`);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, [scenario]);

  return (
    <div
      ref={rootRef}
      className="rounded-2xl border p-4 md:p-5 accent-surface backdrop-blur"
      style={{
        ['--acc-a' as any]: scenarioAccents.a,
        ['--acc-b' as any]: scenarioAccents.b,
        ['--acc-c' as any]: scenarioAccents.c,
      }}
    >
      <div className="rounded-xl bg-black/[0.03] p-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-sm text-gray-500">{t(locale, 'configurator')}</div>
            <div className="mt-0.5 text-sm font-bold">{contextTitle}</div>
          </div>
          <div className="text-xs text-gray-500">
            {t(locale, 'progressLabel')} {progress}%
          </div>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ backgroundColor: 'rgb(var(--acc-b) / 1)', width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{t(locale, 'step1Scenario')}</div>
          <h3 className="mt-1 text-xl font-bold">{scenarioLabel}</h3>
          <p className="mt-2 text-sm text-gray-600">{t(locale, 'scenarioIntro')}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setScenario('demo')}
              className={
                scenario === 'demo'
                  ? 'rounded-lg bg-gradient-to-r from-black via-neutral-900 to-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm'
                  : 'rounded-lg border border-black/20 bg-white/70 px-3 py-2 text-sm font-semibold hover:bg-black/5 hover:border-black/30'
              }
            >
              {t(locale, 'scenarioDemoButton')}
            </button>
            <button
              type="button"
              onClick={() => setScenario('rd')}
              className={
                scenario === 'rd'
                  ? 'rounded-lg bg-gradient-to-r from-black via-neutral-900 to-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm'
                  : 'rounded-lg border border-black/20 bg-white/70 px-3 py-2 text-sm font-semibold hover:bg-black/5 hover:border-black/30'
              }
            >
              {t(locale, 'scenarioResearchButton')}
            </button>
            <button
              type="button"
              onClick={() => setScenario('integrato')}
              className={
                scenario === 'integrato'
                  ? 'rounded-lg bg-gradient-to-r from-black via-neutral-900 to-zinc-800 px-3 py-2 text-sm font-semibold text-white shadow-sm'
                  : 'rounded-lg border border-black/20 bg-white/70 px-3 py-2 text-sm font-semibold hover:bg-black/5 hover:border-black/30'
              }
            >
              {t(locale, 'scenarioIntegrationButton')}
            </button>
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">{t(locale, 'totalEstimated')}</div>
              {pricing.hasUnknown ? (
                <div className="text-sm font-bold">{t(locale, 'unknownPrices')}</div>
              ) : (
                <div className="text-sm font-bold">{formatEur(pricing.knownSubtotal)}</div>
              )}
            </div>
            <div className="mt-1 text-xs text-gray-600">
              {pricing.hasUnknown ? (
                <span>{t(locale, 'unknownPriceHint')}</span>
              ) : (
                <span>{t(locale, 'knownPricingHint')}</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold">{t(locale, 'step2KitComponents')}</div>
            <ul
              key={scenario}
              className="mt-2 space-y-2 text-sm text-gray-700 motion-kit-swap"
            >
              {kit.map((p) => (
                <li key={p.id} className="flex items-start justify-between gap-3">
                  <span className="min-w-0 flex-1">{p.name}</span>
                  <span className="flex-none font-semibold">
                    {p.priceEur > 0 ? formatEur(p.priceEur) : t(locale, 'priceOnRequest')}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={addKit}
              className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
            >
              {status === 'added' ? t(locale, 'kitAddedNotice') : t(locale, 'addKitToCart')}
            </button>
          </div>

          <div className="mt-4">
            <div className="text-sm font-semibold">{t(locale, 'step3RequestOptional')}</div>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
                placeholder={t(locale, 'notePlaceholder')}
              className="mt-2 min-h-24 w-full resize-y rounded-lg border bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
            <div className="mt-2 text-xs text-gray-500">
              {t(locale, 'noteSavedText')} {t(locale, 'noOnlinePayment')}
            </div>
          </div>
        </div>

        <div className="md:w-[340px]">
          <div className="rounded-2xl border bg-gray-50 p-3">
            <div className="relative">
              {effectiveImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={effectiveImg}
                  alt={`Immagine ${contextTitle}`}
                  className="h-52 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="h-52 w-full rounded-xl bg-gray-200" />
              )}

              {thumbImages.length > 1 ? (
                <div className="pointer-events-none absolute inset-0 flex items-end justify-between px-2 pb-2">
                  <button
                    type="button"
                    onClick={() => {
                      const cur = selectedImg ?? heroImage;
                      const idx = thumbImages.findIndex((x) => x === cur);
                      const next = thumbImages[(idx - 1 + thumbImages.length) % thumbImages.length];
                      setSelectedImg(next);
                    }}
                    className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur hover:bg-black"
                    aria-label={t(locale, 'imagePrev')}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const cur = selectedImg ?? heroImage;
                      const idx = thumbImages.findIndex((x) => x === cur);
                      const next = thumbImages[(idx + 1) % thumbImages.length];
                      setSelectedImg(next);
                    }}
                    className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur hover:bg-black"
                    aria-label={t(locale, 'imageNext')}
                  >
                    ›
                  </button>
                </div>
              ) : null}

              {thumbImages.length ? (
                <div className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-1 text-xs font-semibold text-gray-800 backdrop-blur">
                  {(thumbImages.findIndex((x) => x === (selectedImg ?? heroImage)) + 1) || 1}/{thumbImages.length}
                </div>
              ) : null}
            </div>

            {thumbImages.length > 1 ? (
              <div className="mt-3 w-full max-w-full flex gap-2 overflow-x-auto pb-1">
                {thumbImages.slice(0, 10).map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setSelectedImg(src)}
                    className={
                      (selectedImg ?? heroImage) === src
                        ? 'h-12 w-12 shrink-0 overflow-hidden rounded-lg border-2 border-black'
                        : 'h-12 w-12 shrink-0 overflow-hidden rounded-lg border hover:border-black/50'
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="thumb" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="mt-3 text-xs text-gray-500">{t(locale, 'step4Gallery')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
