import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import type { RequestHandler } from './$types';
import type { Order, Product } from '$lib/types';
import { getProducts } from '$lib/catalog';

const DATA_DIR = path.join(process.cwd(), '..', 'data');

async function readOrders(): Promise<Order[]> {
  const fp = path.join(DATA_DIR, 'orders.json');
  try {
    const raw = await fs.readFile(fp, 'utf8');
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

async function writeOrders(orders: Order[]) {
  const fp = path.join(DATA_DIR, 'orders.json');
  await fs.writeFile(fp, JSON.stringify(orders, null, 2), 'utf8');
}

export const POST: RequestHandler = async ({ request }) => {
  const body = (await request.json()) as {
    customer: { name: string; email: string; phone?: string; notes?: string };
    items: Array<{ productId: string; qty: number }>;
  };

  const products = await getProducts();
  const byId: Record<string, Product> = Object.fromEntries(products.map((p) => [p.id, p]));

  const lines = body.items
    .map((it) => {
      const p = byId[it.productId];
      if (!p) return null;
      return { product: p, qty: Math.max(1, Math.floor(it.qty || 1)) };
    })
    .filter(Boolean) as Array<{ product: Product; qty: number }>;

  if (!lines.length) return new Response('Cart empty', { status: 400 });

  const subtotalEur = lines.reduce((sum, l) => sum + l.product.priceEur * l.qty, 0);
  const totalEur = subtotalEur;

  const order: Order = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    customer: {
      name: body.customer.name,
      email: body.customer.email,
      phone: body.customer.phone,
      notes: body.customer.notes
    },
    items: lines.map((l) => ({
      productId: l.product.id,
      qty: l.qty,
      unitPriceEur: l.product.priceEur,
      name: l.product.name
    })),
    totals: { subtotalEur, totalEur }
  };

  const orders = await readOrders();
  orders.unshift(order);
  await writeOrders(orders);

  return new Response(JSON.stringify({ ok: true, id: order.id }), { status: 200 });
};
