import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useTimer } from "../hooks/useTimer";
import { useEffect } from "react";
import CounterView from "./counter-view";
import { addRecord, resetElapsedTime, setElapsedTime } from "@/redux/slice/user.data";
import { DeepWriteable } from "@/types";
import { Minesweeper } from "minesweeper-redux";
// import React, { useEffect } from "react";

const Timer = () => {
  const dispatch = useAppDispatch();
  const { elapsedTime, stop, start, pause } = useTimer(0, false);
  const minesweeper = useAppSelector((store) => store.minesweeper);
  useEffect(() => {
    const status = minesweeper.status;
    switch (status) {
      case "running":
        start();
        break;
      case "loss":
      case "win":
        {
          pause();
          dispatch(setElapsedTime(elapsedTime));
          dispatch(addRecord(minesweeper as DeepWriteable<Minesweeper>));
        }
        break;
      case "waiting":
      case "ready":
        {
          stop();
          dispatch(resetElapsedTime());
        }
        break;

      default:
        break;
    }
  }, [minesweeper.status, elapsedTime]);
  return <CounterView count={elapsedTime} />;
};

export default Timer;
