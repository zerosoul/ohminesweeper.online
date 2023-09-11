import { useAppDispatch } from "@/redux/hooks";
import { fillUserData } from "@/redux/slice/user.data";
import { UserData } from "@/types";
import { preloadImages } from "@/utils";
import { entries } from "idb-keyval";
import { useEffect, useState } from "react";
const mineCountImages = [...Array(8).keys()].map((i) => `/ms/count/${i}.svg`);
const numImages = [...Array(9).keys()].map((i) => `/ms/num/${i}.svg`);
const otherImages = ["/ms/cell.clicked.svg", "/ms/cell.click.svg", "/ms/result.face.png"];
const images = [...otherImages, ...mineCountImages, ...numImages];

const usePreload = () => {
  const dispatch = useAppDispatch();
  const [preloaded, setPreloaded] = useState(false);
  const [rehydrated, setRehydrated] = useState(false);
  // const [tested, setTested] = useState(true);
  useEffect(() => {
    // preload images
    preloadImages(images)
      .then(() => {
        setPreloaded(true);
      })
      .catch(() => {
        setPreloaded(true);
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
    // for test
    // setTimeout(() => {
    //   setTested(true);
    // }, 3000000);
  }, []);

  return preloaded && rehydrated;
  // return preloaded && rehydrated && tested;
};

export default usePreload;
