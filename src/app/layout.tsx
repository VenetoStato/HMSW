import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/Header';
import { AppProviders } from '@/components/AppProviders';
import { getLocaleServer } from '@/lib/localeServer';

const inter = Inter({ subsets: ['latin'] });
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hmsw.vercel.app';

const GOOGLE_ADS_SEND_TO = process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO ?? '';
const GOOGLE_ADS_GTAG_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_GTAG_ID ??
  (GOOGLE_ADS_SEND_TO ? GOOGLE_ADS_SEND_TO.split('/')[0] : '');

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Robotics Shop',
  description: 'Shop di robot e accessori con prezzi e richiesta preventivo.',
  // deploy trigger
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Robotics Shop',
    description: 'Shop di robot e accessori con prezzi e richiesta preventivo.',
    siteName: 'Robotics Shop',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robotics Shop',
    description: 'Shop di robot e accessori con prezzi e richiesta preventivo.',
    // 'site' is twitter handle; we use siteName to avoid wrong value.
    site: 'Robotics Shop',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocaleServer();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {GOOGLE_ADS_GTAG_ID ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_GTAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-gtag" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_GTAG_ID}');`}
            </Script>
          </>
        ) : null}
        <AppProviders>
          <Header />
          <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
