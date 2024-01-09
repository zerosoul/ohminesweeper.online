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
const preloadCssFile = (src: string) =>
  new Promise(function (resolve) {
    // link标签没有onload 使用图片模拟
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = resolve;
    img.src = src;
  });

export const preloadImages = (sources: string[]) => Promise.all(sources.map(preload));
const preloadAudio = (src: string) => {
  const _sound = src.split("/").pop()?.split(".")[0];
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.volume = 0.5;
    audio.preload = "auto";
    // 最多2s
    const inter = setTimeout(() => {
      resolve(audio);
    }, 2000);
    function handleResolve() {
      clearTimeout(inter);
      resolve(audio);
    }
    audio.oncanplay = handleResolve;
    audio.onloadedmetadata = handleResolve;
    audio.onerror = handleResolve;
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
export const preloadStyleFiles = (sources: string[]) => Promise.all(sources.map(preloadCssFile));

export const appendStyleSheetElement = (url: string, id?: string) => {
  const _id = id ?? `theme-ui`;
  const _link = document.querySelector(`#${_id}`) as HTMLLinkElement;
  // setLoading(true);
  if (_link) {
    _link.href = url;
    // setLoading(false);
  } else {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.id = _id;
    link.href = url;
    // link.onload = () => {
    //   setLoading(false);
    // };
    // link.onerror = () => {
    //   setLoading(false);
    // };
    document.head.appendChild(link);
  }
};
export const isWebview = () => {
  const ua = navigator.userAgent;
  const isiOSwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua);
  return ua.toLowerCase().indexOf("micromessenger") > -1 || isiOSwebview;
};
export const isMobile = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
