import React, { LegacyRef, useState, memo } from "react";
import SelectLevel from "../select-level";
import DarkMode from "../button-darkmode";
import ScreenShoot from "../screenshoot";
import SelectZoom from "../select-cellsize";
import SelectUI from "./ui-switch";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { toggleMini, toggleMiniRecords } from "@/redux/slice/user.data";
import { useClickAway } from "@uidotdev/usehooks";
import SoundSwitch from "../sound-switch";
import { RecordWindowTitle } from "../window-records";
import CornerFooter from "./footer";
import StartPanel from "./start-panel";

const TaskBar = () => {
  const [panelVisible, setPanelVisible] = useState(false);
  const [settingVisible, setSettingVisible] = useState(false);
  const dispatch = useAppDispatch();
  const minimized = useAppSelector((store) => store.userData.minimized);
  const ui = useAppSelector((store) => store.userData.ui);
  // const level = useAppSelector((store) => store.userData.level);
  const recordWindowMinimized = useAppSelector((store) => store.userData.recordWindowMinimized);
  const ref = useClickAway(() => {
    // if (settingVisible) {
    setSettingVisible(false);
    // }
  });
  const refPanel = useClickAway(() => {
    // if (settingVisible) {
    setPanelVisible(false);
    // }
  });
  const toggleSetting = () => {
    setSettingVisible((prev) => !prev);
  };
  const togglePanel = () => {
    setPanelVisible((prev) => !prev);
  };
  const handleMini = () => {
    dispatch(toggleMini());
  };
  const handleMiniRecords = () => {
    dispatch(toggleMiniRecords());
  };
  return (
    <div
      className={clsx(
        "z-[999] window fixed bottom-0 left-0 w-full flex items-center justify-between gap-1 fsh !px-2 !py-1",
        ui == "xp" &&
          "!shadow-none !rounded-none !bg-[url(/xp-taskbar.gif)] bg-repeat-x !bg-contain"
      )}
    >
      <div className="flex items-center gap-1">
        <div className="relative">
          <button
            onClick={togglePanel}
            className={clsx("px-2 min-w-[unset]", panelVisible && "active")}
          >
            <Image alt="start button" src={"/start-button.png"} width={45} height={14} />
          </button>
          {panelVisible && (
            <div
              className="absolute left-0-0 -top-4 -translate-y-full"
              ref={refPanel as LegacyRef<HTMLDivElement>}
            >
              <StartPanel closePanel={togglePanel} />
            </div>
          )}
        </div>
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
            id="MS_SETTING_BUTTON"
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
              <label className="text-xs font-semibold">UI:</label>
              <SelectUI />
            </div>
            <div className="flex flex-col gap-1">
              <DarkMode />
            </div>
          </aside>
        </div>
        {/* <Help /> */}
        <SoundSwitch />
        {ui == "win98" && (
          <div className="hidden md:block w-[1px] h-4 bg-gray-400 shadow shadow-gray-300"></div>
        )}
        <div className={"xp" == ui ? "" : "status-bar"}>
          <CornerFooter />
        </div>
      </div>
    </div>
  );
};

export default memo(TaskBar);
