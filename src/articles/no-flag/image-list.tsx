import React from "react";
import ImageTitle, { ImageProps } from "../image-with-title";
type SourceType = "part1" | "part2" | "part3";
type Props = {
  type: SourceType;
};
const images: ImageProps[] = [
  {
    width: 200,
    height: 200,
    src: "/ms/no-flag/nf-1.png",
    title:
      "The only reason to flag the pink squares is to make them look pretty. You win by opening all safe squares, not by flagging mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/no-flag/nf-2.png",
    title:
      "The NF technique 'sees' the two mines touching the left 3 and uses 1-1-X twice to open the blue squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/no-flag/nf-3.png",
    title:
      "The NF technique 'sees' the two mines touching the 3 and uses 1-1-X to open the 1. The yellow squares will be numbers but the blue square could be an opening."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/no-flag/nf-4.png",
    title:
      "The NF technique 'sees' the three mines touching the 4 and uses 1-1-X to open the 1. The yellow squares will be numbers (because there is a mine in the two squares above) but the blue square could be an opening."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/no-flag/nf-5.png",
    title:
      "Pink squares are mines and yellow squares will be numbers. The blue squares might be openings."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/no-flag/nf-6.png",
    title:
      "Pink squares are mines and yellow squares will be numbers. The blue squares might be openings."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/no-flag/nf-7.png",
    title:
      "Pink squares are mines and yellow squares will be numbers. The blue squares might be openings."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/no-flag/nf-8.png",
    title:
      "The pink squares are 50:50 guesses so the yellow squares will contain numbers. A NF player should guess a blue square."
  }
];
const data: Record<SourceType, ImageProps[]> = {
  part1: images.slice(0, 4),
  part2: images.slice(4, 8),
  part3: images.slice(8, 12)
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
