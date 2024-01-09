import React from "react";
import ImageTitle, { ImageProps } from "../image-with-title";
type SourceType =
  | "part1"
  | "part2"
  | "part3"
  | "part4"
  | "part5"
  | "part6"
  | "part7"
  | "part8"
  | "part9";
type Props = {
  type: SourceType;
};
const images: ImageProps[] = [
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/pattern-121-1.png",
    title: "The 1-2-1 pattern has one solution."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/pattern-1221-1.png",
    title: "The 1-2-2-1 pattern has one solution."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/pattern-121-1.png",
    title: "The 1-2-1 pattern has one solution."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/pattern-121-2.png",
    title: "Apply the 1-2-X pattern from the left."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/pattern-121-3.png",
    title: "Apply the 1-2-X pattern from the right."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/pattern-1221-1.png",
    title: "The 1-2-2-1 pattern has one solution."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/pattern-1221-2.png",
    title: "Apply the 1-2-X pattern from the left."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/pattern-1221-3.png",
    title: "Apply the 1-2-X pattern from the right."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/third-square-1.png",
    title:
      "The pink 1 means there is one mine in the three squares it touches. The yellow 1 means the mine is in the subset of two yellow squares. The third square from the border must be empty."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/third-square-2.png",
    title:
      "The pink 1 means there is one mine in the three squares it touches. The yellow 1 means the mine is in the subset of two yellow squares. The third square from the border must be empty."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/third-square-3.png",
    title:
      "The pink 1 means there is one mine in the five squares it touches. The yellow 1 means the mine is in the subset of two yellow squares. The pink squares must be empty."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/third-square-4.png",
    title:
      "Each pink 1 means there is one mine in the five squares it touches. Each yellow 1 means the mine is in the subset of two yellow squares. The pink squares must be empty."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/third-square-1.png",
    title:
      "The pink 1 means there is one mine in the three squares it touches. The yellow 1 means the mine is in the subset of two yellow squares. The third square from the border must be empty."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/third-square-2.png",
    title:
      "The pink 1 means there is one mine in the three squares it touches. The yellow 1 means the mine is in the subset of two yellow squares. The third square from the border must be empty."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/basic-logic-3.png",
    title:
      "The pink 2 touches four squares and the yellow 2 touches a subset of two squares. The mines must be in the yellow squares so the pink squares are safe."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/basic-logic-4.png",
    title:
      "The pink 2 touches four squares and the yellow 4 (effectively a 1) touches a subset of two squares. The mine must be in the yellow squares so the pink squares are safe."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/basic-logic-5.png",
    title:
      "The 3 touches four squares. The yellow 1 touches a subset of two squares. The second and third mines must be in the pink squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/basic-logic-6.png",
    title:
      "The 4 touches five squares. The yellow 1 touches a subset of two squares. The second, third and fourth mines must be in the pink squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/basic-logic-7.png",
    title:
      "The 3 touches five squares. Each yellow 1 touches a subset of two squares. The third mine must be in the pink square."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/basic-logic-8.png",
    title:
      "The pink 4 touches five unopened squares. One is flagged so there are three mines left in four squares. The yellow 2 touches a flag so there is one mine left in two yellow squares. The two pink squares must be mines."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/combined-logic-1.png",
    title: "Find the two mines and use 1-1-X to open the third square then open the pink squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/combined-logic-2.png",
    title: "Find the three mines and use 1-1-X to open the third square then open the pink squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/combined-logic-3.png",
    title: "Find the mine and use 1-1-X to open the third square then open the pink squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/combined-logic-4.png",
    title:
      "Find three mines. The 4 effectively becomes 1 and the 2 effectively becomes 1. Use 1-1-X to open the third square then open the pink squares."
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/reduce-121-1.png",
    title: "1-2-1"
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/reduce-121-2.png",
    title: "1-2-1"
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/reduce-1221-1.png",
    title: "1-2-2-1"
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/reduce-1221-2.png",
    title: "1-2-2-1"
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/reduce-combo-advanced-1.png",
    title: "1-2-1"
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/reduce-combo-advanced-2.png",
    title: "1-2-2-1"
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/reduce-combo-advanced-3.png",
    title: "1-2-2-1 and 1-2-1"
  },
  {
    width: 200,
    height: 200,
    src: "/ms/patterns/reduce-combo-advanced-4.png",
    title: "1-2-1 and 1-2-1"
  }
];
const data: Record<SourceType, ImageProps[]> = {
  part1: images.slice(0, 2),
  part2: images.slice(2, 8),
  part3: images.slice(8, 10),
  part4: images.slice(10, 12),
  part5: images.slice(12, 16),
  part6: images.slice(16, 20),
  part7: images.slice(20, 24),
  part8: images.slice(24, 28),
  part9: images.slice(28, 32)
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
