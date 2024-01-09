import React from "react";
import WinLogo from "../assets/win.logo.svg";
import Loading from "./loading";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
type Props = {
  progress: number;
  rehydrated: boolean;
};

const StartScreen = ({ progress, rehydrated }: Props) => {
  const ui = useAppSelector((store) => store.userData.ui);

  return (
    <div className="dvh-screen w-screen bg-teal-500 flex flex-col items-center gap-2 justify-center">
      {rehydrated ? (
        <>
          {ui == "xp" ? (
            <Image src={"/win/xp.logo.png"} width={64} height={64} alt="window xp logo" />
          ) : (
            <div className="w-40 h-32">
              <WinLogo className="w-full h-full" />{" "}
            </div>
          )}
          <progress max="100" value={progress}></progress>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default StartScreen;
