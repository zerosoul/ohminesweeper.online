import "../globals.css";
import type { Metadata } from "next";
import { dir } from "i18next";
import { Analytics } from "@vercel/analytics/react";
// import { Inter } from 'next/font/google'
import ReduxProvider from "../../redux/provider";
import "98.css";
import { PWAMeta } from "../../config";
import { LocaleTypes, locales } from "@/i18n/settings";
// const inter = Inter({ subsets: ['latin'] })
export async function generateStaticParams() {
  return locales.map((lng) => ({ lng }));
}
export const metadata: Metadata = {
  ...PWAMeta,
  keywords:
    "minesweeper, play minesweeper, game, minesweeper free, minesweeper game, classic minesweeper, minesweeper google, microsoft minesweeper, minesweeper mac, minesweeper windows, mine sweeper, how to play minesweeper",
  category: "game",
  alternates: {
    canonical: "https://ohminesweeper.online",
    languages: {
      "en-US": "https://ohminesweeper.online/en",
      "zh-CN": "https://ohminesweeper.online/zh-CN"
    }
  }
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: LocaleTypes };
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className="dvh-screen flex flex-col justify-between transition-colors bg-teal-500 dark:bg-teal-950">
        <ReduxProvider>{children}</ReduxProvider>
        <div id="root-modal"></div>
        {process.env.NODE_ENV == "production" && <Analytics />}
      </body>
    </html>
  );
}
