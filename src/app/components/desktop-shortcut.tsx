import React from "react";
import Image from "next/image";
import { useAppDispatch } from "@/redux/hooks";
import { toggleMini } from "@/redux/slice/user.data";

// type Props = {};

const DesktopShortcut = () => {
  const dispatch = useAppDispatch();
  const handleOpen = () => {
    dispatch(toggleMini());
  };
  return (
    <div
      role="button"
      onClick={handleOpen}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
    >
      <Image
        src="/icons/android-chrome-192x192.png"
        alt="minesweeper"
        width={80}
        height={80}
        className="drop-shadow-lg"
      />
      <span className="text-gray-200 drop-shadow-md capitalize">minesweeper online</span>
    </div>
  );
};

export default DesktopShortcut;
