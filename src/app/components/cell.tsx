import { MouseEventHandler } from "react";
import { Cell as ICell } from "minesweeper-redux";
import clsx from "clsx";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCellActive } from "@/redux/slice/user.data";

export interface CellProps {
  cell: ICell;
  leftClick: MouseEventHandler;
  rightClick: MouseEventHandler;
}

function Cell({ cell, leftClick, rightClick }: CellProps) {
  const dispatch = useAppDispatch();
  const size = useAppSelector((store) => store.userData.cellSize);
  const handleMouseDown = () => {
    console.log("cell mouse down");
    dispatch(updateCellActive(true));
  };

  const cellContent = (cell: ICell) => {
    switch (cell.status) {
      case "hidden":
        return (
          <div
            onMouseDown={handleMouseDown}
            role="button"
            aria-label="cell"
            className="cell w-full h-full bg-[url(/ms/cell.default.svg)] active:bg-[url(/ms/cell.click.svg)] hover:invert-[0.15] bg-contain"
          ></div>
        );
      case "flagged":
        return <Image alt="flag" src={"/ms/cell.flag.svg"} fill priority />;
      case "revealed":
        if (cell.mineCount === -1) {
          return (
            <div className={`w-full h-full bg-[url(/ms/cell.clicked.svg)] bg-contain p-1`}>
              <Image
                className="ml-[1px] mt-[1px] scale-[70%]"
                alt="bomb"
                src={"/ms/bomb.svg"}
                fill
                priority
              />
            </div>
          );
        }
        return cell.mineCount > 0 ? (
          <div className={`w-full h-full bg-[url(/ms/cell.clicked.svg)] bg-contain`}>
            <Image
              // className="p-0.5"
              alt="mine count"
              src={`/ms/count/${cell.mineCount}.svg`}
              fill
              priority
            />
          </div>
        ) : (
          <Image alt="flag" src={"/ms/cell.clicked.svg"} fill priority />
        );
      case "detonated":
        return (
          <div className={`w-full h-full bg-[url(/ms/cell.click.svg)] pl-0.5 pt-0.5`}>
            <div className="bg-red-600 relative w-full h-full">
              <Image alt="bomb" src={"/ms/bomb.svg"} fill priority className="scale-90" />
            </div>
          </div>
        );
      default:
        return <Image alt="default cell" priority src={"./cell.default.svg"} fill />;
    }
  };
  const cursorPointer = cell.status == "hidden" || cell.status == "flagged";
  return (
    <div
      className={clsx(
        "flex justify-center items-center relative",
        cursorPointer && "cursor-pointer"
      )}
      style={{ width: size, height: size }}
      onClick={leftClick}
      onContextMenu={rightClick}
    >
      {cellContent(cell)}
    </div>
  );
}

export default Cell;
