'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { formatEur } from '@/lib/price';

export function CartPageClient({ products }: { products: Product[] }) {
  const { items, setQty, removeFromCart, clearCart } = useCart();
  const productsById = useMemo(() => Object.fromEntries(products.map((p) => [p.id, p])), [products]);

  const lines = items
    .map((i) => {
      const product = productsById[i.productId];
      if (!product) return null;
      return { product, qty: i.qty };
    })
    .filter(Boolean) as Array<{ product: Product; qty: number }>;

  const subtotalEur = useMemo(() => lines.reduce((sum, l) => sum + l.product.priceEur * l.qty, 0), [lines]);
  const totalEur = subtotalEur;

  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!lines.length) return;

    setStatus('sending');
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: form,
        items: lines.map((l) => ({ productId: l.product.id, qty: l.qty })),
      }),
    });

    if (!res.ok) {
      setStatus('idle');
      alert('Errore invio ordine. Riprova.');
      return;
    }

    clearCart();
    setStatus('sent');
  }

  if (!lines.length) {
    return (
      <div className="mt-6 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Carrello vuoto</h2>
        <p className="mt-2 text-sm text-gray-600">Aggiungi prodotti per vedere il totale.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {lines.map(({ product, qty }) => (
          <div key={product.id} className="rounded-2xl border bg-white p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm text-gray-500">{product.brand} • {product.category}</div>
                <div className="mt-1 font-semibold">{product.name}</div>
                <div className="mt-2 text-sm font-bold">{formatEur(product.priceEur)} cadauno</div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="block text-xs text-gray-600">Quantità</label>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(product.id, Number(e.target.value))}
                    className="mt-1 w-24 rounded-lg border px-2 py-1 text-sm"
                  />
                </div>
                <div className="text-sm font-bold">
                  {formatEur(product.priceEur * qty)}
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                >
                  Rimuovi
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Totale</h2>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>Subtotale</span>
            <span className="font-semibold">{formatEur(subtotalEur)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm">
            <span>Totale</span>
            <span className="text-base font-bold">{formatEur(totalEur)}</span>
          </div>

          <form onSubmit={submitOrder} className="mt-5 space-y-3">
            <input
              required
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Nome e cognome"
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="Email"
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
            <input
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="Telefono (opzionale)"
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
            <textarea
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              placeholder="Note / richieste"
              className="min-h-24 w-full rounded-lg border px-3 py-2 text-sm"
            />

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:opacity-60"
            >
              {status === 'sent' ? 'Richiesta inviata ✅' : status === 'sending' ? 'Invio...' : 'Invia richiesta'}
            </button>

            <p className="text-xs text-gray-500">
              Nessun pagamento online: inviamo la richiesta per confermare disponibilità e spedizione.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
