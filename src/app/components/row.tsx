import React from "react";
import { Cell as ICell } from "minesweeper-redux";
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
