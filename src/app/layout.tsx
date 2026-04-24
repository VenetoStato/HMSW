import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/Header";
import { AppProviders } from "@/components/AppProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UNITREE Shop",
  description: "Shop prodotti UNITREE e accessori.",
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
