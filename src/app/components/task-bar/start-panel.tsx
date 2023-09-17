import { useAppDispatch } from "@/redux/hooks";
import { updateArticle } from "@/redux/slice/user.data";
import Image from "next/image";
import React from "react";

// type Props = {
// }
type ItemProps = { icon: string; title: string; clickHandler: () => void };
const MenuItem = ({ icon, title, clickHandler }: ItemProps) => {
  return (
    <li
      onClick={clickHandler}
      role="button"
      className="p-1.5 flex items-center gap-4 cursor-pointer hover:bg-[#000E7A] hover:text-white"
    >
      <Image src={icon} alt="help icon" width={30} height={30} />
      <span className="text-xs whitespace-nowrap">{title}</span>
    </li>
  );
};
const StartPanel = ({ closePanel }: { closePanel: () => void }) => {
  const dispatch = useAppDispatch();
  return (
    <aside className="window max-w-[unset] w-52">
      <div className="window-body !p-0 !m-0">
        <ul>
          {[
            {
              icon: "/help.png",
              title: "How to play minesweeper",
              clickHandler: () => {
                dispatch(updateArticle("how-to-play"));
                closePanel();
              }
            },
            {
              icon: "/tip.png",
              title: "Tips",
              clickHandler: () => {
                dispatch(updateArticle("more-tips"));
                closePanel();
              }
            }
          ].map((item) => {
            return <MenuItem key={item.title} {...item} />;
          })}
        </ul>
      </div>
    </aside>
  );
};

export default StartPanel;
