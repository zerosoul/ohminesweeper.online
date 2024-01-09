import { difficulty } from "@/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Coordinate, revealCell, startGame, toggleFlag } from "@minesweeper";
import { toggleMini, toggleMiniRecords, toggleSound, updateArticle } from "@/redux/slice/user.data";
import React from "react";
import { HotkeysProvider, useHotkeys } from "react-hotkeys-hook";
type Props = {
  children: React.ReactNode;
};
type ArrowDirection = "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft";
const getNotReveals = () => {
  const _arr = [...document.querySelectorAll(".board .not-reveal")].map((ele) => {
    let res = "";
    try {
      const { x, y } = JSON.parse((ele as HTMLDivElement)?.dataset?.coord || "");
      res = `${x}|${y}`;
    } catch (error) {
      console.log(error);
    }
    return res;
  });
  return _arr.filter((a) => !!a);
};
const getFirstNotReveal = () => {
  const [x, y] = getNotReveals()[0].split("|");
  console.log("first", x, y);

  return document.querySelector(`#cell-${x}-${y}`) as HTMLDivElement;
};
const Hotkeys = ({ children }: Props) => {
  const level = useAppSelector((store) => store.userData.level);
  const status = useAppSelector((store) => store.minesweeper.status);
  const dispatch = useAppDispatch();
  const { width, height } = difficulty[level];
  const xMax = width - 1;
  const yMax = height - 1;
  const enableBoardHotkeys = status == "running" || status == "ready";
  // @ts-ignore
  const getNextCoord = ({
    coord,
    direction,
    notReveals
  }: {
    coord: Coordinate;
    direction: ArrowDirection;
    notReveals: string[];
  }) => {
    let res = { ...coord };
    switch (direction) {
      case "ArrowDown":
        {
          if (res.y == yMax) {
            res.y = 0;
            res.x = res.x == xMax ? 0 : res.x + 1;
          } else {
            res.y = res.y + 1;
          }
        }
        break;
      case "ArrowUp":
        {
          if (res.y == 0) {
            res.y = yMax;
            res.x = res.x == 0 ? xMax : res.x - 1;
          } else {
            res.y = res.y - 1;
          }
        }
        break;
      case "ArrowRight":
        {
          if (res.x == xMax) {
            res.x = 0;
            res.y = res.y == xMax ? 0 : res.y + 1;
          } else {
            res.x = res.x + 1;
          }
        }
        break;
      case "ArrowLeft":
        {
          if (res.x == 0) {
            res.x = xMax;
            res.y = res.y == 0 ? yMax : res.y - 1;
          } else {
            res.x = res.x - 1;
          }
        }
        break;

      default:
        break;
    }
    console.log({ notReveals, res, coord });

    if (!notReveals.includes(`${res.x}|${res.y}`)) {
      return getNextCoord({ coord: res, direction, notReveals });
    }
    return res;
  };
  useHotkeys(
    "right,left,up,down",
    (evt) => {
      console.log(evt);
      let activeEle = document.activeElement as HTMLDivElement;
      console.log({ activeEle });
      activeEle = activeEle.nodeName == "BODY" ? getFirstNotReveal() : activeEle;
      if (!activeEle.classList.contains("not-reveal")) {
        activeEle = getFirstNotReveal();
      }
      if (activeEle) {
        activeEle.classList.add("a");
        let coord: any = activeEle.dataset.coord;
        if (coord) {
          try {
            coord = JSON.parse(coord) as Coordinate;

            const c = getNextCoord({
              notReveals: getNotReveals(),
              coord,
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
    {
      scopes: "minesweeper",
      preventDefault: true,
      enabled: enableBoardHotkeys
    }
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
            // @ts-ignore
            dispatch(revealCell({ coordinate: coord }));
            setTimeout(() => {
              const nextCoord = getNextCoord({
                coord,
                notReveals: getNotReveals(),
                direction: "ArrowDown"
              });
              console.log({ nextCoord });

              if (nextCoord) {
                const cell = document.querySelector(`#cell-${nextCoord.x}-${nextCoord.y}`);
                if (cell) {
                  (cell as HTMLDivElement).focus();
                }
              }
            }, 150);
          } catch (error) {}
        }
      }
    },
    { scopes: "minesweeper", preventDefault: true, enabled: enableBoardHotkeys }
  );
  useHotkeys(
    "1,f",
    () => {
      const activeEle = document.activeElement as HTMLElement;
      if (activeEle) {
        let coord: any = activeEle.dataset.coord;
        if (coord) {
          try {
            coord = JSON.parse(coord) as Coordinate;
            dispatch(
              // @ts-ignore
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
        // @ts-ignore
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
  useHotkeys(
    "m",
    () => {
      dispatch(toggleMini());
    },
    { scopes: "article-window", preventDefault: true }
  );
  useHotkeys(
    "r",
    () => {
      dispatch(toggleMiniRecords());
    },
    { scopes: "article-window", preventDefault: true }
  );
  useHotkeys(
    "s",
    () => {
      dispatch(toggleSound());
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
