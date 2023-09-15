import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Coordinate, revealCell, startGame, toggleFlag } from "minesweeper-redux";
import React, { useEffect } from "react";
import Row from "./row";
import { shallowEqual } from "react-redux";
import Loading from "./loading";
import { Sound } from "@/types";
import { difficulty } from "@/config";

// type Props = {
//   startNewGame: () => void;
// };
const Board = () => {
  const grid = useAppSelector((store) => store.minesweeper.grid, shallowEqual);
  const status = useAppSelector((store) => store.minesweeper.status, shallowEqual);
  const level = useAppSelector((store) => store.userData.level, shallowEqual);
  const dispatch = useAppDispatch();
  const onLeftClick = (e: React.MouseEvent, coordinate: Coordinate) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    const _sound = target.dataset.sound;
    console.log("click sound", _sound, target, e.currentTarget);
    if (_sound) {
      switch (_sound as Sound) {
        case "tick":
          window.SOUND_TICK.play();
          break;
        case "loss":
          window.SOUND_LOSE.play();
          break;
        case "start":
          window.SOUND_START.play();
          break;
        case "win":
          window.SOUND_WIN.play();
          break;
        default:
          break;
      }
    }
    dispatch(revealCell({ coordinate }));
  };
  useEffect(() => {
    const d = difficulty[level];
    console.log({ d });

    dispatch(
      startGame({
        difficulty: d,
        randSeed: Math.random()
      })
    );
  }, [level]);

  const onRightClick = (e: React.MouseEvent, coordinate: Coordinate) => {
    e.preventDefault();
    dispatch(toggleFlag({ coordinate }));
    // 震动
    if (navigator.vibrate) {
      navigator.vibrate(150);
    }
  };
  const rows = grid.map((row, index) => (
    <Row
      key={`row-${index}`}
      rowIndex={index}
      row={row}
      leftClick={onLeftClick}
      rightClick={onRightClick}
    />
  ));
  const waiting = status === "waiting";
  const gameOver = status === "loss" || status === "win";
  return (
    <div className="relative flex flex-col justify-center items-center min-w-[200px] min-h-[200px] border-t border-t-[#818181] border-l border-l-[#818181] border-r border-r-gray-200 border-b border-b-gray-200">
      {waiting ? <Loading /> : rows}
      {gameOver && <div className="absolute left-0 top-0 w-full h-full"></div>}
    </div>
  );
};

export default Board;
