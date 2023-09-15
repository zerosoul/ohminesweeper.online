import { MouseEventHandler, MouseEvent, TouchEvent, useEffect, useState } from "react";
import {
  Coordinate,
  Cell as ICell,
  findAdjacentNoFlaggedCoordsByMarkedMineNumber,
  revealCell
  // revealCell
} from "@minesweeper";
import clsx from "clsx";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCellActive } from "@/redux/slice/user.data";

export interface CellProps {
  cell: ICell;
  leftClick: MouseEventHandler;
  rightClick: MouseEventHandler;
  coordinate: Coordinate;
}

function Cell({ coordinate, cell, leftClick, rightClick }: CellProps) {
  let touchData = {
    startTime: 0,
    endTime: 0,
    duration: 600,
    isMoving: false
  };
  const dispatch = useAppDispatch();
  const [lastTick, setLastTick] = useState(false);
  const size = useAppSelector((store) => store.userData.cellSize);
  const enableSound = useAppSelector((store) => store.userData.sound);
  const status = useAppSelector((store) => store.minesweeper.status);
  const numMines = useAppSelector((store) => store.minesweeper.difficulty.numMines);
  const grid = useAppSelector((store) => store.minesweeper.grid);
  useEffect(() => {
    if (status !== "running") return;
    let leftHiddenNum = 0;
    let onlyZero = true;
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.status == "flagged" || cell.status == "hidden") {
          leftHiddenNum++;
        }
        if (cell.status == "hidden" && cell.mineCount > 0) {
          onlyZero = false;
        }
      });
    });
    const onlyLeftOne = leftHiddenNum - numMines == 1;
    const isLastTick = onlyLeftOne || onlyZero;
    console.log("isLastTick", onlyLeftOne, onlyZero);

    setLastTick(isLastTick);
  }, [grid, numMines, status]);
  const handleDoubleClick = () => {
    // const aCells = findAdjacentCells(grid, coordinate, true);
    const coords = findAdjacentNoFlaggedCoordsByMarkedMineNumber(grid, coordinate);
    if (coords.length == 0) return;
    coords.forEach((coord) => {
      dispatch(
        revealCell({
          coordinate: coord
        })
      );
    });
    console.log({ coords });
  };
  const timeDiff = () => {
    let timeDiff = new Date().getTime() - touchData.startTime;
    let isSend = timeDiff >= touchData.duration;
    return isSend;
  };
  const handleTouchStart = (evt: TouchEvent<HTMLDivElement>) => {
    console.log("cell touch start");
    touchData.startTime = new Date().getTime();
    evt.preventDefault();
    dispatch(updateCellActive(true));
  };
  const handleTouchMove = () => {
    console.log("cell touch move");
    if (touchData.isMoving) return;
    touchData.isMoving = true;
    if (!timeDiff()) {
      touchData.startTime = 0;
    }
  };
  const handleTouchEnd = (evt: TouchEvent<HTMLDivElement>) => {
    console.log("cell touch end");
    if (touchData.startTime && timeDiff()) {
      rightClick(evt as any);
    }
    touchData.isMoving = false;
  };
  const handleMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    console.log("cell mouse down");
    evt.preventDefault();
    dispatch(updateCellActive(true));
  };

  const cellContent = (cell: ICell) => {
    switch (cell.status) {
      case "hidden":
        return (
          <div
            onTouchCancel={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onMouseDown={handleMouseDown}
            role="button"
            aria-label="cell"
            className="cell w-full h-full bg-[url(/ms/cell.default.svg)] active:bg-[url(/ms/cell.click.svg)] hover:invert-[0.15] bg-contain"
          ></div>
        );
      case "flagged":
        return (
          <Image
            role="button"
            onTouchCancel={handleTouchEnd}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchStart={handleTouchStart}
            alt="flag"
            src={"/ms/cell.flag.svg"}
            fill
            priority
          />
        );
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
  const isBomb = cell.mineCount === -1;
  const sound =
    cell.status == "hidden"
      ? status == "ready"
        ? "start"
        : lastTick
        ? isBomb
          ? "loss"
          : "win"
        : isBomb
        ? "loss"
        : "tick"
      : "";
  return (
    <div
      data-sound={enableSound ? sound : ""}
      className={clsx(
        "flex justify-center items-center relative",
        cursorPointer && "cursor-pointer"
      )}
      style={{ width: size, height: size }}
      onClick={leftClick}
      onContextMenu={rightClick}
      onDoubleClick={cell.status == "revealed" ? handleDoubleClick : undefined}
    >
      {cellContent(cell)}
    </div>
  );
}

export default Cell;
// export default memo(Cell, (prev, next) => {
//   return prev.cell.status == next.cell.status;
// });
