'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useCart } from '@/lib/cart';

export function Header() {
  const { items } = useCart();
  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-bold">
            Robotics Shop
          </Link>
        </div>

        <nav className="hidden items-center gap-3 text-sm lg:flex">
          <Link href="/soluzioni" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Soluzioni
          </Link>
          <span className="mx-1 hidden h-5 w-px bg-gray-200 lg:block" />
          <Link href="/shop" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Shop
          </Link>
          <Link href="/blog" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Blog
          </Link>
          <Link href="/carrello" className="relative rounded-md px-2 py-1 hover:bg-gray-100">
            Carrello{count > 0 ? ` (${count})` : ''}
          </Link>
          <Link href="/admin" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Admin
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Apri menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden inline-flex items-center justify-center rounded-lg border bg-white px-3 py-2 text-sm"
        >
          {open ? 'Chiudi' : 'Menu'}
        </button>
      </div>

      {open ? (
        <div className="lg:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3">
            <div className="grid gap-2 text-sm">
              <Link
                href="/soluzioni"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              >
                Soluzioni
              </Link>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              >
                Shop
              </Link>
              <Link
                href="/blog"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              >
                Blog
              </Link>
              <Link
                href="/carrello"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              >
                Carrello{count > 0 ? ` (${count})` : ''}
              </Link>
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-lg border px-3 py-2 hover:bg-gray-50"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
