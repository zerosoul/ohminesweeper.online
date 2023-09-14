import { difficulty } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCustom, updateLevel } from "@/redux/slice/user.data";
import { Level } from "@/types";
import React, { FormEvent, useState } from "react";
import Select from "./select";
import { Difficulty, startGame } from "minesweeper-redux";

// type Props = {

// };

const SelectLevel = () => {
  const customData = useAppSelector((store) => store.userData.custom);
  const level = useAppSelector((store) => store.userData.level);
  const [custom, setCustom] = useState(level == "custom");
  const status = useAppSelector((store) => store.minesweeper.status);
  const dispatch = useAppDispatch();
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("level", e.target.value);
    const level = e.target.value as Level;
    if (level == "custom") {
      setCustom(true);
    } else {
      dispatch(updateLevel(e.target.value as Level));
    }
  };
  const handleCancelCustom = () => {
    setCustom(false);
  };
  const handleSubmitCustom = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);

    console.log(formData.get("width"), Object.fromEntries(formData.entries()));
    const data = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, Number(v)]));
    dispatch(updateCustom(data as Difficulty));
    // handleCancelCustom();
    if (level == "custom") {
      // 已经是custom
      dispatch(
        startGame({
          difficulty: data as Difficulty,
          randSeed: Math.random()
        })
      );
    } else {
      dispatch(updateLevel("custom"));
    }
  };
  return custom ? (
    <div className="">
      <form action="" className="flex flex-col gap-1 min-w-[120px]" onSubmit={handleSubmitCustom}>
        <div className="flex gap-1 w-full justify-between">
          <label className="capitalize" htmlFor="width">
            width:
          </label>
          <input
            className="!w-12"
            name="width"
            type="number"
            min={1}
            defaultValue={customData.width}
            required
            placeholder="width"
          />
        </div>
        <div className="flex gap-1 w-full justify-between">
          <label className="capitalize" htmlFor="height">
            height:
          </label>
          <input
            className="!w-12"
            name="height"
            type="number"
            min={1}
            required
            defaultValue={customData.height}
            placeholder="height"
          />
        </div>
        <div className="flex gap-1 w-full justify-between">
          <label className="capitalize" htmlFor="numMines">
            mine number:
          </label>
          <input
            className="!w-12"
            name="numMines"
            type="number"
            min={1}
            required
            defaultValue={customData.numMines}
            placeholder="mine number"
          />
        </div>
        <div className="flex gap-1">
          <button className="min-w-[unset] w-14" type="submit">
            ok
          </button>
          <button className="min-w-[unset] w-14" onClick={handleCancelCustom}>
            cancel
          </button>
        </div>
      </form>
    </div>
  ) : (
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
