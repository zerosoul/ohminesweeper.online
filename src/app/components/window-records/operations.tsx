import React from "react";
import WindowTitleBar from "../window-title-bar";
import { useAppDispatch } from "@/redux/hooks";
import { removeRecord } from "@/redux/slice/user.data";
// import {  loadGame, startGame } from "@minesweeper";

type Props = {
  handleClose: () => void;
  timestamp: number;
};

const Operations = ({ handleClose, timestamp }: Props) => {
  const dispatch = useAppDispatch();
  // const minesweeper = useAppSelector((store) => store.minesweeper);
  const handleRemove = () => {
    console.log(timestamp);
    dispatch(removeRecord(timestamp));
    handleClose();
  };
  const closeTheWindow = () => {
    handleClose();
  };
  const handleReplay = () => {
    // const wtf = getLoadableGameState(minesweeper);
    // loadGame({ gameState: wtf });
    // startGame({
    //   difficulty: wtf.difficulty,
    //   randSeed: wtf.randSeed
    // });
    // handleClose();
    // console.log({ wtf });
  };

  return (
    <div className="window absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <WindowTitleBar title="what to do?">
        <button aria-label="Close" onClick={closeTheWindow} title="Close the window"></button>
      </WindowTitleBar>
      <div className="window-body">
        <ul className="flex gap-2 m-4">
          <li>
            <button onClick={handleRemove} className="text-red-600">
              Delete
            </button>
          </li>
          <li>
            <button disabled onClick={handleReplay}>
              Replay
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Operations;
