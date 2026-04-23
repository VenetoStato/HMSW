import MatriceTable from '@/components/MatriceTable';
import { fetchMatrice } from '@/lib/googleSheets';

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? '1SvWQ1RGpkzKkqc4HGSsNP7YEy43S9cyl-uUmsS3SygY';
const GID = Number(process.env.GOOGLE_SHEET_GID ?? '0');

function isUnitreeRow(row: {
  piattaforma: string;
  safetyFocus: string;
}) {
  const p = (row.piattaforma ?? '').toLowerCase();
  const sf = (row.safetyFocus ?? '').toLowerCase();

  // Rimuoviamo i cobot dal dataset: qui vogliamo parlare di robot Unitree.
  if (p.includes('cobot')) return false;

  // Manteniamo righe dove la piattaforma è Unitree o i quadrupedi (che nel dataset includono riferimenti Unitree).
  return p.includes('unitree') || p.includes('quadrupede') || sf.includes('unitree');
}

export default async function HomePage() {
  const rows = await fetchMatrice({ sheetId: SHEET_ID, gid: GID });
  const robotRows = rows.filter(isUnitreeRow);

  return (
    <div>
      <header className="header">
        <div className="nav container">
          <div className="brand" aria-label="HMSW — Robot Unitree">
            <span className="logoDot" aria-hidden="true" />
            <span>HMSW — Robot Unitree</span>
          </div>

          <nav className="navLinks" aria-label="Navigazione">
            <a className="navLink" href="#robot">
              Robot
            </a>
            <a className="navLink" href="#approccio">
              Approccio
            </a>
          </nav>

          <div className="actions">
            <a className="btn btnGhost btnSmall" href="/about">
              Perché noi
            </a>
            <a className="btn btnPrimary btnSmall" href="/booking">
              Prenota online
            </a>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="heroGrid">
            <div>
              <div className="kicker">HMSW — robot Unitree, dalla sicurezza alla proposta</div>
              <h1 className="h1" id="hero-title">
                Robot Unitree per <span style={{ color: 'rgba(103,232,249,0.95)' }}>inspection</span>,{' '}
                <span style={{ color: 'rgba(103,232,249,0.95)' }}>security/patrol</span> e missioni industriali
              </h1>
              <p className="sub">
                Presentiamo la soluzione più adatta al tuo caso d’uso (quadrupedi e umanoidi), con un
                assessment chiaro su sicurezza, rischi di integrazione e conformità.
              </p>

              <div className="pillRow" style={{ marginTop: 16 }}>
                <a className="btn btnPrimary" href="#robot">
                  Scopri i robot
                </a>
                <a className="btn btnGhost" href="/booking">
                  Prenota una sessione
                </a>
              </div>

              <div className="card" style={{ marginTop: 16 }}>
                <div className="miniTitle">Cosa trovi nel sito</div>
                <div style={{ marginTop: 10, color: 'var(--muted)', lineHeight: 1.7 }}>
                  Una selezione di piattaforme robotiche: per ogni caso d’uso vedi i punti chiave per{' '}
                  <b>sicurezza</b>, <b>integrazione</b> e <b>tempi</b>.
                </div>
              </div>
            </div>

            <div className="card cardHover">
              <div className="miniTitle">Perché funziona</div>
              <div style={{ marginTop: 10, display: 'grid', gap: 12 }}>
                <div className="focusGrid2">
                  <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontWeight: 1000, fontSize: 22, color: 'rgba(103,232,249,0.95)' }}>↓</div>
                    <div style={{ color: 'var(--muted)', marginTop: 6, fontWeight: 900 }}>Meno rischi</div>
                    <div style={{ color: 'var(--muted)', marginTop: 6, lineHeight: 1.6, fontSize: 14 }}>
                      Sicurezza e conformità entrano subito nella decisione.
                    </div>
                  </div>
                  <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontWeight: 1000, fontSize: 22, color: 'rgba(99,102,241,0.95)' }}>⚡</div>
                    <div style={{ color: 'var(--muted)', marginTop: 6, fontWeight: 900 }}>Percorso rapido</div>
                    <div style={{ color: 'var(--muted)', marginTop: 6, lineHeight: 1.6, fontSize: 14 }}>
                      Dal caso d’uso alla proposta, senza “catalogo commodity”.
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: 14,
                    borderRadius: 14,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.01)',
                  }}
                >
                  <div className="focusBlockTitle">Dati</div>
                  <div style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: 14 }}>
                    Fonte: Google Sheets (CSV). Il dataset puoi sostituirlo senza cambiare la UI.
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span className="badge">Righe: {robotRows.length}</span>
                    <span className="badge">Robot: Unitree</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="approccio" className="section">
          <div className="miniTitle">Approccio</div>
          <h2 className="sectionTitle" style={{ marginTop: 8, fontSize: 22 }}>
            Decisione guidata dalla sicurezza, poi proposta
          </h2>

          <div className="split">
            <div className="card cardHover">
              <div className="miniTitle">1 — Casi d’uso</div>
              <div style={{ fontWeight: 1000, marginTop: 10, fontSize: 18 }}>Partiamo dalla tua esigenza</div>
              <div style={{ color: 'var(--muted)', marginTop: 8, lineHeight: 1.7 }}>
                Usiamo i tuoi vincoli e obiettivi per scegliere la piattaforma più coerente.
              </div>
            </div>

            <div className="card cardHover">
              <div className="miniTitle">2 — Qualification</div>
              <div style={{ fontWeight: 1000, marginTop: 10, fontSize: 18 }}>Valutiamo integrazione e tempi</div>
              <div style={{ color: 'var(--muted)', marginTop: 8, lineHeight: 1.7 }}>
                Per ridurre sorprese: cosa serve per andare live e quanto ci mette il progetto.
              </div>
            </div>

            <div className="card cardHover">
              <div className="miniTitle">3 — Safety & compliance</div>
              <div style={{ fontWeight: 1000, marginTop: 10, fontSize: 18 }}>Conformità e rischi</div>
              <div style={{ color: 'var(--muted)', marginTop: 8, lineHeight: 1.7 }}>
                Safety, normative e criticità tipiche vengono trattate prima di impegnare budget.
              </div>
            </div>
          </div>
        </section>

        <section id="robot" className="section">
          <div className="miniTitle">Robot Unitree</div>
          <h2 className="sectionTitle" style={{ marginTop: 8, fontSize: 22 }}>
            Seleziona un caso d’uso e apri la scheda
          </h2>
          <MatriceTable rows={robotRows} />
        </section>

        <footer className="footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <b>HMSW</b> — base UI
              <div className="muted" style={{ marginTop: 6, lineHeight: 1.7 }}>
                Data-driven via Google Sheets (CSV). Nessun branding/claim esterno.
              </div>
            </div>
            <div style={{ color: 'var(--muted)' }}>Prossimo step: aggiungere catalogo/asset e sourcing.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
