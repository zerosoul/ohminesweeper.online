import Image from "next/image";
import React from "react";

export type ImageProps = {
  src: string;
  title: string;
  width: number;
  height: number;
};

const ImageWithTitle = ({ src, title, width, height }: ImageProps) => {
  return (
    <div className="flex flex-col gap-2 items-center justify-between">
      <Image
        className="object-contain m-auto"
        alt={title}
        src={src}
        title={title}
        width={width}
        height={height}
      />
      <span className="text-sm text-center" style={{ width: width }}>
        {title}
      </span>
    </div>
  );
};

export default ImageWithTitle;
