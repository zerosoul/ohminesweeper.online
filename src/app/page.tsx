// import Image from 'next/image'
"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Board from "./components/board";
import Timer from "./components/timer";
import { useRef } from "react";
// import Image from "next/image";
import { difficulty } from "@/config";
// import Language from "./components/select-lang";
import PWAUpgradeChecker from "./components/pwa-upgrade-checker";
import clsx from "clsx";
import TaskBar from "./components/task-bar";
import StartFaceButton from "./components/start-face-button";
import WindowTitleBar from "./components/window-title-bar";
import usePreload from "./hooks/usePreload";
import StartScreen from "./components/start-screen";
import RecordsWindow from "./components/window-records";
import CounterView from "./components/counter-view";
import { toggleMini, updateArticle } from "@/redux/slice/user.data";
import { shallowEqual } from "react-redux";
import DesktopShortcut from "./components/desktop-shortcut";
import WindowArticle from "./components/window-article";

export default function Home() {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const level = useAppSelector((store) => store.userData.level, shallowEqual);
  const minimized = useAppSelector((store) => store.userData.minimized, shallowEqual);
  const status = useAppSelector((store) => store.minesweeper.status, shallowEqual);
  const remainingFlags = useAppSelector((store) => store.minesweeper.remainingFlags, shallowEqual);
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
        className="pb-12 relative flex flex-col transition-colors flex-1 w-screen justify-start items-start [&_.fsh]:fullscreen:hidden"
      >
        <DesktopShortcut />
        <div
          id="SCREEN_SHOOT_AREA"
          className={clsx(
            "window transition-transform translate-x-0 m-auto",
            minimized && "hidden"
          )}
        >
          <WindowTitleBar>
            <>
              <button aria-label="Minimize" onClick={handleMini} title="Hide the window"></button>
              <button
                aria-label="Help"
                onClick={() => {
                  dispatch(updateArticle("how-to-play"));
                }}
                title="How to play minesweeper"
              ></button>
              <button
                aria-label="Maximize"
                className="!hidden md:!block"
                onClick={handleFullscreen}
              ></button>
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
            <p className="status-bar-field capitalize !pl-2">Level: {level}</p>
            <p className="status-bar-field capitalize !pl-2">Status: {status}</p>
          </div>
        </div>
        <TaskBar />
        {/* <Rank /> */}
      </main>
      <PWAUpgradeChecker />
      <RecordsWindow />
      <WindowArticle />
    </>
  );
}
