import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contatti — mekosrl.it (demo)',
  description: 'Contattaci: rispondiamo con una proposta guidata da safety, normativa e maturità di progetto.',
};

export default function ContactPage() {
  return (
    <main className="container" style={{ paddingTop: 28, paddingBottom: 48 }}>
      <div className="card" style={{ padding: 18 }}>
        <div className="miniTitle">Contatti</div>
        <h1 className="sectionTitle" style={{ marginTop: 10, fontSize: 34 }}>
          Parliamo del tuo caso d’uso
        </h1>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 10, maxWidth: 880, fontSize: 16 }}>
          Se preferisci non usare il booking, puoi inviare una richiesta qui. In produzione collegheremo email/CRM
          o un form provider.
        </p>

        <div className="split" style={{ marginTop: 16 }}>
          <div className="card cardHover" style={{ padding: 16 }}>
            <div className="miniTitle">Cosa ci serve</div>
            <ul style={{ margin: '10px 0 0', paddingLeft: 18, color: 'var(--muted)', lineHeight: 1.9 }}>
              <li>Piattaforma / tecnologia valutata</li>
              <li>Caso d’uso (obiettivo)</li>
              <li>Tempi desiderati e vincoli</li>
              <li>Safety &amp; normativa: quali aspetti vi preoccupano</li>
            </ul>
            <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a className="btn btnPrimary" href="/booking">
                Vai al booking
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
              <textarea
                placeholder="Messaggio"
                className="input"
                style={{ borderRadius: 14, minHeight: 120, resize: 'vertical' }}
                required
                name="message"
              />
              <button className="btn btnPrimary" type="submit">
                Invia
              </button>
              <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6 }}>
                Privacy e trattamento dati: placeholder.
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
