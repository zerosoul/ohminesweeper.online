// import Image from 'next/image'
"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { difficulties, startGame } from "minesweeper-redux";
import Board from "./components/board";
import Timer from "./components/timer";
import { useEffect, useRef, useState } from "react";
import Rank from "./components/rank";
import { difficulty } from "@/config";
import Image from "next/image";
import DarkMode from "./components/button-darkmode";
import Language from "./components/select-lang";
import { Level } from "@/types";

export default function Home() {
  console.log("diff", difficulties);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [level, setLevel] = useState<Level>("beginner");
  const data = useAppSelector((store) => store.minesweeper);
  const dispatch = useAppDispatch();
  const handleStart = () => {
    console.log("start");
    if (data.timerStopper) {
      data.timerStopper();
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
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("level", e.target.value);

    setLevel(e.target.value as Level);
  };
  useEffect(() => {
    handleStart();
  }, [level]);

  return (
    <main
      ref={boardRef}
      className="flex flex-col transition-colors min-h-screen w-screen justify-center items-center [&_.fsh]:fullscreen:hidden dark:bg-gray-950"
    >
      <div className="window">
        <section className="title-bar fsh">
          <div className="title-bar-text flex gap-1 !items-center">
            <div className="w-4 h-4 bg-[url(/ms/bomb.svg)] bg-contain"></div> Mine Sweeper Online!
          </div>
          <div className="title-bar-controls flex gap-1">
            <button aria-label="Help" title="Press F1 for help"></button>
            <button aria-label="Maximize" onClick={handleFullscreen}></button>
          </div>
        </section>
        <div className="window-body">
          <div className="status-bar !mb-4">
            <div className="status-bar-field !p-2 flex justify-between">
              <Timer count={data.remainingFlags} />
              <button onClick={handleStart} className="!w-8 min-w-[unset] h-8 !p-0">
                <Image
                  width={30}
                  height={30}
                  alt="game status emoji"
                  src={
                    data.status == "loss" ? "/ms/emoji.game.over.png" : "/ms/emoji.game.start.png"
                  }
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
          <p className="status-bar-field">
            Flag: {data.numFlagged}/{data.remainingFlags}
          </p>
          <p className="status-bar-field">Status: {data.status}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 m-2 fsh">
        <select value={level} className="capitalize" onChange={handleLevelChange}>
          {Object.keys(difficulty).map((key) => (
            <option key={key} value={key} selected={level == key}>
              {key}
            </option>
          ))}
        </select>
        <DarkMode />
        <button>Screen Shoot</button>
        <Language />
      </div>
      {/* <Rank /> */}
      {/* <button onClick={handleStart}>start</button> */}
    </main>
  );
}
