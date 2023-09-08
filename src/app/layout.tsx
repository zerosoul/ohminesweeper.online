import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import ReduxProvider from "../redux/provider";
import "98.css";
import { PWAMeta } from "../config";
import Footer from "./components/footer";
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  ...PWAMeta,
  keywords:
    "minesweeper, play minesweeper, game, minesweeper free, minesweeper game, classic minesweeper, minesweeper google, microsoft minesweeper, minesweeper mac, minesweeper windows, mine sweeper, how to play minesweeper",
  category: "game",
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
      <body className="min-h-screen flex flex-col justify-between transition-colors bg-teal-500 dark:bg-teal-950">
        <ReduxProvider>{children}</ReduxProvider>
        <div id="root-modal"></div>
        <Footer />
      </body>
    </html>
  );
}
