import { difficulty } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateLevel } from "@/redux/slice/user.data";
import { Level } from "@/types";
import { GameStatus } from "minesweeper-redux";
import React from "react";

type Props = {
  status: GameStatus;
};

const SelectLevel = ({ status }: Props) => {
  const level = useAppSelector((store) => store.userData.level);
  const dispatch = useAppDispatch();
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("level", e.target.value);

    dispatch(updateLevel(e.target.value as Level));
  };
  return (
    <select
      disabled={status == "running"}
      value={level}
      className="capitalize dark:bg-gray-900 dark:text-gray-100"
      onChange={handleLevelChange}
    >
      {Object.keys(difficulty).map((key) => (
        <option key={key} value={key}>
          {`${key}`}
        </option>
      ))}
    </select>
  );
};

export default SelectLevel;
