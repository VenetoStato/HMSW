import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chi siamo (placeholder) — mekosrl.it',
};

export default function AboutPage() {
  return (
    <main className="container" style={{ paddingTop: 24 }}>
      <h1 style={{ margin: '0 0 10px', fontSize: 34 }}>Chi siamo</h1>
      <p className="muted" style={{ lineHeight: 1.7 }}>
        Placeholder: qui possiamo integrare il tuo CMS (Framer o headless) e il branding template.
      </p>
    </main>
  );
}
