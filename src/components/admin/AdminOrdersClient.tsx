'use client';

import { useEffect, useState } from 'react';
import type { Order } from '@/lib/types';

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/orders');
      const data = (await res.json()) as Order[];
      setOrders(data);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="py-8">
      <h1 className="text-2xl font-bold">Ordini (richieste)</h1>
      {loading ? <p className="mt-3 text-sm text-gray-600">Carico...</p> : null}

      <div className="mt-5 space-y-3">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border bg-white p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="text-sm font-semibold">{o.customer.name}</div>
                <div className="text-sm text-gray-600">{o.customer.email}</div>
                <div className="mt-2 text-xs text-gray-500">{new Date(o.createdAt).toLocaleString('it-IT')}</div>
              </div>
              <div className="text-sm font-bold">Totale: € {o.totals.totalEur.toFixed(2)}</div>
            </div>

            <div className="mt-3 text-sm">
              {o.items.map((it) => (
                <div key={it.productId} className="flex items-center justify-between border-t py-2">
                  <span>
                    {it.name} × {it.qty}
                  </span>
                  <span>€ {(it.unitPriceEur * it.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {o.customer.notes ? <p className="mt-3 text-sm text-gray-700">Note: {o.customer.notes}</p> : null}
          </div>
        ))}
      </div>

      {!orders.length && !loading ? (
        <p className="mt-5 text-sm text-gray-600">Nessuna richiesta ancora.</p>
      ) : null}
    </main>
  );
}
