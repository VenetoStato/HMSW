export function parseWixDimensions(url: string): { w?: number; h?: number } {
  const wMatch = url.match(/\bw_(\d+)\b/);
  const hMatch = url.match(/\bh_(\d+)\b/);
  const w = wMatch ? Number(wMatch[1]) : undefined;
  const h = hMatch ? Number(hMatch[1]) : undefined;
  return { w, h };
}

export function isProbablyGoodImageUrl(url: string, opts?: { minW?: number; minH?: number }): boolean {
  if (!url || typeof url !== 'string') return false;
  if (!url.startsWith('http')) return false;

  // Hard exclusions for Wix tiny/placeholder variants
  if (url.includes('w_1') || url.includes('h_1')) return false;
  if (url.includes('w_49') || url.includes('h_19')) return false;
  if (url.includes('w_0') || url.includes('h_0')) return false;

  const { w, h } = parseWixDimensions(url);
  const minW = opts?.minW ?? 120;
  const minH = opts?.minH ?? 60;

  if (typeof w === 'number' && w < minW) return false;
  if (typeof h === 'number' && h < minH) return false;

  return true;
}

export function pickUniqueImages(
  urls: string[],
  opts?: { limit?: number; minW?: number; minH?: number }
): string[] {
  const limit = opts?.limit ?? 12;
  const seen = new Set<string>();
  const out: string[] = [];

  for (const u of urls) {
    if (!u) continue;
    if (seen.has(u)) continue;

    const ok = isProbablyGoodImageUrl(u, { minW: opts?.minW ?? 120, minH: opts?.minH ?? 60 });
    if (!ok) continue;

    seen.add(u);
    out.push(u);
    if (out.length >= limit) break;
  }

  return out;
}
