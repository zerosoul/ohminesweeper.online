// import Image from 'next/image'
"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { difficulties, startGame } from "minesweeper-redux";
import Board from "./components/board";
import Timer from "./components/timer";
import { useEffect, useRef, useState } from "react";
// import Rank from "./components/rank";
import { difficulty } from "@/config";
import Image from "next/image";
import DarkMode from "./components/button-darkmode";
import Language from "./components/select-lang";
import { Level } from "@/types";
import ScreenShoot from "./components/screenshoot";
import SelectLevel from "./components/select-level";
import { shallowEqual } from "react-redux";

export default function Home() {
  console.log("diff", difficulties);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [level, setLevel] = useState<Level>("beginner");
  const status = useAppSelector((store) => store.minesweeper.status);
  const remainingFlags = useAppSelector((store) => store.minesweeper.remainingFlags, shallowEqual);
  const timerStopper = useAppSelector((store) => store.minesweeper.timerStopper, shallowEqual);
  const dispatch = useAppDispatch();
  const handleStart = () => {
    console.log("start");
    if (timerStopper) {
      timerStopper();
      setSeconds(0);
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
  const handleTimer = () => {
    setSeconds((prev) => prev + 1);
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
    <main
      ref={boardRef}
      className="flex flex-col transition-colors flex-1 w-screen justify-center items-center [&_.fsh]:fullscreen:hidden"
    >
      <div id="SCREEN_SHOOT_AREA" className="window">
        <section className="title-bar cursor-not-allowed fsh">
          <div className="title-bar-text flex gap-2 !items-center">
            <div className="w-3.5 h-3.5 bg-[url(/icon.png)] bg-contain"></div> Mine Sweeper Online!
          </div>
          <div className="title-bar-controls flex gap-1">
            <button aria-label="Help" title="Press F1 for help"></button>
            <button aria-label="Maximize" onClick={handleFullscreen}></button>
          </div>
        </section>
        <div className="window-body">
          <div className="status-bar !mb-4">
            <div className="status-bar-field !p-2 flex justify-between">
              <Timer count={remainingFlags} />
              <button
                onClick={handleStart}
                className="!w-10 min-w-[unset] h-10 !p-0 flex items-center justify-center"
              >
                <Image
                  width={36}
                  height={36}
                  alt="game status emoji"
                  src={status == "loss" ? "/ms/emoji.game.over.png" : "/ms/emoji.game.start.png"}
                  priority
                />
              </button>
              <Timer count={seconds} />
            </div>
          </div>
          <Board startNewGame={handleStart} />
        </div>

        <div className="status-bar fsh">
          <p className="status-bar-field capitalize">Level: {level}</p>
          <p className="status-bar-field capitalize">Status: {status}</p>
        </div>
      </div>
      <div className="window flex items-center gap-1 m-2 mt-28 fsh !px-2 !py-1">
        <SelectLevel level={level} status={status} updateLevel={setLevel} />
        <DarkMode />
        <ScreenShoot />
        <Language />
      </div>
      {/* <Rank /> */}
      {/* <button onClick={handleStart}>start</button> */}
    </main>
  );
}
