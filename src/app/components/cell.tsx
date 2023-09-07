import { MouseEventHandler } from "react";
import { Cell as ICell } from "minesweeper-redux";
import clsx from "clsx";
import Image from "next/image";

export interface CellProps {
  cell: ICell;
  leftClick: MouseEventHandler;
  rightClick: MouseEventHandler;
}

function Cell({ cell, leftClick, rightClick }: CellProps) {
  const cellContent = (cell: ICell) => {
    switch (cell.status) {
      case "hidden":
        return (
          <div
            role="button"
            aria-label="cell"
            className="w-full h-full bg-[url(/ms/cell.default.svg)] active:bg-[url(/ms/cell.click.svg)] hover:invert-[0.15] bg-contain transition-all"
          ></div>
        );
      case "flagged":
        return <Image alt="flag" src={"/ms/cell.flag.svg"} width={24} height={24} priority />;
      case "revealed":
        if (cell.mineCount === -1) {
          return (
            <div className={`w-full h-full bg-[url(/ms/cell.clicked.svg)] p-1`}>
              <Image
                className="ml-[1px] mt-[1px]"
                alt="bomb"
                src={"/ms/bomb.svg"}
                width={24}
                height={24}
                priority
              />
            </div>
          );
        }
        return cell.mineCount > 0 ? (
          <div className={`w-full h-full bg-[url(/ms/cell.clicked.svg)]`}>
            <Image
              className="ml-0.5 mt-0.5 w-[calc(100%_-_2px)] h-auto"
              alt="mine count"
              src={`/ms/count/${cell.mineCount}.svg`}
              width={24}
              height={24}
              priority
            />
          </div>
        ) : (
          <Image alt="flag" src={"/ms/cell.clicked.svg"} width={24} height={24} priority />
        );
      case "detonated":
        return (
          <div className={`w-full h-full bg-[url(/ms/cell.click.svg)] pl-0.5 pt-0.5`}>
            <div className="bg-red-600">
              <Image alt="bomb" src={"/ms/bomb.svg"} width={24} height={24} priority />
            </div>
          </div>
        );
      default:
        return (
          <Image alt="default cell" priority src={"./cell.default.svg"} width={24} height={24} />
        );
    }
  };
  const cursorPointer = cell.status == "hidden" || cell.status == "flagged";
  return (
    <div
      className={clsx(
        "w-6 h-6 flex justify-center items-center",
        cursorPointer && "cursor-pointer"
      )}
      onClick={leftClick}
      onContextMenu={rightClick}
    >
      {cellContent(cell)}
    </div>
  );
}

export default Cell;
