import { difficulty } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCellActive } from "@/redux/slice/user.data";
import clsx from "clsx";
import { GameStatus, startGame } from "@minesweeper";
import React, { useEffect, useRef, useState } from "react";
import Confirm from "./confirm";

// type Props = {
//   startGame: () => void;
// };
const StartFaceButton = () => {
  const dispatch = useAppDispatch();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const level = useAppSelector((store) => store.userData.level);
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
    const boardNode = document.querySelector("#SCREEN_SHOOT_AREA");
    if (!boardNode) return;
    boardNode.addEventListener("mouseup", handleMouseUp);
    boardNode.addEventListener("touchend", handleMouseUp);

    return () => {
      if (!boardNode) return;
      boardNode.removeEventListener("mouseup", handleMouseUp);
      boardNode.removeEventListener("touchend", handleMouseUp);
    };
  }, []);
  useEffect(() => {
    if (status == "loss" || status == "win") {
      btnRef.current?.focus();
    }
  }, [status]);

  const toggleConfirmModal = () => {
    setConfirmModal((prev) => !prev);
  };
  const handleClick = () => {
    if (status == "running") {
      toggleConfirmModal();
      return;
    }
    restart();
  };
  const restart = () => {
    dispatch(
      // @ts-ignore
      startGame({
        difficulty: difficulty[level],
        randSeed: Math.random()
      })
    );
  };
  return (
    <>
      {confirmModal && (
        <Confirm
          confirm={restart}
          close={toggleConfirmModal}
          content="are you sure stop and restart?"
        />
      )}
      <button
        // onDoubleClick={handleDobuleClick}
        ref={btnRef}
        onClick={handleClick}
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
    </>
  );
};

export default StartFaceButton;
