import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';
import type { CartItem, Product } from './types';

const CART_KEY = 'unitree_shop_cart_v1';

type CartState = { items: CartItem[] };

function loadCart(): CartState {
  if (!browser) return { items: [] };
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

function saveCart(state: CartState) {
  if (!browser) return;
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

const cartState = writable<CartState>(loadCart());

// Persist on changes
cartState.subscribe((state) => saveCart(state));

export const cartItems = derived(cartState, ($s) => $s.items);

export const cartCount = derived(cartState, ($s) =>
  $s.items.reduce((sum, it) => sum + it.qty, 0)
);

export function addToCart(product: Product, qty = 1) {
  cartState.update((prev) => {
    const items = prev.items.slice();
    const idx = items.findIndex((x) => x.productId === product.id);
    const q = Math.max(1, Math.floor(qty));
    if (idx === -1) items.push({ productId: product.id, qty: q });
    else items[idx] = { ...items[idx], qty: items[idx].qty + q };
    return { items };
  });
}

export function removeFromCart(productId: string) {
  cartState.update((prev) => ({ items: prev.items.filter((x) => x.productId !== productId) }));
}

export function setQty(productId: string, qty: number) {
  cartState.update((prev) => {
    const q = Math.max(1, Math.floor(qty));
    return { items: prev.items.map((x) => (x.productId === productId ? { ...x, qty: q } : x)) };
  });
}

export function clearCart() {
  cartState.set({ items: [] });
}
