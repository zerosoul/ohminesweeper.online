import { MouseEventHandler, memo, useEffect, useState } from "react";
import {
  Coordinate,
  Cell as ICell,
  findAdjacentNoFlaggedCoordsByMarkedMineNumber,
  revealCell
  // revealCell
} from "@minesweeper";
import clsx from "clsx";
import Image from "next/image";
import SVGCellClick from "../assets/cell.click.svg";
import SVGCellClicked from "../assets/cell.clicked.svg";
import SVGCellDefault from "../assets/cell.default.svg";
import SVGCellFlag from "../assets/cell.flag.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCellActive } from "@/redux/slice/user.data";
import { useLongPress } from "@uidotdev/usehooks";
import { isMobile } from "@/utils";

export interface CellProps {
  cell: ICell;
  leftClick: MouseEventHandler;
  rightClick: MouseEventHandler;
  coordinate: Coordinate;
}
let prevClickTime = 0;
function Cell({ coordinate, cell, leftClick, rightClick }: CellProps) {
  const dispatch = useAppDispatch();
  const [lastTick, setLastTick] = useState(false);
  const size = useAppSelector((store) => store.userData.cellSize);
  const enableSound = useAppSelector((store) => store.userData.sound);
  const status = useAppSelector((store) => store.minesweeper.status);
  const numMines = useAppSelector((store) => store.minesweeper.difficulty.numMines);
  const grid = useAppSelector((store) => store.minesweeper.grid);
  const attrs = useLongPress(
    (evt: any) => {
      console.log({ evt });
      // 只在 mobile 响应
      if (!isMobile()) return;
      // 震动 移动设备特有的提示方式
      if (navigator.vibrate) {
        navigator.vibrate(150);
      }
      rightClick(evt);
    },
    {
      onStart: (evt) => {
        console.log("long onStart", evt.currentTarget);
        evt.stopPropagation();
        dispatch(updateCellActive(true));
      },
      onCancel: (evt) => {
        console.log("long onCancel", evt.currentTarget);
        dispatch(updateCellActive(false));
      },
      onFinish: (evt) => {
        dispatch(updateCellActive(false));
        console.log("long onFinish", evt.currentTarget);
        const cellInner = evt.target as HTMLElement;
        cellInner.parentElement?.blur();
      },
      threshold: 300
    }
  );
  const handleDoubleClick = () => {
    console.log("handleDoubleClick");
    if (prevClickTime == 0) {
      prevClickTime = Date.now();
      return;
    }
    const now = Date.now();
    const interval = now - prevClickTime;
    prevClickTime = now;
    console.log("interval", interval);
    if (interval > 300) return;
    const coords = findAdjacentNoFlaggedCoordsByMarkedMineNumber(grid, coordinate);
    console.log("coords", coords);

    if (coords.length == 0) return;
    coords.forEach((coord) => {
      dispatch(
        // @ts-ignore
        revealCell({
          coordinate: coord
        })
      );
    });
    console.log({ coords });
  };

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

  const cellContent = (cell: ICell) => {
    const flagged = cell.status == "flagged";
    switch (cell.status) {
      case "hidden":
      case "flagged":
        return (
          <div
            {...attrs}
            role="button"
            aria-label="cell"
            className="cell group w-full h-full hover:invert-[0.15] relative"
          >
            {flagged ? (
              <SVGCellFlag role="button" className="absolute inset-0" />
            ) : (
              <>
                <SVGCellDefault className="absolute inset-0" />
                <SVGCellClick className="absolute inset-0 invisible group-active:visible" />
              </>
            )}
          </div>
        );
      case "revealed":
        if (cell.mineCount === -1) {
          return (
            <div>
              <SVGCellClicked className={"h-full w-full"} />
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
          <div className="relative">
            <SVGCellClicked className={"h-full w-full"} />
            <Image alt="mine count" src={`/ms/count/${cell.mineCount}.svg`} fill priority />
          </div>
        ) : (
          <Image alt="flag" src={"/ms/cell.clicked.svg"} fill priority />
        );
      case "detonated":
        return (
          <div className={`relative`}>
            <SVGCellClick className="w-full h-full bg-red-600" />
            <Image alt="bomb" src={"/ms/bomb.svg"} fill priority className="bg-red-600 scale-90 " />
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
      role="button"
      id={`cell-${coordinate.x}-${coordinate.y}`}
      tabIndex={cursorPointer ? 1 : undefined}
      data-coord={JSON.stringify(coordinate)}
      data-sound={enableSound ? sound : ""}
      className={clsx(
        "flex justify-center items-center relative",
        "focus:sepia active:sepia",
        cursorPointer && "not-reveal cursor-pointer"
      )}
      style={{ width: size, height: size }}
      // 在reveal状态下响应双击
      onClick={
        cell.status == "hidden"
          ? leftClick
          : cell.status == "revealed"
            ? handleDoubleClick
            : undefined
      }
      onContextMenu={
        isMobile()
          ? (e) => {
              if (e.cancelable) {
                e.preventDefault();
              }
              console.log("rightClick", e);
            }
          : rightClick
      }
      // onDoubleClick={
      //   isMobile() ? undefined : cell.status == "revealed" ? handleDoubleClick : undefined
      // }
    >
      {cellContent(cell)}
    </div>
  );
}

// export default Cell;
export default memo(Cell, (prev, next) => {
  return prev.cell.status == next.cell.status;
});
