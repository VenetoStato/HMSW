import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perché noi — HMSW',
  description:
    'Aiutiamo a scegliere il robot Unitree giusto per il tuo caso d’uso, con valutazione sicurezza, rischi e conformità.',
};

export default function AboutPage() {
  return (
    <main className="container" style={{ paddingTop: 28, paddingBottom: 40 }}>
      <div className="card" style={{ padding: 18 }}>
        <div className="miniTitle">Perché noi</div>
        <h1 className="sectionTitle" style={{ marginTop: 10, fontSize: 30 }}>
          Decisioni più veloci, progetti più sicuri
        </h1>
        <div
          style={{
            color: 'var(--muted)',
            lineHeight: 1.8,
            marginTop: 12,
            fontSize: 16,
            maxWidth: 860,
          }}
        >
          Non vendiamo un catalogo: aiutiamo a scegliere la <b>soluzione giusta</b> per il tuo caso d’uso
          (quadrupedi e humanoidi Unitree), con valutazione di sicurezza, rischi di integrazione e conformità.
        </div>

        <div className="split" style={{ marginTop: 16 }}>
          <div className="card cardHover" style={{ padding: 16 }}>
            <div className="miniTitle">Assessment guidato</div>
            <div style={{ fontWeight: 1000, fontSize: 18, marginTop: 10 }}>Dal bisogno al robot più adatto</div>
            <div style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 8 }}>
              Mettiamo a fuoco vincoli, obiettivi e KPI per arrivare alla scelta migliore.
            </div>
          </div>

          <div className="card cardHover" style={{ padding: 16 }}>
            <div className="miniTitle">Sicurezza & conformità</div>
            <div style={{ fontWeight: 1000, fontSize: 18, marginTop: 10 }}>Rischi trattati prima del go-live</div>
            <div style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 8 }}>
              Safety, normative e criticità tipiche vengono portate in primo piano.
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="miniTitle">Prossimo passo</div>
          <div style={{ marginTop: 10, color: 'var(--muted)', lineHeight: 1.8 }}>
            Vuoi trasformare il tuo caso d’uso in una proposta concreta? Possiamo collegare contenuti e
            sistemi di booking/contatto.
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
