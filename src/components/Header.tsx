'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useCart } from '@/lib/cart';
import { t, type Locale } from '@/lib/i18n';
import { getLocaleClient } from '@/lib/localeClient';
import { FancyAnchor } from '@/components/FancyButton';

export function Header() {
  const { items } = useCart();
  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const [open, setOpen] = useState(false);
  const locale: Locale = getLocaleClient();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Robotics Shop"
            className="flex items-center"
          >
            <Image
              src="/logo.jpg"
              alt="Robotics Shop"
              width={160}
              height={48}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>

        <nav className="hidden items-center gap-3 text-sm lg:flex">
          <FancyAnchor variant="ghost" href="/soluzioni" className="px-2 py-1">
            {t(locale, 'solutions')}
          </FancyAnchor>
          <span className="mx-1 hidden h-5 w-px bg-gray-200 lg:block" />
          <FancyAnchor variant="ghost" href="/shop" className="px-2 py-1">
            {t(locale, 'shop')}
          </FancyAnchor>
          <FancyAnchor variant="ghost" href="/blog" className="px-2 py-1">
            {t(locale, 'blog')}
          </FancyAnchor>
          <FancyAnchor
            variant="ghost"
            href="/carrello"
            className="px-2 py-1"
          >
            {t(locale, 'cart')}
            {count > 0 ? ` (${count})` : ''}
          </FancyAnchor>
          <FancyAnchor variant="ghost" href="/admin" className="px-2 py-1">
            {t(locale, 'admin')}
          </FancyAnchor>
        </nav>

        <button
          type="button"
          aria-label={t(locale, 'menu')}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm"
        >
          {open ? t(locale, 'close') : t(locale, 'menu')}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="grid gap-2 text-sm">
              <Link
                href="/soluzioni"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 hover:bg-white/5"
              >
                {t(locale, 'solutions')}
              </Link>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 hover:bg-white/5"
              >
                {t(locale, 'shop')}
              </Link>
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 hover:bg-white/5"
              >
                {t(locale, 'blog')}
              </Link>
              <Link
                href="/carrello"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 hover:bg-white/5"
              >
                {t(locale, 'cart')}
                {count > 0 ? ` (${count})` : ''}
              </Link>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-white/10 bg-black/25 px-3 py-2 hover:bg-white/5"
              >
                {t(locale, 'admin')}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
