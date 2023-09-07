import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Coordinate, revealCell, toggleFlag } from "minesweeper-redux";
import React from "react";
import Row from "./row";
import { shallowEqual } from "react-redux";

type Props = {
  startNewGame: () => void;
};

const Board = ({ startNewGame }: Props) => {
  const grid = useAppSelector((store) => store.minesweeper.grid, shallowEqual);
  const status = useAppSelector((store) => store.minesweeper.status, shallowEqual);
  const dispatch = useAppDispatch();
  const onLeftClick = (e: React.MouseEvent, coordinate: Coordinate) => {
    e.preventDefault();
    dispatch(revealCell({ coordinate }));
  };

  const onRightClick = (e: React.MouseEvent, coordinate: Coordinate) => {
    e.preventDefault();
    dispatch(toggleFlag({ coordinate }));
  };
  const rows = grid.map((row, index) => (
    <Row
      key={`row-${index}`}
      rowIndex={index}
      row={row}
      leftClick={onLeftClick}
      rightClick={onRightClick}
    />
  ));
  return (
    <div className="flex flex-col min-w-[200px] min-h-[200px] border-t border-t-[#818181] border-l border-l-[#818181] border-r border-r-gray-200 border-b border-b-gray-200">
      {status === "waiting" ? (
        <div className="flex justify-center items-center">Loading...</div>
      ) : (
        rows
      )}
    </div>
  );
};

export default Board;
