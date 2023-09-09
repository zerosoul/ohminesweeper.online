import { difficulty } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateLevel } from "@/redux/slice/user.data";
import { Level } from "@/types";
import React from "react";
import Select from "./select";

// type Props = {

// };

const SelectLevel = () => {
  const level = useAppSelector((store) => store.userData.level);
  const status = useAppSelector((store) => store.minesweeper.status);
  const dispatch = useAppDispatch();
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("level", e.target.value);

    dispatch(updateLevel(e.target.value as Level));
  };
  return (
    <Select
      disabled={status == "running"}
      value={level}
      onChange={handleLevelChange}
      list={Object.keys(difficulty).map((key) => {
        return { value: key, name: `${key}` };
      })}
    />
  );
};

export default SelectLevel;
