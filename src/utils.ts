import { Sound } from "./types";

export const isDarkMode = () => {
  const isDarkMode = localStorage.theme === "dark";
  const isLightMode = localStorage.theme === "light";
  return isDarkMode || (!isLightMode && window.matchMedia("(prefers-color-scheme: dark)").matches);
};
const preload = (src: string) =>
  new Promise(function (resolve, reject) {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });

export const preloadImages = (sources: string[]) => Promise.all(sources.map(preload));
const preloadAudio = (src: string) => {
  const _sound = src.split("/").pop()?.split(".")[0];
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.volume = 0.5;
    audio.oncanplay = function () {
      resolve(audio);
    };
    audio.onerror = reject;
    audio.src = src;
    switch (_sound as Sound) {
      case "start":
        window.SOUND_START = audio;
        break;
      case "win":
        window.SOUND_WIN = audio;
        break;
      case "loss":
        window.SOUND_LOSE = audio;
        break;
      case "tick":
        window.SOUND_TICK = audio;
        break;
      default:
        break;
    }
  });
};

export const preloadAudios = (sources: string[]) => Promise.all(sources.map(preloadAudio));
