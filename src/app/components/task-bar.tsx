import React, { LegacyRef, useState } from "react";
import SelectLevel from "./select-level";
import DarkMode from "./button-darkmode";
import ScreenShoot from "./screenshoot";
import SelectZoom from "./select-cellsize";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { updateMini } from "@/redux/slice/user.data";
import { useClickAway } from "@uidotdev/usehooks";
import Help from "./help";

type Props = {
  startGame: () => void;
};

const TaskBar = ({ startGame }: Props) => {
  const [settingVisible, setSettingVisible] = useState(false);
  const dispatch = useAppDispatch();
  const minimized = useAppSelector((store) => store.userData.minimized);
  const ref = useClickAway(() => {
    // if (settingVisible) {
    setSettingVisible(false);
    // }
  });
  const toggleSetting = () => {
    setSettingVisible((prev) => !prev);
  };
  const handleMini = () => {
    dispatch(updateMini(!minimized));
  };
  return (
    <div className="window fixed bottom-0 left-0 w-full flex items-center justify-between gap-1 fsh !px-2 !py-1">
      <div className="flex items-center gap-1">
        <button onClick={startGame} className="px-2 min-w-[unset]">
          <Image alt="start button" src={"/start-button.png"} width={45} height={14} />
        </button>
        <button
          onClick={handleMini}
          className={clsx(
            "px-3 flex items-center justify-center gap-1 !min-w-[unset]",
            !minimized && "active"
          )}
        >
          <Image alt="mine icon" src={"/icon.png"} width={14} height={14} />
          <span className="hidden md:inline-block">Mine Sweeper</span>
        </button>
      </div>
      {/* <Language /> */}
      <div className="flex items-center gap-2">
        <ScreenShoot />

        <div className="relative flex">
          <button
            onClick={toggleSetting}
            className={clsx("min-w-[unset] !p-1", settingVisible && "active")}
          >
            <Image alt="setting button" src={"/setting.png"} width={22} height={22} />
          </button>
          <aside
            ref={ref as LegacyRef<HTMLDivElement>}
            className={clsx(
              "window flex-col gap-4 !p-5 absolute right-0 -top-4 -translate-y-full",
              settingVisible ? "flex" : "hidden"
            )}
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs">Level:</label>
              <SelectLevel />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs">Size:</label>
              <SelectZoom />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs">Theme:</label>
              <DarkMode />
            </div>
          </aside>
        </div>
        <Help />
        <div className="w-[1px] h-4 bg-gray-400 shadow shadow-gray-300"></div>
        <div className="status-bar">
          <footer className="status-bar-field flex gap-1 !px-2">
            <span className="hidden md:inline">Made by </span>
            <a
              href="http://yangerxiao.com"
              className="text-blue-500 dark:text-blue-700 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tristan
            </a>{" "}
            © {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TaskBar;
