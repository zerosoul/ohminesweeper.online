import { CellSizes } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCellSize } from "@/redux/slice/user.data";
import React from "react";
import Select from "./select";

const SelectZoom = () => {
  const cellSize = useAppSelector((store) => store.userData.cellSize);
  const dispatch = useAppDispatch();
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("cell size", e.target.value);

    dispatch(updateCellSize(+e.target.value));
  };
  return (
    <Select
      disabled={status == "running"}
      value={cellSize}
      onChange={handleSizeChange}
      list={CellSizes.map((size) => {
        return { value: `${size.value}`, name: `${size.name}` };
      })}
    />
  );
};

export default SelectZoom;
