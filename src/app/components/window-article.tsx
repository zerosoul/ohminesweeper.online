// import { ArticleName } from "@/types";
import dynamic from "next/dynamic";
import React from "react";
import WindowTitleBar from "./window-title-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateArticle } from "@/redux/slice/user.data";
import Loading from "./loading";
import Link from "next/link";
import { useCopyToClipboard } from "@uidotdev/usehooks";

const WindowArticle = () => {
  const [, copy] = useCopyToClipboard();
  const dispatch = useAppDispatch();
  const article = useAppSelector((store) => store.userData.article);
  if (!article) return null;
  const handleClose = () => {
    dispatch(updateArticle(""));
  };
  const WithCustomLoading = dynamic(() => import(`@/app/article/${article}/index.mdx`), {
    loading: () => <Loading />,
    ssr: true
  });
  const handleCopy = () => {
    copy(`https://ohminesweeper.online/a/${article}`);
  };
  return (
    <aside className="window min-h-[200px] w-[calc(100%_-_40px)] max-w-4xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <WindowTitleBar title={article}>
        <Link
          role="button"
          className="text-white underline mr-4"
          href={`/a/${article}`}
          target="_blank"
        >
          Open in dependent window
        </Link>
        <button onClick={handleClose} aria-label="Close" title="Close the window"></button>
      </WindowTitleBar>
      <div className="article max-h-[calc(100vh_-_120px)] overflow-y-auto">
        <WithCustomLoading />
      </div>
      <div className="flex items-center gap-1 px-5 py-2 absolute bottom-0 left-0 w-full bg-inherit">
        <span>Link:</span>
        <Link role="button" className=" underline" href={`/a/${article}`} target="_blank">
          {`https://ohminesweeper.online/a/${article}`}
        </Link>
        <button className="ml-2 !p-1 min-w-[unset] text-[10px]" onClick={handleCopy}>
          Copy Link
        </button>
      </div>
    </aside>
  );
};

export default WindowArticle;
