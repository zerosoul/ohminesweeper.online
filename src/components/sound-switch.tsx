import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleSound } from "@/redux/slice/user.data";
import Image from "next/image";
// import { Sound } from "@/types";
// import { MouseEvent, useEffect } from "react";

// type Props = {}

const SoundSwitch = () => {
  const sound = useAppSelector((store) => store.userData.sound);
  const dispatch = useAppDispatch();

  const handleSwitch = () => {
    if (!sound) {
      // try to play
      window.SOUND_TICK.play();
    }
    dispatch(toggleSound());
  };
  return (
    <button onClick={handleSwitch} className={"min-w-[unset] !p-1 relative"}>
      {!sound && (
        <div className="w-full h-0.5 bg-red-600 absolute left-0 top-1/2 -translate-y-1/2 -rotate-45"></div>
      )}
      <Image alt="sound icon" src={"/win/sound.png"} width={22} height={22} />
    </button>
  );
};

export default SoundSwitch;
