import fs from 'node:fs/promises';
import path from 'node:path';
import type { Product } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

export async function getProducts(): Promise<Product[]> {
  const filePath = path.join(DATA_DIR, 'products.json');
  const products = await readJsonFile<Product[]>(filePath);
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getSolutions(): Promise<Array<{ slug: string; title: string; description: string }>> {
  // Minimal default mapping. In a real setup you’ll store solutions in a dedicated JSON.
  const solutionsMap: Record<string, { title: string; description: string }> = {
    'robot-per-uso-quotidiano': {
      title: 'Robot per uso quotidiano',
      description: 'Configurazioni e prodotti consigliati per demo, ricerca e utilizzi semplici.'
    }
  };

  const products = await getProducts();
  const slugs = Array.from(new Set(products.map((p) => p.solutionSlug)));

  return slugs.map((s) => ({
    slug: s,
    title: solutionsMap[s]?.title ?? s,
    description: solutionsMap[s]?.description ?? ''
  }));
}
