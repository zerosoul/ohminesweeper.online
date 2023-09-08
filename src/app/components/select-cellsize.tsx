import { CellSizes } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCellSize } from "@/redux/slice/user.data";
import React from "react";

// type Props = {
//   status: GameStatus;
// };
const SelectZoom = () => {
  const cellSize = useAppSelector((store) => store.userData.cellSize);
  const dispatch = useAppDispatch();
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("cell size", e.target.value);

    dispatch(updateCellSize(+e.target.value));
  };
  return (
    <select
      value={cellSize}
      className="capitalize dark:bg-gray-900 dark:text-gray-100"
      onChange={handleSizeChange}
    >
      {CellSizes.map((size) => (
        <option key={size.name} value={size.value}>
          {`${size.name}`}
        </option>
      ))}
    </select>
  );
};

export default SelectZoom;
