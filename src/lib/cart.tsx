'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Product } from './types';

type CartState = {
  items: CartItem[];
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clearCart: () => void;
};

const CART_KEY = 'unitree_shop_cart_v1';

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartState {
  if (typeof window === 'undefined') return { items: [] };
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw) as CartState;
    if (!parsed?.items) return { items: [] };
    return { items: parsed.items };
  } catch {
    return { items: [] };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(loadCart().items);
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify({ items }));
  }, [items]);

  const value: CartContextValue = useMemo(
    () => ({
      items,
      addToCart: (product, qty = 1) => {
        setItems((prev) => {
          const existing = prev.find((x) => x.productId === product.id);
          if (!existing) return [...prev, { productId: product.id, qty }];
          return prev.map((x) => (x.productId === product.id ? { ...x, qty: x.qty + qty } : x));
        });
      },
      removeFromCart: (productId) => {
        setItems((prev) => prev.filter((x) => x.productId !== productId));
      },
      setQty: (productId, qty) => {
        setItems((prev) => {
          const q = Math.max(1, Math.floor(qty));
          return prev.map((x) => (x.productId === productId ? { ...x, qty: q } : x));
        });
      },
      clearCart: () => setItems([]),
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
