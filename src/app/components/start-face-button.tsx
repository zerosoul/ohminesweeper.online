import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addRecord, updateCellActive } from "@/redux/slice/user.data";
import { DeepWriteable } from "@/types";
import clsx from "clsx";
import { GameStatus, Minesweeper } from "minesweeper-redux";
import React, { useEffect } from "react";

type Props = {
  startGame: () => void;
};
const StartFaceButton = ({ startGame }: Props) => {
  const dispatch = useAppDispatch();
  // const elapsedTime = useAppSelector((store) => store.minesweeper.elapsedTime);
  const minesweeper = useAppSelector((store) => store.minesweeper);
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
          // eslint-disable-next-line no-unused-vars
          const { timerStopper, timerCallback, elapsedTime, ...rest } =
            minesweeper as DeepWriteable<Minesweeper>;
          dispatch(addRecord(rest));
        }

        break;

      default:
        break;
    }
  }, [status, minesweeper]);

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
