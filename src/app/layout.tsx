import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import ReduxProvider from "../redux/provider";
// import "98.css";
import { PWAMeta, viewportSetting } from "../config";
import GTag from "@/components/gtag";
import { StrictMode } from "react";
// import AdSense from "../components/ad-sense";
import AdBlock from "../components/ad-block";
// const inter = Inter({ subsets: ['latin'] })

export const viewport = viewportSetting;
export const metadata: Metadata = {
  ...PWAMeta,
  keywords:
    "minesweeper, play minesweeper, game, minesweeper free, minesweeper game, classic minesweeper, minesweeper google, microsoft minesweeper, minesweeper mac, minesweeper windows, mine sweeper, how to play minesweeper",
  category: "game",
  verification: {
    google: "MWrPIw9iMotX9pjUS-MiAj-CN58odQTTvdHtpWlxy-s"
  },
  alternates: {
    canonical: "https://ohminesweeper.online"
    // languages: {
    //   'en-US': 'https://ohminesweeper.online/en-US',
    //   'zh-CN': 'https://ohminesweeper.online/zh-CN',
    // },
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* <head>{process.env.NODE_ENV == "production" && <AdSense />}</head> */}
      <body className="dvh-screen flex flex-col justify-between transition-colors bg-[--theme-desktop-bg]  dark:bg-[--theme-desktop-dark-bg]">
        <StrictMode>
          <ReduxProvider>{children}</ReduxProvider>
        </StrictMode>
        <div id="root-modal" className="minesweeper-modal"></div>
        <aside id="confetti-modal" className="minesweeper-modal"></aside>
        <aside id="confirm-modal" className="minesweeper-modal"></aside>
        {process.env.NODE_ENV == "production" && <GTag />}
        {process.env.NODE_ENV == "production" && (
          <aside className="fixed top-0 left-1/2 -translate-x-1/2 h-20  w-full max-w-md">
            <AdBlock />
          </aside>
        )}
      </body>
    </html>
  );
}
