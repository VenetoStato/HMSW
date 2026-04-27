'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/types';
import { useCart } from '@/lib/cart';
import { formatEur } from '@/lib/price';
import { t, type Locale } from '@/lib/i18n';
import { getLocaleClient } from '@/lib/localeClient';
import { FancyAnchor, FancyButton } from '@/components/FancyButton';

export function CartPageClient({ products }: { products: Product[] }) {
  const NOTES_KEY = 'unitree_shop_cart_note_v1';
  const locale: Locale = getLocaleClient();

  const { items, setQty, removeFromCart, clearCart } = useCart();
  const productsById = useMemo(() => Object.fromEntries(products.map((p) => [p.id, p])), [products]);

  const lines = items
    .map((i) => {
      const product = productsById[i.productId];
      if (!product) return null;
      return { product, qty: i.qty };
    })
    .filter(Boolean) as Array<{ product: Product; qty: number }>;

  const hasUnknownPrice = useMemo(() => lines.some((l) => (l.product.priceEur ?? 0) <= 0), [lines]);
  const knownLines = useMemo(() => lines.filter((l) => (l.product.priceEur ?? 0) > 0), [lines]);

  const subtotalKnownEur = useMemo(() => knownLines.reduce((sum, l) => sum + l.product.priceEur * l.qty, 0), [knownLines]);
  const totalKnownEur = subtotalKnownEur;

  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });

  // Prefill note from solution page
  useEffect(() => {
    try {
      const v = localStorage.getItem(NOTES_KEY);
      if (typeof v === 'string' && v.trim()) {
        setForm((p) => ({ ...p, notes: v }));
      }
    } catch {
      // ignore
    }
  }, []);

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Paliativo PayPal: link “invia soldi” (no verifica webhook).
  const PAYPAL_BUSINESS = 'Giovanni.pitton2@gmail.com';

  const [paypalCustom] = useState(() => {
    try {
      const c = crypto as unknown as { randomUUID?: () => string };
      if (c?.randomUUID) return c.randomUUID();
    } catch {
      // ignore
    }
    return String(Date.now());
  });

  const paypalAmountEur = subtotalKnownEur;
  const paypalEnabled = paypalAmountEur > 0;
  const paypalAmountStr = paypalAmountEur.toFixed(2);

  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(
    PAYPAL_BUSINESS
  )}&amount=${encodeURIComponent(paypalAmountStr)}&currency_code=EUR&item_name=${encodeURIComponent(
    'Robotics Shop request'
  )}&custom=${encodeURIComponent(paypalCustom)}`;

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
      alert(t(locale, 'orderSendError'));
      return;
    }

    // Clear local note on success
    try {
      localStorage.removeItem(NOTES_KEY);
    } catch {
      // ignore
    }

    clearCart();
    setStatus('sent');
  }

  if (!lines.length) {
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-6">
        <h2 className="text-lg font-semibold">{t(locale, 'cartEmptyTitle')}</h2>
        <p className="mt-2 text-sm text-gray-600">{t(locale, 'cartEmptyBody')}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-4">
        {lines.map(({ product, qty }) => (
          <div
            key={product.id}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-4"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm text-gray-500">
                  {product.brand} • {product.category}
                </div>
                <div className="mt-1 font-semibold">{product.name}</div>
                <div className="mt-2 text-sm font-bold">
                  {product.priceEur > 0 ? `${formatEur(product.priceEur)} ${t(locale, 'perUnit')}` : t(locale, 'priceOnRequest')}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div>
                  <label className="block text-xs text-gray-600">Quantità</label>
                  <input
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => setQty(product.id, Number(e.target.value))}
                    className="mt-1 w-24 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-100 outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                  />
                </div>

                <div className="text-sm font-bold">
                  {product.priceEur > 0 ? formatEur(product.priceEur * qty) : t(locale, 'priceOnRequest')}
                </div>

                <FancyButton
                  variant="secondary"
                  className="px-3 py-2 text-sm"
                  onClick={() => removeFromCart(product.id)}
                >
                  {t(locale, 'remove')}
                </FancyButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-5">
          <h2 className="text-lg font-semibold">{t(locale, 'total')}</h2>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span>{t(locale, 'subtotalConfirmed')}</span>
            <span className="font-semibold">{formatEur(subtotalKnownEur)}</span>
          </div>

          <div className="mt-1 flex items-center justify-between text-sm">
            <span>{t(locale, 'total')}</span>
            {hasUnknownPrice ? (
              <span className="text-base font-bold">{t(locale, 'priceOnRequest')}</span>
            ) : (
              <span className="text-base font-bold">{formatEur(totalKnownEur)}</span>
            )}
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4">
              <h3 className="text-sm font-semibold">{t(locale, 'payPal')}</h3>
              <div className="mt-1 text-xs text-gray-600">
                {hasUnknownPrice ? t(locale, 'payPalDescriptionDeposit') : t(locale, 'payPalDescriptionConfirmed')}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-gray-600">{t(locale, 'payPalAmount')}</div>
                <div className="text-sm font-bold">{paypalEnabled ? formatEur(paypalAmountEur) : '—'}</div>
              </div>

              <FancyAnchor
                variant="primary"
                disabled={!paypalEnabled}
                href={paypalUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 w-full justify-center"
              >
                {t(locale, 'payPal')}
              </FancyAnchor>

              <div className="mt-2 text-[11px] text-gray-500">{t(locale, 'noOnlinePayment')}</div>
            </div>

            <form onSubmit={submitOrder} className="space-y-3">
              <input
                required
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder={t(locale, 'name')}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder={t(locale, 'email')}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
              <input
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder={t(locale, 'phone')}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />

              <textarea
                value={form.notes}
                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                placeholder={t(locale, 'notes')}
                className="min-h-24 w-full rounded-lg border px-3 py-2 text-sm"
              />

              <FancyButton
                variant="primary"
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full justify-center px-4 py-3 text-sm"
              >
                {status === 'sent'
                  ? t(locale, 'sent')
                  : status === 'sending'
                    ? t(locale, 'sending')
                    : t(locale, 'sendRequest')}
              </FancyButton>
            </form>

            <div className="mt-3">
              <FancyAnchor
                href="/richiesta-preventivo"
                variant="ghost"
                className="w-full justify-center text-sm"
              >
                Richiedi preventivo con moduli + allegati
              </FancyAnchor>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
