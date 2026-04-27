import fs from 'node:fs/promises';
import path from 'node:path';
import type { Product } from './types';

const DATA_DIR = path.join(process.cwd(), '..', 'data');
const PRODUCTS_FP = path.join(DATA_DIR, 'products.json');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readProductsFromStorage(): Promise<Product[]> {
  await ensureDataDir();
  const raw = await fs.readFile(PRODUCTS_FP, 'utf8');
  return JSON.parse(raw) as Product[];
}

export async function writeProductsToStorage(products: Product[]) {
  await ensureDataDir();
  await fs.writeFile(PRODUCTS_FP, JSON.stringify(products, null, 2), 'utf8');
}
