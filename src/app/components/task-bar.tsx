import React, { LegacyRef, useState, memo } from "react";
import SelectLevel from "./select-level";
import DarkMode from "./button-darkmode";
import ScreenShoot from "./screenshoot";
import SelectZoom from "./select-cellsize";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { toggleMini, toggleMiniRecords } from "@/redux/slice/user.data";
import { useClickAway } from "@uidotdev/usehooks";
// import Help from "./help";
import SoundSwitch from "./sound-switch";
import { RecordWindowTitle } from "./window-records";
import { difficulty } from "@/config";
import { startGame } from "minesweeper-redux";

// type Props = {
//   startGame: () => void;
// };

const TaskBar = () => {
  const [settingVisible, setSettingVisible] = useState(false);
  const dispatch = useAppDispatch();
  const minimized = useAppSelector((store) => store.userData.minimized);
  const level = useAppSelector((store) => store.userData.level);
  const recordWindowMinimized = useAppSelector((store) => store.userData.recordWindowMinimized);
  const ref = useClickAway(() => {
    // if (settingVisible) {
    setSettingVisible(false);
    // }
  });
  const toggleSetting = () => {
    setSettingVisible((prev) => !prev);
  };
  const handleMini = () => {
    dispatch(toggleMini());
  };
  const handleMiniRecords = () => {
    dispatch(toggleMiniRecords());
  };
  const handleStart = () => {
    dispatch(
      startGame({
        difficulty: difficulty[level],
        randSeed: Math.random()
      })
    );
  };
  return (
    <div className="window fixed bottom-0 left-0 w-full flex items-center justify-between gap-1 fsh !px-2 !py-1">
      <div className="flex items-center gap-1">
        <button onClick={handleStart} className="px-2 min-w-[unset]">
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
        <button
          onClick={handleMiniRecords}
          className={clsx(
            "px-3 flex items-center justify-center gap-1 !min-w-[unset]",
            !recordWindowMinimized && "active"
          )}
        >
          <Image alt="mine icon" src={"/table.png"} width={14} height={14} />
          <span className="hidden md:inline-block">{RecordWindowTitle}</span>
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
              <label className="text-xs font-semibold">Level:</label>
              <SelectLevel />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Size:</label>
              <SelectZoom />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold">Theme:</label>
              <DarkMode />
            </div>
          </aside>
        </div>
        {/* <Help /> */}
        <SoundSwitch />
        <div className="hidden md:block w-[1px] h-4 bg-gray-400 shadow shadow-gray-300"></div>
        <div className="!hidden md:!flex status-bar">
          <footer className="status-bar-field flex gap-1 !px-2">
            <span>Made by </span>
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

export default memo(TaskBar);
