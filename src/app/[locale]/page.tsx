// import Image from 'next/image'
"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { startGame } from "minesweeper-redux";
import Board from "../components/board";
import Timer from "../components/counter";
import { useEffect, useRef } from "react";
// import Rank from "./components/rank";
import { difficulty } from "@/config";
// import Language from "./components/select-lang";
import { shallowEqual } from "react-redux";
import PWAUpgradeChecker from "../components/pwa-upgrade-checker";
import clsx from "clsx";
import { resetElapsedTime, tickElapsedTime, updateMini } from "@/redux/slice/user.data";
import TaskBar from "../components/task-bar";
import StartFaceButton from "../components/start-face-button";
import WindowTitleBar from "../components/window-title-bar";
import { useParams } from "next/navigation";
import { LocaleTypes } from "@/i18n/settings";
import { useTranslation } from "@/i18n/client";

export default function Home() {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, "trans");
  const boardRef = useRef<HTMLDivElement | null>(null);
  const level = useAppSelector((store) => store.userData.level);
  const minimized = useAppSelector((store) => store.userData.minimized);
  const status = useAppSelector((store) => store.minesweeper.status);
  const timerStopper = useAppSelector((store) => store.minesweeper.timerStopper, shallowEqual);
  const dispatch = useAppDispatch();
  const handleStart = () => {
    console.log("start");
    if (timerStopper) {
      timerStopper();
      dispatch(resetElapsedTime());
    }
    // easy hard medium
    dispatch(
      startGame({
        difficulty: difficulty[level],
        randSeed: Math.random(),
        timerCallback: handleTimer
      })
    );
  };
  const handleMini = () => {
    dispatch(updateMini(true));
  };
  const handleTimer = () => {
    dispatch(tickElapsedTime());
  };
  const handleFullscreen = () => {
    if (boardRef && boardRef.current) {
      boardRef.current.requestFullscreen();
    }
  };

  useEffect(() => {
    handleStart();
  }, [level]);
  return (
    <>
      <main
        ref={boardRef}
        className="flex flex-col transition-colors flex-1 w-screen justify-center items-center [&_.fsh]:fullscreen:hidden"
      >
        <div
          id="SCREEN_SHOOT_AREA"
          className={clsx("window transition-transform", minimized && "hidden")}
        >
          <WindowTitleBar>
            <>
              <button aria-label="Minimize" onClick={handleMini} title="Hide the window"></button>
              <button
                aria-label="Help"
                onClick={() => {
                  const btn = document.querySelector("#HELP_TASK_BUTTON") as HTMLButtonElement;
                  if (btn) {
                    btn.click();
                  }
                }}
                title="Press F1 for help"
              ></button>
              <button aria-label="Maximize" onClick={handleFullscreen}></button>
            </>
          </WindowTitleBar>
          <div className="window-body">
            <div className="status-bar !mb-4">
              <div className="status-bar-field !p-2 flex justify-between">
                <Timer type="flag" />
                <StartFaceButton startGame={handleStart} />
                <Timer type="time" />
              </div>
            </div>
            <Board />
          </div>

          <div className="status-bar fsh">
            <p className="status-bar-field capitalize">
              {t("level.title")}: {level}
            </p>
            <p className="status-bar-field capitalize">Status: {status}</p>
          </div>
        </div>
        <TaskBar startGame={handleStart} />
        {/* <Rank /> */}
      </main>
      <PWAUpgradeChecker />
    </>
  );
}
