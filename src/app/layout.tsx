import "./globals.css";
import type { Metadata } from "next";
// import { Inter } from 'next/font/google'
import ReduxProvider from "../redux/provider";
import "98.css";
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "MineSweeper Game Online",
  description: "classic minesweeper game online",
  keywords:
    "minesweeper, play minesweeper, game, minesweeper free, minesweeper game, classic minesweeper, minesweeper google, microsoft minesweeper, minesweeper mac, minesweeper windows, mine sweeper, how to play minesweeper"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
