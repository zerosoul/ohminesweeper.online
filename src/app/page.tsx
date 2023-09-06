// import Image from 'next/image'
"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { difficulties, startGame } from "minesweeper-redux";
import Board from "./components/board";
import Timer from "./components/timer";
import { useRef } from "react";
import Rank from "./components/rank";
import { difficulty } from "@/config";
import Image from "next/image";

export default function Home() {
  console.log("diff", difficulties);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const data = useAppSelector((store) => store.minesweeper);
  const dispatch = useAppDispatch();
  const handleStart = () => {
    console.log("start");
    // easy hard medium
    dispatch(
      startGame({
        difficulty: difficulty.expert,
        randSeed: Math.random()
      })
    );
  };
  const handleFullscreen = () => {
    if (boardRef && boardRef.current) {
      boardRef.current.requestFullscreen();
    }
  };
  return (
    <main
      ref={boardRef}
      className="flex flex-col min-h-screen w-screen justify-center items-center [&_.fsh]:fullscreen:hidden"
    >
      <div className="window">
        <section className="title-bar fsh">
          <div className="title-bar-text flex gap-1 !items-center">
            <div className="w-4 h-4 bg-[url(/ms/bomb.svg)] bg-contain"></div> Mine Sweeper Online!
          </div>
          <div className="title-bar-controls">
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
                />
              </button>
              <Timer />
            </div>
          </div>
          <Board startNewGame={handleStart} />
        </div>
        <div className="status-bar fsh">
          <p className="status-bar-field">Level: {data.difficulty.height}</p>
          <p className="status-bar-field">
            Flag: {data.numFlagged}/{data.remainingFlags}
          </p>
          <p className="status-bar-field">Best: 12s</p>
          <p className="status-bar-field">Elapsed time: {data.elapsedTime}</p>
          <p className="status-bar-field">Status: {data.status}</p>
        </div>
      </div>
      <Rank />
      {/* <button onClick={handleStart}>start</button> */}
    </main>
  );
}
