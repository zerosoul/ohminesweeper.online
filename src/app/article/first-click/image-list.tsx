import React from "react";
import ImageTitle, { ImageProps } from "../image-with-title";

const images: ImageProps[] = [
  {
    width: 200,
    height: 200,
    src: "/ms/first-click/88-opening.gif",
    title: "Average opening size on Beginner ranges from 18 to 32 squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/first-click/1616-opening.gif",
    title: "Average opening size on Intermediate ranges from 27 to 66 squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/first-click/3016-opening.gif",
    title: "Average opening size on Expert ranges from 16 to 41 squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/first-click/88-probability.gif",
    title: "Opening probability on Beginner ranges from 0.19 to 0.60."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/first-click/1616-probability.gif",
    title: "Opening probability on Intermediate ranges from 0.21 to 0.60."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/first-click/3016-probability.gif",
    title: "Opening probability on Expert ranges from 0.12 to 0.50."
  }
];
const ImageList = () => {
  return (
    <div className="my-5 flex gap-3 items-stretch md:gap-6 flex-wrap max-w-6xl">
      {images.map((props, i) => (
        <ImageTitle key={i} {...props} />
      ))}
    </div>
  );
};

export default ImageList;
