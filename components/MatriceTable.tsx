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

  // Nota: selected è un indice rispetto a rows (originale). Manteniamo logica semplice.
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
            placeholder="Cerca per caso d’uso, KPI, normativa, tempi..."
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
                  <td style={{ fontWeight: 800 }}>{r.casoUso}</td>
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
                      aria-label={`Apri focus per ${r.casoUso}`}
                    >
                      Focus
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

        <div style={{ marginTop: 10, color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
          Suggerimento: usa “Focus” per leggere safety/normativa e ridurre i blocchi di progetto.
        </div>
      </div>

      <div>
        <div className="card">
          <div className="miniTitle">Focus (Safety & Compliance)</div>

          {selectedRow ? (
            <div style={{ marginTop: 10 }}>
              <div className="focusHeader">
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                  <div>
                    <div className="badge" style={{ marginBottom: 10 }}>
                      {selectedRow.piattaforma}
                    </div>
                    <div className="focusTitle">{selectedRow.casoUso}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="focusBlockTitle">Maturità</div>
                    <div style={{ fontWeight: 900, fontSize: 16 }}>{selectedRow.maturita || '—'}</div>
                  </div>
                </div>
              </div>

              <div className="focusGrid2">
                <div className="focusGrid">
                  <div>
                    <div className="focusBlockTitle">Servizi / progettazione (1° anno)</div>
                    <div className="focusText">{selectedRow.serviziPrimoAnno || '—'}</div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div className="focusBlockTitle">KPI principali</div>
                    <div className="focusText">{selectedRow.kpi || '—'}</div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div className="focusBlockTitle">ROI atteso</div>
                    <div className="focusText">{selectedRow.roi || '—'}</div>
                  </div>
                </div>

                <div className="focusGrid">
                  <div>
                    <div className="focusBlockTitle">Safety Focus</div>
                    <div className="focusText">{selectedRow.safetyFocus || '—'}</div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div className="focusBlockTitle">Normativa (IT/EU) & criticità</div>
                    <div className="focusText">{selectedRow.normativa || '—'}</div>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div className="focusBlockTitle">Tempi</div>
                    <div className="focusText">{selectedRow.tempoProduzione || '—'} / {selectedRow.tempoNonDelivery || '—'}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a className="btn btnPrimary" href="/booking">
                  Prenota una sessione
                </a>
                <button className="btn btnGhost" onClick={() => setSelected(null)}>
                  Chiudi focus
                </button>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 10, color: 'var(--muted)', lineHeight: 1.7 }}>
              Seleziona una riga dalla tabella per vedere il Focus: safety, normativa e criticità tipiche.
            </div>
          )}
        </div>

        <div className="card" style={{ marginTop: 14 }}>
          <div className="miniTitle">Perché non è commodity</div>
          <div style={{ marginTop: 10, color: 'var(--muted)', lineHeight: 1.7 }}>
            Il valore qui non è “prezzo/brand”: è la decisione guidata da maturità, rischi e compliance.
            La sorgente dati può essere Google Sheets oggi, CMS/Framer domani.
          </div>
        </div>
      </div>
    </div>
  );
}
