import { FancyAnchor } from '@/components/FancyButton';

export const metadata = {
  title: 'Guida alla robotica base',
  description: 'Risorse gratuite per partire con la robotica e scegliere i componenti con criterio.',
};

export default function GuidePage() {
  return (
    <main className="py-8">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 backdrop-blur">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Guida alla robotica base</h1>
        <p className="mt-3 text-sm md:text-base text-gray-200/80 leading-relaxed">
          Una mini guida pratica per impostare i primi componenti e arrivare più velocemente a un setup
          funzionante.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
            <h2 className="font-semibold">1) Parti dallo scenario</h2>
            <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
              Demo, R&D o integrazione richiedono scelte diverse. Definisci prima obiettivo e vincoli (tempo,
              spazio, interfacce richieste).
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
            <h2 className="font-semibold">2) Verifica compatibilità</h2>
            <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
              Controlla alimentazione, controllo, sensori/feedback e meccanica. Un carrello con componenti
              compatibili ti aiuta a ridurre errori.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
            <h2 className="font-semibold">3) Setup iterativo</h2>
            <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
              Inizia con ciò che serve davvero. Aggiorna il kit man mano che ottieni metriche e feedback.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
            <h2 className="font-semibold">4) Checklist rapida</h2>
            <ul className="mt-2 space-y-2 text-sm text-gray-200/80">
              <li>• Alimentazione e controller coerenti</li>
              <li>• Compatibilità meccanica e montaggi</li>
              <li>• Requisiti software / integrazione</li>
              <li>• Modalità demo / training / POC</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-sm font-semibold">Scarica subito la guida</div>
              <div className="mt-1 text-sm text-gray-200/80">File TXT (semplice e immediato).</div>
            </div>
            <FancyAnchor
              variant="primary"
              href="/guida-robotica-base.txt"
              className="justify-center"
              rel="noopener"
            >
              Scarica TXT
            </FancyAnchor>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10">
          <h2 className="text-xl font-semibold">Vuoi che ti aiutiamo a scegliere?</h2>
          <p className="mt-2 text-sm text-gray-200/80 leading-relaxed">
            Vai alle <a className="underline" href="/soluzioni">soluzioni</a> e configura il kit. Se ti serve
            un supporto più tecnico, puoi inviare la richiesta dal carrello.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <FancyAnchor variant="primary" href="/soluzioni">
              Configura una soluzione
            </FancyAnchor>
            <FancyAnchor variant="secondary" href="/shop">
              Vai allo shop
            </FancyAnchor>
          </div>
        </div>
      </section>
    </main>
  );
}
