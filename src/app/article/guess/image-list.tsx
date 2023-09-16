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
    src: "/ms/guess/g-unavoidable-1.png",
    title: "This 50:50 guess is unavoidable. The best strategy is to guess quickly."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-quick-1.png",
    title:
      "The pink squares are a 50:50 guess. The first strategy guesses quickly. The second strategy solves the rest of the board and hopes new information eliminates the guess."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-global-1.png",
    title:
      "There could be 1, 2 or 3 mines in these four squares. The second strategy solves the rest of the board to determine the number of mines. If there are 1 or 3 mines no guessing is needed."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-open-1.png",
    title:
      "You cannot deduce the mines. The third strategy forgets about mines and opens the safe pink squares. If each pink square is a 1 the blue squares can also be opened."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-avoid-1.png",
    title:
      "Avoid unnecessary guesses. Instead of opening three squares in a row open the yellow squares first so you have time to react if the middle square is a mine.    "
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-useful-1.png",
    title:
      "If you open the middle square you need to make another guess. The fourth strategy opens the blue square to eliminate the guess."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-useful-2.png",
    title:
      "There are multiple 50:50 guesses. The fourth strategy opens a useful square. If the blue square is a 3 or 7 it eliminates guessing. If the green square is 3 or 6 it could also eliminate guessing."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-useful-3.png",
    title:
      "There are multiple 50:50 guesses. The fifth strategy opens a 'random' square. On Expert the blue square is 20:80, does not touch a 50:50 and is on an edge so might be an opening.    "
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-complex-1.png",
    title: "Three local 50:50 guesses."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-complex-2.png",
    title: "Three local 66:33 guesses."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-complex-3.png",
    title: "Preparing to calculate."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/guess/g-complex-4.png",
    title: "Global probabilities."
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
    <div className="my-5 flex gap-3 items-stretch md:gap-6 flex-wrap max-w-6xl">
      {list.map((props, i) => (
        <ImageTitle key={i} {...props} />
      ))}
    </div>
  );
};

export default ImageList;
