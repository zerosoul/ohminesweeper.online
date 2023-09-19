import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUI } from "@/redux/slice/user.data";
// import dynamic, { LoadableComponent } from "next/dynamic";
import React, { ChangeEvent } from "react";
import { UI } from "@/types";
// import * as wtf from "98.css?url";

// type Props = {}

const UISwitch = () => {
  const dispatch = useAppDispatch();
  const ui = useAppSelector((store) => store.userData.ui);

  const handleUpdateUI = (evt: ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value as UI;
    if (ui !== value) {
      dispatch(updateUI(value));
    }
  };

  return (
    <select onChange={handleUpdateUI} value={ui}>
      <option value="xp">Window XP</option>
      <option value="win98">Window 98</option>
    </select>
  );
};

export default UISwitch;
