import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateArticle } from "@/redux/slice/user.data";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

// type Props = {
// }
type ItemProps = {
  selected: boolean;
  name: string;
  icon: string;
  title: string;
  clickHandler: () => void;
};
const MenuItem = ({ selected, icon, title, clickHandler }: ItemProps) => {
  return (
    <li
      onClick={clickHandler}
      role="button"
      className={clsx(
        "p-1.5 flex items-center gap-4 cursor-pointer hover:bg-[#000E7A] hover:text-white",
        selected && "bg-[#000E7A] text-white"
      )}
    >
      <Image src={icon} alt="help icon" width={30} height={30} />
      <span className="text-xs whitespace-nowrap">{title}</span>
    </li>
  );
};
const StartPanel = ({ closePanel }: { closePanel: () => void }) => {
  const article = useAppSelector((store) => store.userData.article);
  const dispatch = useAppDispatch();
  const arts = [
    {
      selected: article == "how-to-play",
      icon: "/help.png",
      title: "How to play minesweeper",
      clickHandler: () => {
        dispatch(updateArticle("how-to-play"));
        closePanel();
      }
    },
    {
      selected: article == "advance-patterns",
      icon: "/channel.png",
      title: "Advanced Patterns",
      clickHandler: () => {
        dispatch(updateArticle("advance-patterns"));
        closePanel();
      }
    },
    {
      selected: article == "first-click",
      icon: "/tip.png",
      title: "First Click",
      clickHandler: () => {
        dispatch(updateArticle("first-click"));
        closePanel();
      }
    },
    {
      selected: article == "guess",
      icon: "/question.png",
      title: "Guessing",
      clickHandler: () => {
        dispatch(updateArticle("guess"));
        closePanel();
      }
    },
    {
      selected: article == "no-flag",
      icon: "/agent.png",
      title: "No Flags",
      clickHandler: () => {
        dispatch(updateArticle("no-flag"));
        closePanel();
      }
    },
    {
      selected: article == "efficiency",
      icon: "/keys.png",
      title: "Efficiency",
      clickHandler: () => {
        dispatch(updateArticle("efficiency"));
        closePanel();
      }
    },
    {
      selected: article == "more-tips",
      icon: "/info.png",
      title: "More Tips",
      clickHandler: () => {
        dispatch(updateArticle("more-tips"));
        closePanel();
      }
    }
  ] as ItemProps[];
  return (
    <aside className="window max-w-[unset] w-52">
      <div className="window-body !p-0 !m-0">
        <ul>
          {arts.map((item) => {
            return <MenuItem key={item.title} {...item} />;
          })}
        </ul>
      </div>
    </aside>
  );
};

export default StartPanel;
