import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fillUserData } from "@/redux/slice/user.data";
import { UserData } from "@/types";
import { appendStyleSheetElement, preloadAudios, preloadImages, preloadStyleFiles } from "@/utils";
import { entries } from "idb-keyval";
import { useEffect, useState } from "react";
const mineCountImages = [...Array(8).keys()].map((i) => `/ms/count/${i}.svg`);
const numImages = [...Array(9).keys()].map((i) => `/ms/num/${i}.svg`);
const otherImages = [
  "/ms/cell.clicked.svg",
  "/ms/cell.click.svg",
  "/ms/result.face.png",
  "/win/keys.png"
];
const images = [...otherImages, ...mineCountImages, ...numImages];

let inter = 0;
const audios = [
  "/ms/sound/tick.wav",
  "/ms/sound/start.wav",
  "/ms/sound/win.wav",
  "/ms/sound/loss.wav"
];
const styleFiles = ["https://unpkg.com/xp.css", "https://unpkg.com/98.css"];
const usePreload = () => {
  const ui = useAppSelector((store) => store.userData.ui);
  const dispatch = useAppDispatch();
  const [isTimeout, setIsTimeout] = useState(false);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rehydrated, setRehydrated] = useState(false);
  const [progress, setProgress] = useState(0);
  // const [tested, setTested] = useState(true);
  useEffect(() => {
    try {
      preloadStyleFiles(styleFiles)
        .then(() => {
          setStyleLoaded(true);
        })
        .catch(() => {
          setStyleLoaded(true);
        });
      preloadAudios(audios)
        .then(() => {
          setSoundLoaded(true);
        })
        .catch(() => {
          setSoundLoaded(true);
        });
      // preload images
      preloadImages(images)
        .then(() => {
          setImageLoaded(true);
        })
        .catch(() => {
          setImageLoaded(true);
        });
      // rehydrated from indexDB
      entries()
        .then((items) => {
          const data = Object.fromEntries(items) as Partial<UserData>;
          dispatch(fillUserData(data));
          setRehydrated(true);
        })
        .catch(() => {
          setRehydrated(true);
        });
    } catch (error) {
      setImageLoaded(true);
      setRehydrated(true);
      setSoundLoaded(true);
    }
    // for test
    inter = window.setTimeout(() => {
      setIsTimeout(true);
    }, 6000);
  }, []);
  useEffect(() => {
    if (rehydrated) {
      const styleUrl = ui == "win98" ? `https://unpkg.com/98.css` : "https://unpkg.com/xp.css";
      if (ui == "xp") {
        document.documentElement.classList.add("theme-xp");
      } else {
        document.documentElement.classList.remove("theme-xp");
      }
      appendStyleSheetElement(styleUrl);
    }
  }, [rehydrated, ui]);

  useEffect(() => {
    if (imageLoaded && rehydrated && soundLoaded && styleLoaded) {
      clearTimeout(inter);
      setIsTimeout(true);
    }
  }, [imageLoaded, rehydrated, soundLoaded, styleLoaded]);
  useEffect(() => {
    const items = [imageLoaded, rehydrated, soundLoaded, styleLoaded, isTimeout];
    const totalCount = items.length;
    const loadedCount = items.filter((itm) => !!itm).length;
    const percent = +(loadedCount / totalCount).toFixed(2);
    const progress = 100 * percent;
    setProgress(progress);
  }, [imageLoaded, rehydrated, soundLoaded, styleLoaded, isTimeout]);

  return {
    rehydrated,
    // loaded: false,
    loaded: styleLoaded && imageLoaded && rehydrated && soundLoaded && isTimeout,
    progress
  };
  // return preloaded && rehydrated && tested;
};

export default usePreload;
