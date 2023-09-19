import { difficulty } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Coordinate, revealCell, startGame, toggleFlag } from "@minesweeper";
import { updateArticle } from "@/redux/slice/user.data";
import React from "react";
import { HotkeysProvider, useHotkeys } from "react-hotkeys-hook";
type Props = {
  children: React.ReactNode;
};
type ArrowDirection = "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft";
const getNextCoord = ({
  coord,
  direction,
  xMax,
  yMax
}: {
  coord: Coordinate;
  direction: ArrowDirection;
  xMax: number;
  yMax: number;
}) => {
  let res = { ...coord };
  switch (direction) {
    case "ArrowDown":
      {
        if (res.y == yMax) {
          res.y = 0;
        } else {
          res.y = res.y + 1;
        }
      }
      break;
    case "ArrowUp":
      {
        if (res.y == 0) {
          res.y = yMax;
        } else {
          res.y = res.y - 1;
        }
      }
      break;
    case "ArrowRight":
      {
        if (res.x == xMax) {
          res.x = 0;
        } else {
          res.x = res.x + 1;
        }
      }
      break;
    case "ArrowLeft":
      {
        if (res.x == 0) {
          res.x = xMax;
        } else {
          res.x = res.x - 1;
        }
      }
      break;

    default:
      break;
  }
  if (res.x < 0 || res.x > xMax) {
    return null;
  }
  if (res.y < 0 || res.y > yMax) {
    return null;
  }

  return res;
};
const Hotkeys = ({ children }: Props) => {
  const level = useAppSelector((store) => store.userData.level);
  const dispatch = useAppDispatch();
  useHotkeys(
    "right,left,up,down",
    (evt) => {
      console.log(evt);
      let activeEle = document.activeElement as HTMLDivElement;
      console.log({ activeEle });
      activeEle =
        activeEle.nodeName == "BODY"
          ? (document.querySelector("#cell-0-0") as HTMLDivElement)
          : activeEle;
      if (activeEle) {
        activeEle.classList.add("a");
        let coord: any = activeEle.dataset.coord;
        if (coord) {
          try {
            coord = JSON.parse(coord) as Coordinate;
            const { width, height } = difficulty[level];
            const c = getNextCoord({
              coord,
              xMax: width - 1,
              yMax: height - 1,
              direction: evt.code as ArrowDirection
            });
            console.log({ c });

            const cell = c
              ? document.querySelector(`#cell-${c.x}-${c.y}`)
              : document.querySelector(`#cell-${coord.x}-${coord.y}`);
            if (cell) {
              (cell as HTMLDivElement).focus();
            }
          } catch (error) {}
        }
      }
    },
    { scopes: "minesweeper", preventDefault: true }
  );
  useHotkeys(
    "space,enter",
    () => {
      const activeEle = document.activeElement as HTMLElement;
      if (activeEle) {
        let coord: any = activeEle.dataset.coord;
        if (coord) {
          try {
            coord = JSON.parse(coord) as Coordinate;
            dispatch(revealCell({ coordinate: coord }));
          } catch (error) {}
        }
      }
    },
    { scopes: "minesweeper", preventDefault: true }
  );
  useHotkeys(
    "1",
    () => {
      const activeEle = document.activeElement as HTMLElement;
      if (activeEle) {
        let coord: any = activeEle.dataset.coord;
        if (coord) {
          try {
            coord = JSON.parse(coord) as Coordinate;
            dispatch(
              toggleFlag({
                coordinate: coord
              })
            );
          } catch (error) {}
        }
      }
    },
    { scopes: "minesweeper", preventDefault: true }
  );
  useHotkeys(
    "F1,meta+1",
    () => {
      dispatch(updateArticle("how-to-play"));
    },
    { scopes: "minesweeper", preventDefault: true }
  );
  useHotkeys(
    "F2,meta+2",
    () => {
      dispatch(
        startGame({
          difficulty: difficulty[level],
          randSeed: Math.random()
        })
      );
    },
    { scopes: "minesweeper", preventDefault: true }
  );
  useHotkeys(
    "F5,meta+5",
    () => {
      const btn = document.querySelector("#MS_SETTING_BUTTON") as HTMLButtonElement;
      if (btn) btn.click();
    },
    { scopes: "minesweeper", preventDefault: true }
  );
  useHotkeys(
    "esc",
    () => {
      dispatch(updateArticle(""));
    },
    { scopes: "article-window", preventDefault: true }
  );
  return (
    <HotkeysProvider initiallyActiveScopes={["minesweeper", "article-window"]}>
      {children}
    </HotkeysProvider>
  );
};

export default Hotkeys;
