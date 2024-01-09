import clsx from "clsx";
import React, { PropsWithChildren, memo } from "react";

type Props = {
  icon?: string;
  title?: string;
  allowDrag?: boolean;
};

const WindowTitleBar = ({
  icon = "/icon.png",
  title = "Mine Sweeper Online!",
  allowDrag = false,
  children
}: PropsWithChildren<Props>) => {
  console.log("icon", icon);

  return (
    <div className={clsx("title-bar fsh html2img-ignore", !allowDrag && "cursor-not-allowed ")}>
      <div className="title-bar-text flex gap-2 !items-center capitalize">
        <div className={`w-3.5 h-3.5 bg-contain`} style={{ backgroundImage: `url(${icon})` }}></div>{" "}
        {title}
      </div>
      <div className="title-bar-controls flex gap-1">{children}</div>
    </div>
  );
};

export default memo(WindowTitleBar);
