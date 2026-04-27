import fs from 'node:fs/promises';
import path from 'node:path';
import { createWriteStream } from 'node:fs';
import { randomUUID } from 'node:crypto';
import Busboy from 'busboy';
import { Readable } from 'node:stream';
import type { RequestHandler } from './$types';
import type { Product } from '$lib/types';
import { getProducts } from '$lib/catalog';

const DATA_DIR = path.join(process.cwd(), '..', 'data');
const QUOTE_DIR = path.join(process.cwd(), 'static', 'quote-attachments');

function sanitizeFilename(name: string) {
  return (name ?? 'file')
    .toString()
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .slice(0, 140);
}

function toNodeReadable(webStream: ReadableStream<Uint8Array>) {
  const fromWeb = (Readable as any).fromWeb;
  if (typeof fromWeb === 'function') return fromWeb.call(Readable, webStream);
  return Readable.from(webStream as any);
}

async function readJsonSafe<T>(s: string): Promise<T | null> {
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export const POST: RequestHandler = async ({ request }) => {
  const quoteId = randomUUID();
  const storeDir = path.join(QUOTE_DIR, quoteId);

  await fs.mkdir(storeDir, { recursive: true });
  await fs.mkdir(DATA_DIR, { recursive: true });

  const fields: Record<string, string> = {};
  const attachments: Array<{ fileName: string; mimeType: string; size: number; publicUrl: string }> = [];

  const busboy = new Busboy({
    headers: Object.fromEntries(Array.from(request.headers.entries()).map(([k, v]) => [k, v])),
    limits: {
      files: 12,
      fileSize: 10 * 1024 * 1024
    }
  });

  const uploadPromise = new Promise<void>((resolve, reject) => {
    busboy.on('field', (name, val) => {
      fields[name] = Array.isArray(val) ? (val as any).join('') : String(val);
    });

    busboy.on('file', (name, file, info) => {
      const { filename, mimeType } = info;
      const safeName = sanitizeFilename(filename || 'file');
      const targetPath = path.join(storeDir, safeName);
      const out = createWriteStream(targetPath);

      let size = 0;
      file.on('data', (d: Buffer) => {
        size += d.length;
      });

      file.pipe(out);

      out.on('finish', () => {
        const publicUrl = `/quote-attachments/${quoteId}/${encodeURIComponent(safeName)}`;
        attachments.push({ fileName: safeName, mimeType, size, publicUrl });
      });

      out.on('error', reject);
    });

    busboy.on('error', reject);
    busboy.on('finish', () => resolve());

    const body = (request as any).body as ReadableStream<Uint8Array> | null;
    if (!body) return reject(new Error('Missing request body'));

    const nodeReadable = toNodeReadable(body);
    nodeReadable.pipe(busboy as any);
  });

  try {
    await uploadPromise;
  } catch {
    try {
      await fs.rm(storeDir, { recursive: true, force: true });
    } catch {}
    return new Response('Upload error', { status: 400 });
  }

  const itemsJson = fields.items ?? '[]';
  const items = await readJsonSafe<Array<{ productId: string; qty: number }>>(itemsJson);
  if (!items || !items.length) return new Response('Cart empty', { status: 400 });

  const products = await getProducts();
  const byId: Record<string, Product> = Object.fromEntries(products.map((p) => [p.id, p]));

  const lines = items
    .map((it) => {
      const p = byId[it.productId];
      if (!p) return null;
      return {
        productId: p.id,
        qty: Math.max(1, Math.floor(it.qty || 1)),
        unitPriceEur: p.priceEur,
        name: p.name
      };
    })
    .filter(Boolean) as Array<{ productId: string; qty: number; unitPriceEur: number; name: string }>;

  if (!lines.length) return new Response('Cart empty', { status: 400 });

  const subtotalEur = lines.reduce((sum, l) => sum + (l.unitPriceEur ?? 0) * l.qty, 0);

  const quoteRequest = {
    id: quoteId,
    createdAt: new Date().toISOString(),
    customer: {
      companyName: fields.companyName ?? '',
      vat: fields.vat ?? '',
      name: fields.contactName ?? '',
      email: fields.email ?? '',
      phone: fields.phone ?? '',
      objective: fields.objective ?? '',
      details: fields.details ?? ''
    },
    items: lines.map((l) => ({ productId: l.productId, qty: l.qty })),
    totals: { subtotalEur },
    attachments,
    status: 'received'
  };

  const fp = path.join(DATA_DIR, 'quote_requests.json');
  const existingRaw = await fs.readFile(fp, 'utf8').catch(() => '[]');

  let existing: any[] = [];
  try {
    existing = JSON.parse(existingRaw) as any[];
  } catch {
    existing = [];
  }

  existing.unshift(quoteRequest);
  await fs.writeFile(fp, JSON.stringify(existing, null, 2), 'utf8');

  return new Response(JSON.stringify({ ok: true, id: quoteId, attachments: attachments.length }), { status: 200 });
};
