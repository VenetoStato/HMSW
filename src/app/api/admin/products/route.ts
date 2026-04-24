import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import type { Product } from '@/lib/types';
import { readProductsFromStorage, writeProductsToStorage } from '@/lib/storage';
import { slugify } from '@/lib/slugify';

function parseFeatures(input: string | null): string[] {
  if (!input) return [];
  return input
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function GET() {
  const products = await readProductsFromStorage();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const form = await req.formData();

  const name = String(form.get('name') ?? '').trim();
  const brand = String(form.get('brand') ?? '').trim() || 'Unitree';
  const category = String(form.get('category') ?? '').trim();
  const solutionSlug = String(form.get('solutionSlug') ?? '').trim();
  const priceEur = Number(String(form.get('priceEur') ?? '0'));
  const currency = String(form.get('currency') ?? 'EUR');
  const shortDescription = String(form.get('shortDescription') ?? '').trim();
  const description = String(form.get('description') ?? '').trim();
  const features = parseFeatures(String(form.get('features') ?? null));

  const slug = String(form.get('slug') ?? '').trim() || slugify(name);

  if (!name || !category || !solutionSlug || !Number.isFinite(priceEur)) {
    return NextResponse.json({ ok: false, error: 'Dati non validi' }, { status: 400 });
  }

  const id = String(form.get('id') ?? '').trim() || randomUUID();

  const images: string[] = [];
  const files = form.getAll('images');
  if (files?.length) {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', id);
    await fs.mkdir(uploadsDir, { recursive: true });

    for (const file of files) {
      // Next.js gives File
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

  const product: Product = {
    id,
    slug,
    name,
    brand: brand as any,
    category,
    solutionSlug,
    priceEur,
    currency: currency as any,
    shortDescription,
    description,
    features,
    images,
    createdAt: new Date().toISOString(),
  };

  const products = await readProductsFromStorage();
  const updated = [product, ...products.filter((p) => p.id !== id)];
  await writeProductsToStorage(updated);

  return NextResponse.json({ ok: true, product });
}
