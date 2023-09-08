import { useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { GameStatus } from "minesweeper-redux";
import React from "react";

type Props = {
  startGame: () => void;
};
const StartFaceButton = ({ startGame }: Props) => {
  const status = useAppSelector((store) => store.minesweeper.status);
  const positionMap: Record<GameStatus, string> = {
    loss: "-45px -41px",
    win: "4px -42px",
    running: "4px 4px",
    waiting: "4px 4px",
    ready: "4px 4px"
  };
  return (
    <button
      onClick={startGame}
      className={clsx(
        "!w-12 min-w-[unset] h-12 !p-0 flex items-center justify-center",
        "bg-[url(/ms/result.face.png)] bg-no-repeat",
        "bg-[length:88px_85px] transition-all"
      )}
      style={{
        backgroundPosition: positionMap[status]
      }}
    ></button>
  );
};

export default StartFaceButton;
