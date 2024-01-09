import React from "react";
import ImageTitle, { ImageProps } from "../image-with-title";
// type SourceType = "ios" | "android" | "chrome";
type SourceType = "ios" | "chrome";
type Props = {
  type: SourceType;
};
const images: ImageProps[] = [
  {
    width: 300,
    height: 300,
    src: "/ms/pwa/pwa.ios.step1.png",
    title: "Step 1"
  },
  {
    width: 300,
    height: 300,
    src: "/ms/pwa/pwa.ios.step2.png",
    title: "Step 2"
  },
  {
    width: 300,
    height: 300,
    src: "/ms/pwa/pwa.ios.step3.png",
    title: "Step 3"
  },
  {
    width: 300,
    height: 300,
    src: "/ms/pwa/pwa.chrome.png",
    title: "install on chrome"
  }
];
const data: Record<SourceType, ImageProps[]> = {
  ios: images.slice(0, 3),
  chrome: images.slice(3, 4)
};
const ImageList = ({ type }: Props) => {
  const list = data[type];
  return (
    <div className="my-5 flex gap-3 items-end md:gap-6 flex-wrap max-w-6xl">
      {list.map((props, i) => (
        <ImageTitle key={i} {...props} />
      ))}
    </div>
  );
};

export default ImageList;
