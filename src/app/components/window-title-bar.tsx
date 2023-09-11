import clsx from "clsx";
import React, { PropsWithChildren } from "react";

type Props = {
  title?: string;
  allowDrag?: boolean;
};

const WindowTitleBar = ({
  title = "Mine Sweeper Online!",
  allowDrag = false,
  children
}: PropsWithChildren<Props>) => {
  return (
    <div className={clsx("title-bar fsh", !allowDrag && "cursor-not-allowed ")}>
      <div className="title-bar-text flex gap-2 !items-center">
        <div className="w-3.5 h-3.5 bg-[url(/icon.png)] bg-contain"></div> {title}
      </div>
      <div className="title-bar-controls flex gap-1">{children}</div>
    </div>
  );
};

export default WindowTitleBar;
