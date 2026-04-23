import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HMSW — Robot Unitree',
    template: '%s | HMSW — Robot Unitree',
  },
  description:
    'Presentiamo e qualifichiamo robot Unitree (quadrupedi e umanoidi) per ispezione, security/patrol e missioni industriali, con focus su sicurezza e conformità.',
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
