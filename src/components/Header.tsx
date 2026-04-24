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

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/soluzioni/robot-per-uso-quotidiano" className="hover:underline">
            Soluzioni
          </Link>
          <Link href="/shop" className="hover:underline">
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
