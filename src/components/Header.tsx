'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useCart } from '@/lib/cart';

export function Header() {
  const { items } = useCart();
  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-lg font-bold">
            UNITREE Shop
          </Link>
        </div>

        <nav className="flex items-center gap-3 text-sm">
          <Link href="/soluzioni/quadrupedi" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Quadrupedi
          </Link>
          <Link href="/soluzioni/braccia" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Braccia
          </Link>
          <Link href="/soluzioni/umanoidi" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Umanoidi
          </Link>
          <Link href="/soluzioni/accessori" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Accessori
          </Link>

          <span className="mx-1 hidden h-5 w-px bg-gray-200 lg:block" />

          <Link href="/shop" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Shop
          </Link>
          <Link href="/carrello" className="relative rounded-md px-2 py-1 hover:bg-gray-100">
            Carrello{count > 0 ? ` (${count})` : ''}
          </Link>
          <Link href="/admin" className="rounded-md px-2 py-1 hover:bg-gray-100">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
