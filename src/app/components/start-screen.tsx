import React from "react";
import WinLogo from "../assets/win.logo.svg";
import Loading from "./loading";
// type Props = {};

const StartScreen = () => {
  return (
    <div className="dvh-screen w-screen bg-teal-500 flex flex-col items-center justify-center">
      <div className="w-40 h-32">
        <WinLogo className="w-full h-full" />
      </div>
      <Loading />
    </div>
  );
};

export default StartScreen;
