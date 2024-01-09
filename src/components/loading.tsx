import Image from "next/image";
import React from "react";

// type Props = {};

const Loading = () => {
  return (
    <div className="p-4">
      <Image
        alt="loading icon"
        className="ani-rolling"
        src={"/win/hourglass.png"}
        width={20}
        height={28}
      />
    </div>
  );
};

export default Loading;
