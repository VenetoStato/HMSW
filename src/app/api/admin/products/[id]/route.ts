import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import type { Product } from '@/lib/types';
import { readProductsFromStorage, writeProductsToStorage } from '@/lib/storage';
import { slugify } from '@/lib/slugify';
import { randomUUID } from 'node:crypto';

function parseFeatures(input: string | null): string[] {
  if (!input) return [];
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const form = await req.formData();

  const name = String(form.get('name') ?? '').trim();
  const brand = String(form.get('brand') ?? '').trim();
  const category = String(form.get('category') ?? '').trim();
  const solutionSlug = String(form.get('solutionSlug') ?? '').trim();
  const priceEur = Number(String(form.get('priceEur') ?? '0'));
  const currency = String(form.get('currency') ?? 'EUR');
  const shortDescription = String(form.get('shortDescription') ?? '').trim();
  const description = String(form.get('description') ?? '').trim();
  const features = parseFeatures(String(form.get('features') ?? null));

  if (!name || !category || !solutionSlug || !Number.isFinite(priceEur)) {
    return NextResponse.json({ ok: false, error: 'Dati non validi' }, { status: 400 });
  }

  const slug = String(form.get('slug') ?? '').trim() || slugify(name);

  const products = await readProductsFromStorage();
  const existing = products.find((p) => p.id === id);
  if (!existing) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  const images = [...(existing.images ?? [])];

  const files = form.getAll('images');
  if (files?.length) {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', id);
    await fs.mkdir(uploadsDir, { recursive: true });

    for (const file of files) {
      const f = file as unknown as File;
      if (!f || typeof f.arrayBuffer !== 'function') continue;
      const buf = Buffer.from(await f.arrayBuffer());
      const ext = (f.name.split('.').pop() || 'jpg').toLowerCase();
      const filename = `${randomUUID()}.${ext}`;
      const outPath = path.join(uploadsDir, filename);
      await fs.writeFile(outPath, buf);
      images.push(`/uploads/${id}/${filename}`);
    }
  }

  const updated: Product = {
    ...existing,
    name,
    brand: (brand || existing.brand) as any,
    category,
    solutionSlug,
    priceEur,
    currency: currency as any,
    shortDescription,
    description,
    features,
    slug,
    images,
  };

  const nextProducts = products.map((p) => (p.id === id ? updated : p));
  await writeProductsToStorage(nextProducts);

  return NextResponse.json({ ok: true, product: updated });
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const products = await readProductsFromStorage();
  const next = products.filter((p) => p.id !== id);
  await writeProductsToStorage(next);
  return NextResponse.json({ ok: true });
}
