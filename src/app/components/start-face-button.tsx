import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addRecord, updateCellActive } from "@/redux/slice/user.data";
import clsx from "clsx";
import { GameStatus } from "minesweeper-redux";
import React, { useEffect } from "react";

type Props = {
  startGame: () => void;
};
const StartFaceButton = ({ startGame }: Props) => {
  const dispatch = useAppDispatch();
  // const elapsedTime = useAppSelector((store) => store.minesweeper.elapsedTime);
  const grid = useAppSelector((store) => store.minesweeper.grid);
  const numCells = useAppSelector((store) => store.minesweeper.numCells);
  const status = useAppSelector((store) => store.minesweeper.status);
  const cellActive = useAppSelector((store) => store.userData.cellActive);
  const positionMap: Record<GameStatus, string> = {
    loss: "-45px -41px",
    win: "4px -42px",
    running: "4px 4px",
    waiting: "-45px 4px",
    ready: "4px 4px"
  };
  useEffect(() => {
    const handleMouseUp = () => {
      dispatch(updateCellActive(false));
    };
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, []);
  useEffect(() => {
    switch (status) {
      case "loss":
      case "win":
        {
          dispatch(
            addRecord({
              status,
              numCells,
              grid
            })
          );
        }

        break;

      default:
        break;
    }
  }, [status, numCells, grid]);

  return (
    <button
      onClick={startGame}
      className={clsx(
        "!w-12 min-w-[unset] h-12 !p-0 flex items-center justify-center",
        "bg-[url(/ms/result.face.png)] bg-no-repeat",
        "bg-[length:88px_85px]"
        // cellActive ? "" : "transition-all duration-0 md:duration-75"
      )}
      style={{
        backgroundPosition: cellActive ? positionMap.waiting : positionMap[status]
      }}
    ></button>
  );
};

export default StartFaceButton;
