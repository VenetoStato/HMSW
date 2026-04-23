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
          <div className="brand">Meko — Matrice Soluzioni</div>
          <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/">Home</a>
            <a href="#matrice">Matrice</a>
            <a href="#focus">Focus</a>
          </nav>
        </div>
      </header>

      <main className="container">
        <section className="hero" aria-labelledby="hero-title">
          <div className="kicker">Mekosrl.it</div>
          <h1 className="h1" id="hero-title">
            Soluzioni robotiche: dal caso d’uso al Safety Focus
          </h1>
          <p className="sub">
            Una vista data-driven (da Google Sheets) per mappare piattaforme, maturità/fattibilità,
            complessità e rischi normativi. Poi possiamo collegarla a un CMS/Framer mantenendo la stessa UI.
          </p>
          <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn" href="#matrice">
              Esplora la matrice
            </a>
            <a className="btn" href="/about">
              Chi siamo (placeholder)
            </a>
          </div>
        </section>

        <section id="matrice" style={{ padding: '12px 0 28px' }}>
          <h2 className="sectionTitle" style={{ fontSize: 20, marginTop: 6 }}>
            Matrice soluzioni
          </h2>
          <MatriceTable rows={rows} />
        </section>

        <section id="focus" style={{ padding: '4px 0 36px' }}>
          <div className="card">
            <h3 className="sectionTitle">Come leggere il Focus</h3>
            <div className="muted" style={{ lineHeight: 1.7 }}>
              Seleziona una riga nella tabella: a destra vedi un riepilogo del caso d’uso.
              L’obiettivo è portare in primo piano ciò che spesso “blocca” i progetti (safety + normative).
            </div>
          </div>
        </section>

        <footer className="footer">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <b style={{ color: 'var(--text)' }}>mekosrl.it</b> — base iniziale
              <div className="muted" style={{ marginTop: 6 }}>
                Dati: Google Sheets (CSV via gviz). Design: template scuro (placeholder).
              </div>
            </div>
            <div className="muted">
              Prossimo step: sostituire i contenuti con CMS e usare branding template come riferimento.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
