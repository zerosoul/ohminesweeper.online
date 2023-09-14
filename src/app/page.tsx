// import Image from 'next/image'
"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Board from "./components/board";
import Timer from "./components/timer";
import { useRef } from "react";
// import Rank from "./components/rank";
import { difficulty } from "@/config";
// import Language from "./components/select-lang";
// import { shallowEqual } from "react-redux";
import PWAUpgradeChecker from "./components/pwa-upgrade-checker";
import clsx from "clsx";
// import { resetElapsedTime, tickElapsedTime, toggleMini } from "@/redux/slice/user.data";
import TaskBar from "./components/task-bar";
import StartFaceButton from "./components/start-face-button";
import WindowTitleBar from "./components/window-title-bar";
import usePreload from "./hooks/usePreload";
import StartScreen from "./components/start-screen";
import RecordsWindow from "./components/window-records";
import CounterView from "./components/counter-view";
import { toggleMini } from "@/redux/slice/user.data";
import { shallowEqual } from "react-redux";

export default function Home() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const level = useAppSelector((store) => store.userData.level, shallowEqual);
  const minimized = useAppSelector((store) => store.userData.minimized, shallowEqual);
  const status = useAppSelector((store) => store.minesweeper.status, shallowEqual);
  const remainingFlags = useAppSelector((store) => store.minesweeper.remainingFlags, shallowEqual);
  // const timerStopper = useAppSelector((store) => store.minesweeper.timerStopper, shallowEqual);
  const preloaded = usePreload();
  const dispatch = useAppDispatch();
  const handleMini = () => {
    dispatch(toggleMini());
  };
  const handleFullscreen = () => {
    if (boardRef && boardRef.current) {
      boardRef.current.requestFullscreen();
    }
  };
  if (!preloaded) return <StartScreen />;
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
                <CounterView
                  count={status == "ready" ? difficulty[level].numMines : remainingFlags}
                />
                <StartFaceButton />
                <Timer />
              </div>
            </div>
            <Board />
          </div>

          <div className="status-bar fsh">
            <p className="status-bar-field capitalize">Level: {level}</p>
            <p className="status-bar-field capitalize">Status: {status}</p>
          </div>
        </div>
        <TaskBar />
        {/* <Rank /> */}
      </main>
      <PWAUpgradeChecker />
      <RecordsWindow />
    </>
  );
}
