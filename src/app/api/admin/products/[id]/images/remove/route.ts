import { NextResponse } from 'next/server';
import type { Product } from '@/lib/types';
import { readProductsFromStorage, writeProductsToStorage } from '@/lib/storage';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const body = await req.json().catch(() => ({}));

  const toRemove: string[] = Array.isArray(body?.images) ? body.images.map(String) : [];

  const products = await readProductsFromStorage();
  const existing = products.find((p) => p.id === id);
  if (!existing) {
    return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  }

  const images = [...(existing.images ?? [])];
  const nextImages = images.filter((img) => !toRemove.includes(img));

  const updated: Product = {
    ...existing,
    images: nextImages,
  };

  const nextProducts = products.map((p) => (p.id === id ? updated : p));
  await writeProductsToStorage(nextProducts);

  return NextResponse.json({ ok: true, product: updated });
}
