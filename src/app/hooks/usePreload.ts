import { preloadImages } from "@/utils";
import { useEffect, useState } from "react";
const mineCountImages = [...Array(8).keys()].map((i) => `/ms/count/${i}.svg`);
const numImages = [...Array(9).keys()].map((i) => `/ms/num/${i}.svg`);
const otherImages = ["/ms/cell.clicked.svg", "/ms/cell.click.svg"];
const images = [...otherImages, ...mineCountImages, ...numImages];

const usePreload = () => {
  const [preloaded, setPreloaded] = useState(false);
  useEffect(() => {
    preloadImages(images)
      .then(() => {
        setPreloaded(true);
      })
      .catch(() => {
        setPreloaded(true);
      });
  }, []);

  return preloaded;
};

export default usePreload;
