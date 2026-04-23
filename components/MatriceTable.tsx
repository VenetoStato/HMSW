"use client";

import React, { useMemo, useState } from 'react';
import { MatriceRow } from '@/lib/types';

function normalizeText(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

export default function MatriceTable({ rows }: { rows: MatriceRow[] }) {
  const [platform, setPlatform] = useState<string>('Tutte');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<number | null>(null);

  const platforms = useMemo(() => {
    const set = new Set(rows.map((r) => r.piattaforma).filter(Boolean));
    return ['Tutte', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'it'))];
  }, [rows]);

  const filtered = useMemo(() => {
    const q = normalizeText(query);
    return rows
      .map((r, idx) => ({ r, idx }))
      .filter(({ r }) => (platform === 'Tutte' ? true : r.piattaforma === platform))
      .filter(({ r }) => {
        if (!q) return true;
        const hay = normalizeText(
          [
            r.piattaforma,
            r.casoUso,
            r.maturita,
            r.complessita,
            r.margine,
            r.serviziPrimoAnno,
            r.kpi,
            r.roi,
            r.tempoProduzione,
            r.tempoNonDelivery,
            r.safetyFocus,
            r.normativa,
          ].join(' '),
        );
        return hay.includes(q);
      });
  }, [rows, platform, query]);

  const selectedRow = selected === null ? null : rows[selected];

  return (
    <div className="grid2">
      <div>
        <div className="searchRow">
          <select
            className="input"
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value);
              setSelected(null);
            }}
          >
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <input
            className="input"
            value={query}
            placeholder="Cerca per caso d’uso, KPI, normativa, tempo..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Piattaforma</th>
                <th>Caso d’uso</th>
                <th>Maturità</th>
                <th>Complessità</th>
                <th>ROI</th>
                <th>Tempi</th>
                <th style={{ width: 120 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(({ r, idx }) => (
                <tr key={`${r.casoUso}-${idx}`}>
                  <td>
                    <span className="badge">{r.piattaforma}</span>
                  </td>
                  <td>{r.casoUso}</td>
                  <td className="muted">{r.maturita || '—'}</td>
                  <td className="muted">{r.complessita || '—'}</td>
                  <td className="muted">{r.roi || '—'}</td>
                  <td className="muted">
                    {r.tempoProduzione || '—'} <br />
                    <span style={{ color: 'var(--muted)' }}>{r.tempoNonDelivery || ''}</span>
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => setSelected(idx)}
                      aria-label={`Apri dettagli per ${r.casoUso}`}
                    >
                      Dettagli
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="muted" style={{ padding: 18 }}>
                    Nessun risultato. Prova a cambiare filtro o query.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="card">
          <h3 className="sectionTitle">Focus</h3>
          {selectedRow ? (
            <div style={{ display: 'grid', gap: 12 }}>
              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 4 }}>
                  {selectedRow.piattaforma}
                </div>
                <div style={{ fontWeight: 800, fontSize: 18, lineHeight: 1.25 }}>
                  {selectedRow.casoUso}
                </div>
              </div>

              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                  Maturità / Fattibilità
                </div>
                <div>{selectedRow.maturita || '—'}</div>
              </div>

              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                  Complessità
                </div>
                <div>{selectedRow.complessita || '—'}</div>
              </div>

              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>
                  Servizi/Progettazione (1° anno)
                </div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{selectedRow.serviziPrimoAnno || '—'}</div>
              </div>

              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>KPI principali</div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{selectedRow.kpi || '—'}</div>
              </div>

              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>Safety Focus</div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{selectedRow.safetyFocus || '—'}</div>
              </div>

              <div>
                <div className="muted" style={{ fontSize: 12, marginBottom: 6 }}>Normativa (IT/EU)</div>
                <div style={{ whiteSpace: 'pre-wrap' }}>{selectedRow.normativa || '—'}</div>
              </div>

              <button className="btn" onClick={() => setSelected(null)}>
                Chiudi focus
              </button>
            </div>
          ) : (
            <div className="muted" style={{ lineHeight: 1.6 }}>
              Seleziona una riga dalla tabella per vedere il dettaglio del caso d’uso.
            </div>
          )}
        </div>

        <div className="card" style={{ marginTop: 14 }}>
          <h3 className="sectionTitle">Note</h3>
          <div className="muted" style={{ lineHeight: 1.6 }}>
            Questa è una base iniziale (dati da Google Sheets via CSV). Se vuoi spostarla su un CMS/Framer,
            possiamo mantenere la stessa struttura di UI e sostituire solo la sorgente dati.
          </div>
        </div>
      </div>
    </div>
  );
}
