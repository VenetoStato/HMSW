'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { isProbablyGoodImageUrl } from '@/lib/imageUtils';

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const safe = useMemo(() => {
    const arr = Array.isArray(images) ? images : [];
    return arr
      .filter(Boolean)
      .filter((u) => isProbablyGoodImageUrl(u, { minW: 200, minH: 100 }));
  }, [images]);

  const [active, setActive] = useState(safe[0] ?? '');

  const activeIdx = useMemo(() => Math.max(0, safe.indexOf(active)), [active, safe]);

  useEffect(() => {
    if (!safe.length) return;
    if (!active || !safe.includes(active)) setActive(safe[0]);
  }, [safe, active]);

  if (!safe.length) {
    return <div className="aspect-[16/10] w-full rounded-xl border bg-gray-50" />;
  }

  return (
    <div className="rounded-xl border border-black/10 bg-white/60 backdrop-blur">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black/10 bg-white/55">
        {safe.length > 1 ? (
          <div className="absolute left-3 top-3 z-10 rounded-md bg-black/70 px-2 py-1 text-[11px] font-semibold text-white">
            {activeIdx + 1}/{safe.length}
          </div>
        ) : null}
        <Image
          src={active}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {safe.map((src) => (
          <button
            key={src}
            onClick={() => setActive(src)}
            className={
              active === src
                ? 'ring-2 ring-black rounded-md bg-white/70 shadow-sm'
                : 'rounded-md ring-1 ring-gray-200 bg-white/50 hover:ring-gray-400 hover:bg-white/70'
            }
          >
              <div className="relative h-16 w-16 overflow-hidden rounded-md bg-white/60">
              <Image
                src={src}
                alt={`${name} - thumbnail`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
