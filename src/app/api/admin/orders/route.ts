import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import type { Order } from '@/lib/types';

const DATA_DIR = path.join(process.cwd(), 'data');

export async function GET() {
  const fp = path.join(DATA_DIR, 'orders.json');
  try {
    const raw = await fs.readFile(fp, 'utf8');
    const orders = JSON.parse(raw) as Order[];
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([] as Order[]);
  }
}
