import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HMSW — Matrice Soluzioni',
    template: '%s | HMSW — Matrice Soluzioni',
  },
  description:
    'Matrice soluzioni: scopri casi d’uso, maturità, complessità e focus di sicurezza per piattaforme robotiche.',
  metadataBase: new URL('https://hmsw.vercel.app'),
  alternates: {
    canonical: 'https://hmsw.vercel.app',
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
