import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE = path.join(DATA_DIR, 'lead_magnet_submissions.json');

function isEmailOk(email: string) {
  const e = (email ?? '').trim();
  return e.length >= 5 && e.includes('@') && e.includes('.');
}

export async function POST(req: Request) {
  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const email: string = String(body?.email ?? '');
  if (!isEmailOk(email)) {
    return new Response('Invalid email', { status: 400 });
  }

  await fs.mkdir(DATA_DIR, { recursive: true });

  const existingRaw = await fs
    .readFile(FILE, 'utf8')
    .catch(() => '[]');

  let existing: any[] = [];
  try {
    existing = JSON.parse(existingRaw) as any[];
  } catch {
    existing = [];
  }

  const entry = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    email: email.trim(),
    source: 'home-lead-magnet',
  };

  existing.unshift(entry);
  await fs.writeFile(FILE, JSON.stringify(existing, null, 2), 'utf8');

  return new Response(JSON.stringify({ ok: true }));
}
