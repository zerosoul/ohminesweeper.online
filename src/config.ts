import { Difficulty } from "@minesweeper";
import { Level, SiteMap } from "./types";
import { AppleWebApp } from "next/dist/lib/metadata/types/extra-types";
import { Metadata } from "next";

export const defaultCustom: Difficulty = {
  width: 16,
  height: 30,
  numMines: 99
};
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
  custom: defaultCustom
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false
  },
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
    url: "https://ohminesweeper.online",
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
export const CellSizes = [
  {
    name: "small",
    value: 26
  },
  {
    name: "normal",
    value: 30
  },
  {
    name: "medium",
    value: 34
  },
  {
    name: "large",
    value: 42
  },
  {
    name: "huge",
    value: 48
  }
];

export const Pages: (SiteMap & { title: string })[] = [
  {
    title: "Home",
    url: "https://ohminesweeper.online",
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 1
  },
  {
    title: "How to play minesweeper",
    url: "https://ohminesweeper.online/a/how-to-play",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9
  },
  {
    title: "No Flags",
    url: "https://ohminesweeper.online/a/no-flag",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  },
  {
    title: "Advance Patterns",
    url: "https://ohminesweeper.online/a/advance-patterns",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  },
  {
    title: "First Click",
    url: "https://ohminesweeper.online/a/first-click",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  },
  {
    title: "Guessing",
    url: "https://ohminesweeper.online/a/guess",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  },
  {
    title: "Efficiency",
    url: "https://ohminesweeper.online/a/efficiency",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  },
  {
    title: "More Tips",
    url: "https://ohminesweeper.online/a/more-tips",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  },
  {
    title: "How to install with PWA",
    url: "https://ohminesweeper.online/a/how-to-install-pwa",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  },
  {
    title: "About",
    url: "https://ohminesweeper.online/a/about",
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  }
];
