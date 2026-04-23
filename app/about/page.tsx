import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perché noi — mekosrl.it (demo) ',
  description: 'Guidiamo la scelta in base a maturità, complessità e Safety Focus (non commodity).',
};

export default function AboutPage() {
  return (
    <main className="container" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <div className="card" style={{ padding: 18 }}>
        <div className="miniTitle">Perché noi</div>
        <h1 className="sectionTitle" style={{ marginTop: 10, fontSize: 30 }}>
          Decisioni più veloci, progetti più sicuri
        </h1>
        <div style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 12, fontSize: 16, maxWidth: 860 }}>
          Questa base è progettata per trasformare l’interesse in una decisione: non “vendiamo un catalogo”, ma
          aiutiamo a scegliere la <b>soluzione giusta</b> in base a maturità/fattibilità, complessità, tempi e soprattutto
          safety &amp; normativa.
        </div>

        <div className="split" style={{ marginTop: 16 }}>
          <div className="card cardHover" style={{ padding: 16 }}>
            <div className="miniTitle">Guided discovery</div>
            <div style={{ fontWeight: 1000, fontSize: 18, marginTop: 10 }}>La matrice evita scelte a caso</div>
            <div style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 8 }}>
              Filtri e Focus rendono evidente cosa guida la decisione (non solo il prodotto).
            </div>
          </div>

          <div className="card cardHover" style={{ padding: 16 }}>
            <div className="miniTitle">Safety & compliance</div>
            <div style={{ fontWeight: 1000, fontSize: 18, marginTop: 10 }}>Riduci i blocchi di progetto</div>
            <div style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 8 }}>
              Normativa, criticità tipiche e rischi residui vengono portati in primo piano.
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="miniTitle">Prossimo passo</div>
          <div style={{ marginTop: 10, color: 'var(--muted)', lineHeight: 1.8 }}>
            Vuoi tradurre la matrice in un funnel completo per il tuo business? Possiamo collegare contenuti CMS/Framer,
            risorse (ebook/cataloghi) e un sistema di booking/contatto.
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a className="btn btnPrimary" href="/booking">
              Prenota una sessione
            </a>
            <a className="btn btnGhost" href="/contact">
              Contattaci
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
