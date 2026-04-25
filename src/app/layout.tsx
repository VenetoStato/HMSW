import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { AppProviders } from "@/components/AppProviders";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hmsw.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
    title: "Robotics Shop",
    description: "Shop di robot e accessori con prezzi e richiesta preventivo." ,
    // deploy trigger
    openGraph: {
      type: "website",
      url: SITE_URL,
      title: "Robotics Shop",
      description: "Shop di robot e accessori con prezzi e richiesta preventivo.",
      siteName: "Robotics Shop",
    },
    twitter: {
      card: "summary_large_image",
      title: "Robotics Shop",
      description: "Shop di robot e accessori con prezzi e richiesta preventivo.",
      // 'site' is twitter handle; we use siteName to avoid wrong value.
      site: "Robotics Shop",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <AppProviders>
          <Header />
          <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}
