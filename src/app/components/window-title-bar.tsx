import React, { PropsWithChildren } from "react";

type Props = {
  title?: string;
};

const WindowTitleBar = ({ title = "Mine Sweeper Online!", children }: PropsWithChildren<Props>) => {
  return (
    <div className="title-bar cursor-not-allowed fsh">
      <div className="title-bar-text flex gap-2 !items-center">
        <div className="w-3.5 h-3.5 bg-[url(/icon.png)] bg-contain"></div> {title}
      </div>
      <div className="title-bar-controls flex gap-1">{children}</div>
    </div>
  );
};

export default WindowTitleBar;
