import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prenota online — HMSW',
  description:
    'Prenota una sessione: raccontaci il tuo caso d’uso e ti indirizziamo sul robot Unitree più adatto.',
};

export default function BookingPage() {
  return (
    <main className="container" style={{ paddingTop: 28, paddingBottom: 48 }}>
      <div className="card" style={{ padding: 18 }}>
        <div className="miniTitle">Booking / Assessment</div>
        <h1 className="sectionTitle" style={{ marginTop: 10, fontSize: 34 }}>
          Prenota una sessione: dal caso d’uso al robot giusto
        </h1>
        <p
          style={{
            color: 'var(--muted)',
            lineHeight: 1.8,
            marginTop: 10,
            maxWidth: 880,
            fontSize: 16,
          }}
        >
          Questa pagina è un placeholder UI: in produzione la collegheremo al vostro sistema di
          prenotazione/form. L’obiettivo è qualificare la richiesta (piattaforma, obiettivo,
          requisiti di sicurezza) e trasformarla in proposta.
        </p>

        <div className="split" style={{ marginTop: 16 }}>
          <div className="card cardHover" style={{ padding: 16 }}>
            <div className="miniTitle">Opzione</div>
            <div style={{ fontWeight: 1000, fontSize: 20, marginTop: 10 }}>Sessione informativa</div>
            <div style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 8 }}>
              Capire contesto e obiettivi, poi indirizzarti sulla piattaforma robotica più coerente.
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a className="btn btnPrimary" href="/contact">
                Richiedi
              </a>
              <a className="btn btnGhost" href="/contact">
                Chiedi dettagli
              </a>
            </div>
          </div>

          <div className="card" style={{ padding: 16 }}>
            <div className="miniTitle">Form (demo)</div>
            <form style={{ marginTop: 10, display: 'grid', gap: 10 }} action="#" method="post">
              <input className="input" style={{ borderRadius: 14 }} placeholder="Nome" required name="name" />
              <input
                className="input"
                style={{ borderRadius: 14 }}
                placeholder="Email"
                type="email"
                required
                name="email"
              />
              <input
                className="input"
                style={{ borderRadius: 14 }}
                placeholder="Azienda (opzionale)"
                name="company"
              />
              <textarea
                placeholder="Raccontaci il tuo caso d’uso (impianto, obiettivo, tempi)"
                className="input"
                style={{ borderRadius: 14, minHeight: 120, resize: 'vertical' }}
                required
                name="message"
              />
              <button className="btn btnPrimary" type="submit">
                Invia richiesta
              </button>
              <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
                Privacy e trattamento dati: placeholder. In produzione collegare policy legale.
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
