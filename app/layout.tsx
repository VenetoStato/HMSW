import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'mekosrl.it — Matrice Soluzioni',
    template: '%s | mekosrl.it — Matrice Soluzioni',
  },
  description:
    'Matrice soluzioni: scopri casi d’uso, maturità, complessità e focus di sicurezza per piattaforme robotiche.',
  metadataBase: new URL('https://mekosrl.it'),
  alternates: {
    canonical: 'https://mekosrl.it',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
