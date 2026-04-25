'use client';

import { useEffect, useRef } from 'react';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function DynamicAccentGradient({
  className,
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
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

    let raf = 0;
    const start = performance.now();

    const tick = (t: number) => {
      const el2 = ref.current;
      if (!el2) return;

      const s = (t - start) / 1000;

      // “26-ish tech” subtle drift + pointer influence
      const sx1 = 20 + Math.sin(s * 0.45) * 20;
      const sy1 = 20 + Math.cos(s * 0.38) * 18;

      const sx2 = 80 + Math.cos(s * 0.33) * 16;
      const sy2 = 18 + Math.sin(s * 0.41) * 16;

      const sx3 = 55 + Math.sin(s * 0.29 + 1.2) * 18;
      const sy3 = 92 + Math.cos(s * 0.27 + 0.6) * 12;

      const gx1 = 0.55 * sx1 + 0.45 * tx;
      const gy1 = 0.55 * sy1 + 0.45 * ty;
      const gx2 = 0.55 * sx2 + 0.45 * (100 - tx);
      const gy2 = 0.55 * sy2 + 0.45 * ty;
      const gx3 = 0.55 * sx3 + 0.45 * (tx * 0.6 + 20);
      const gy3 = 0.55 * sy3 + 0.45 * (ty * 0.4 + 55);

      el2.style.setProperty('--gx1', `${clamp(gx1, 0, 100)}%`);
      el2.style.setProperty('--gy1', `${clamp(gy1, 0, 100)}%`);
      el2.style.setProperty('--gx2', `${clamp(gx2, 0, 100)}%`);
      el2.style.setProperty('--gy2', `${clamp(gy2, 0, 100)}%`);
      el2.style.setProperty('--gx3', `${clamp(gx3, 0, 100)}%`);
      el2.style.setProperty('--gy3', `${clamp(gy3, 0, 100)}%`);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={['accent-hero-overlay', className].filter(Boolean).join(' ')}
      aria-hidden
    />
  );
}
