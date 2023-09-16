import React from "react";
import ImageTitle, { ImageProps } from "../image-with-title";
type SourceType = "eight" | "two1" | "two2";
type Props = {
  type: SourceType;
};
const images: ImageProps[] = [
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/p-1.png",
    title: "The 1 on the corner touches 1 square so it must be a mine."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/p-2.png",
    title: "The 2 touches 2 squares so they must both be mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/p-3.png",
    title: "The 3 touches 3 squares so they must all be mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/p-4.png",
    title: "The 4 touches 4 squares so they must all be mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/p-5.png",
    title: "The 5 touches 5 squares so they must all be mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/p-6.png",
    title: "The 6 touches 6 squares so they must all be mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/p-7.png",
    title: "The 7 touches 7 squares so they must all be mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/p-8.png",
    title: "he 8 touches 8 squares so they must all be mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/fake-two-1.png",
    title:
      "The pink 2 touches three squares and cannot be solved. The yellow 2 touches two squares and can be solved."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/fake-two-2.png",
    title:
      "The pink 2 touches three squares and cannot be solved. The yellow 3 touches three squares and can be solved."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/fake-one-corner-1.png",
    title: "The 1 in the corner is already touching a mine. The pink square is not a mine."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/how-to/fake-one-corner-2.png",
    title: "The 1 in the corner is already touching a mine. The pink square is not a mine."
  }
];
const data: Record<SourceType, ImageProps[]> = {
  eight: images.slice(0, 8),
  two1: images.slice(8, 10),
  two2: images.slice(10, 12)
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
