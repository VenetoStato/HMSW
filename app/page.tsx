import MatriceTable from '@/components/MatriceTable';
import { fetchMatrice } from '@/lib/googleSheets';

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? '1SvWQ1RGpkzKkqc4HGSsNP7YEy43S9cyl-uUmsS3SygY';
const GID = Number(process.env.GOOGLE_SHEET_GID ?? '0');

export default async function HomePage() {
  const rows = await fetchMatrice({ sheetId: SHEET_ID, gid: GID });

  return (
    <div>
      <header className="header">
        <div className="nav container">
          <div className="brand" aria-label="Meko — Matrice Soluzioni">
            <span className="logoDot" aria-hidden="true" />
            <span>Meko — Matrice Soluzioni</span>
          </div>

          <nav className="navLinks" aria-label="Navigazione">
            <a className="navLink" href="#matrice">
              Matrice
            </a>
            <a className="navLink" href="#come-funziona">
              Come funziona
            </a>
            <a className="navLink" href="#focus">
              Focus
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
              <div className="kicker">HMSW — guida alla soluzione</div>
              <h1 className="h1" id="hero-title">
                Dal caso d’uso al <span style={{ color: 'rgba(103,232,249,0.95)' }}>Safety Focus</span>
              </h1>
              <p className="sub">
                Non scegliamo “il prodotto”: guidiamo la decisione in base a maturità, complessità, KPI attesi e
                criticità di sicurezza/normativa. Questo riduce i rischi di progetto e accelera la conversione.
              </p>

              <div className="pillRow" style={{ marginTop: 16 }}>
                <a className="btn btnPrimary" href="#matrice">
                  Esplora la matrice
                </a>
                <a className="btn btnGhost" href="/booking">
                  Prenota una sessione
                </a>
                <a className="btn btnGhost" href="#focus">
                  Capisci il Focus
                </a>
              </div>

              <div className="card" style={{ marginTop: 16 }}>
                <div className="miniTitle">Output della selezione</div>
                <div style={{ marginTop: 10, color: 'var(--muted)', lineHeight: 1.7 }}>
                  Per ogni riga della matrice ottieni: <b>maturità/fattibilità</b>, <b>complessità</b>, <b>tempi</b>,
                  e soprattutto un riepilogo “perché questa soluzione funziona” sul piano <b>safety</b> &amp; compliance.
                </div>
              </div>
            </div>

            <div className="card cardHover">
              <div className="miniTitle">Perché questa UI converte</div>
              <div style={{ marginTop: 10, display: 'grid', gap: 12 }}>
                <div className="focusGrid2">
                  <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontWeight: 1000, fontSize: 22, color: 'rgba(103,232,249,0.95)' }}>↓</div>
                    <div style={{ color: 'var(--muted)', marginTop: 6, fontWeight: 900 }}>Meno rischi</div>
                    <div style={{ color: 'var(--muted)', marginTop: 6, lineHeight: 1.6, fontSize: 14 }}>
                      Safety Focus + normativa guidano le decisioni.
                    </div>
                  </div>
                  <div className="card" style={{ padding: 14, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontWeight: 1000, fontSize: 22, color: 'rgba(99,102,241,0.95)' }}>⚡</div>
                    <div style={{ color: 'var(--muted)', marginTop: 6, fontWeight: 900 }}>Percorso rapido</div>
                    <div style={{ color: 'var(--muted)', marginTop: 6, lineHeight: 1.6, fontSize: 14 }}>
                      Dal filtro all’assessment, senza “catalogo commodity”.
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
                    Fonte: Google Sheets (CSV). Puoi sostituire con CMS/Headless mantenendo stessa logica.
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <span className="badge">Righe: {rows.length}</span>
                    <span className="badge">Focus: Safety + Normativa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="come-funziona" className="section">
          <div className="miniTitle">Come funziona (in 3 step)</div>
          <h2 className="sectionTitle" style={{ marginTop: 8, fontSize: 22 }}>
            Guida alla scelta, non vendita di prodotto
          </h2>

          <div className="split">
            <div className="card cardHover">
              <div className="miniTitle">1 — Discovery</div>
              <div style={{ fontWeight: 1000, marginTop: 10, fontSize: 18 }}>Filtra per piattaforma / caso d’uso</div>
              <div style={{ color: 'var(--muted)', marginTop: 8, lineHeight: 1.7 }}>
                Parti dalla necessità reale. La matrice ti evita di perdersi in liste infinite.
              </div>
            </div>
            <div className="card cardHover">
              <div className="miniTitle">2 — Qualification</div>
              <div style={{ fontWeight: 1000, marginTop: 10, fontSize: 18 }}>
                Valuta maturità, complessità e timeline
              </div>
              <div style={{ color: 'var(--muted)', marginTop: 8, lineHeight: 1.7 }}>
                Non basta “il prodotto giusto”: serve chiarezza su tempi, KPI e aspettative realistiche.
              </div>
            </div>
            <div className="card cardHover">
              <div className="miniTitle">3 — Safety Focus</div>
              <div style={{ fontWeight: 1000, marginTop: 10, fontSize: 18 }}>Conferma safety e normativa</div>
              <div style={{ color: 'var(--muted)', marginTop: 8, lineHeight: 1.7 }}>
                Riduci i blocchi: compliance, criticità tipiche e rischi residui.
              </div>
            </div>
          </div>
        </section>

        <section id="matrice" className="section">
          <div className="miniTitle">Matrice soluzioni</div>
          <h2 className="sectionTitle" style={{ marginTop: 8, fontSize: 22 }}>
            Scegli un caso d’uso: a destra trovi il Focus
          </h2>
          <MatriceTable rows={rows} />
        </section>

        <section id="focus" className="section">
          <div className="card">
            <div className="miniTitle">Focus</div>
            <h3 className="sectionTitle" style={{ marginTop: 8, fontSize: 20 }}>
              La parte che trasforma “interesse” in “decisione”
            </h3>
            <div style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Il Focus raccoglie ciò che di solito blocca i progetti: safety, normative e rischi di timeline con team
              non ancora “delivery-proven”.
              <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a className="btn btnPrimary" href="/booking">
                  Prenota una sessione
                </a>
                <a className="btn btnGhost" href="/about">
                  Perché noi
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <b>HMSW</b> — base UI
              <div className="muted" style={{ marginTop: 6, lineHeight: 1.7 }}>
                Base pensata per essere sostituita da CMS/Framer mantenendo la logica di matrice.
              </div>
            </div>
            <div style={{ color: 'var(--muted)' }}>Prossimo step: sostituire contenuti con CMS e agganciare il vostro pricing/sourcing.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
