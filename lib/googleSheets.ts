import Papa from 'papaparse';
import { MatriceRow } from './types';

const SHEET_HEADERS = {
  piattaforma: 'Piattaforma',
  casoUso: 'Caso d’uso',
  maturita: 'Maturità / Fattibilità (1-5) 1 Alta - 5 Bassa',
  complessita: 'Complessità progetto',
  margine: 'Margine indicativo',
  serviziPrimoAnno: 'Servizi/Progettazione sul primo anno',
  kpi: 'KPI principali',
  roi: 'ROI atteso',
  tempoProduzione: 'Tempo a produzione',
  tempoNonDelivery: 'Tempo con team “non ancora delivery-proven”',
  safetyFocus: 'Safety Focus',
  normativa: 'Normativa IT / EU, problemi tipici',
} as const;

function normalize(s?: string | null) {
  return (s ?? '').toString().trim();
}

export async function fetchMatrice({
  sheetId,
  gid,
}: {
  sheetId: string;
  gid: number;
}): Promise<MatriceRow[]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;

  const res = await fetch(url, {
    // Build-time / server-side fetch caching.
    // If you want near-real-time updates, reduce revalidate.
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Google Sheets CSV fetch failed: ${res.status} ${res.statusText}`);
  }

  const csv = await res.text();

  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors?.length) {
    // Keep going; still try to map what we have.
    // eslint-disable-next-line no-console
    console.warn('CSV parse warnings:', parsed.errors);
  }

  return (parsed.data ?? []).map((r) => ({
    piattaforma: normalize(r[SHEET_HEADERS.piattaforma]),
    casoUso: normalize(r[SHEET_HEADERS.casoUso]),
    maturita: normalize(r[SHEET_HEADERS.maturita]),
    complessita: normalize(r[SHEET_HEADERS.complessita]),
    margine: normalize(r[SHEET_HEADERS.margine]),
    serviziPrimoAnno: normalize(r[SHEET_HEADERS.serviziPrimoAnno]),
    kpi: normalize(r[SHEET_HEADERS.kpi]),
    roi: normalize(r[SHEET_HEADERS.roi]),
    tempoProduzione: normalize(r[SHEET_HEADERS.tempoProduzione]),
    tempoNonDelivery: normalize(r[SHEET_HEADERS.tempoNonDelivery]),
    safetyFocus: normalize(r[SHEET_HEADERS.safetyFocus]),
    normativa: normalize(r[SHEET_HEADERS.normativa]),
  }));
}
