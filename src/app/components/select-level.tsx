import { difficulty } from "@/config";
import { Level } from "@/types";
import { GameStatus } from "minesweeper-redux";
import React from "react";

type Props = {
  status: GameStatus;
  level: Level;
  updateLevel: (level: Level) => void;
};

const SelectLevel = ({ level, status, updateLevel }: Props) => {
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("level", e.target.value);

    updateLevel(e.target.value as Level);
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
