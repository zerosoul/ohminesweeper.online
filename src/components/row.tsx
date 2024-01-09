// import React, { memo } from "react";
import { Cell as ICell } from "@minesweeper";
import Cell from "./cell";
import { CellMouseEvent } from "@/types";
export interface RowProps {
  rowIndex: number;
  row: readonly ICell[];
  leftClick: CellMouseEvent;
  rightClick: CellMouseEvent;
}

const Row = ({ row, leftClick, rightClick, rowIndex }: RowProps) => {
  return (
    <div className="flex">
      {row.map((cell, index) => (
        <Cell
          coordinate={{ x: index, y: rowIndex }}
          key={`cell-${rowIndex}-${index}`}
          cell={cell}
          leftClick={(e) => leftClick(e, { x: index, y: rowIndex })}
          rightClick={(e) => rightClick(e, { x: index, y: rowIndex })}
        />
      ))}
    </div>
  );
};

export default Row;

// export default memo(Row, (prev, next) => {
//   return JSON.stringify(prev.row) == JSON.stringify(next.row);
// });
