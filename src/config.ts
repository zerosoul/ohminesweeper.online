import { Difficulty } from "minesweeper-redux";
import { Level } from "./types";
import { AppleWebApp } from "next/dist/lib/metadata/types/extra-types";
import { Metadata } from "next";

export const difficulty: Record<Level, Difficulty> = {
  beginner: {
    width: 9,
    height: 9,
    numMines: 10
  },
  intermediate: {
    width: 16,
    height: 16,
    numMines: 40
  },
  expert: {
    width: 30,
    height: 16,
    numMines: 99
  },
  custom: {
    width: 16,
    height: 30,
    numMines: 99
  }
};

export const AppleWebMeta: AppleWebApp = {
  title: "MineSweeper",
  statusBarStyle: "black-translucent",
  capable: true,
  startupImage: [
    {
      url: "/splash/iphone5_splash.png",
      media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
    },
    {
      url: "/splash/iphone6_splash.png",
      media: "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
    },
    {
      url: "/splash/iphoneplus_splash.png",
      media: "(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
    },
    {
      url: "/splash/iphonex_splash.png",
      media: "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
    },
    {
      url: "/splash/iphonexr_splash.png",
      media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
    },
    {
      url: "/splash/iphonexsmax_splash.png",
      media: "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
    },
    {
      url: "/splash/ipad_splash.png",
      media: "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
    },
    {
      url: "/splash/ipadpro1_splash.png",
      media: "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
    },
    {
      url: "/splash/ipadpro3_splash.png",
      media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
    },
    {
      url: "/splash/ipadpro2_splash.png",
      media:
        "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
    }
  ]
};
const title = {
  default: "MineSweeper Game Online",
  template: "%s | MineSweeper Game Online"
};
const description = "windows 98/2000 classic minesweeper game online";
export const PWAMeta: Metadata = {
  applicationName: "MineSweeper",
  title,
  description,
  manifest: "/manifest.json",
  appleWebApp: AppleWebMeta,
  themeColor: "#c0c0c0",
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: "MineSweeper",
    title,
    description
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    site: "@minesweeper",
    creator: "@wsygc",
    images: ["/twitter-image.png"]
  }
};
