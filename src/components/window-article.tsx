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
  const WithCustomLoading = dynamic(() => import(`@/articles/${article}/index.mdx`), {
    loading: () => <Loading />,
    ssr: true
  });
  const handleCopy = () => {
    copy(`https://ohminesweeper.online/a/${article}`);
  };
  return (
    <aside className="window min-h-[200px] w-[calc(100%_-_20px)] max-w-4xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 dark:brightness-75">
      <WindowTitleBar title={article}>
        <Link
          role="button"
          className="text-white underline mr-2 md:mr-4"
          href={`/a/${article}`}
          target="_blank"
        >
          Open in dependent window
        </Link>
        <button onClick={handleClose} aria-label="Close" title="Close the window"></button>
      </WindowTitleBar>
      <div className="article cursor-auto max-h-[calc(100vh_-_150px)] pb-10 overflow-y-auto">
        <WithCustomLoading />
        <div className="text-xs md:text-sm  flex items-center whitespace-nowrap gap-1 px-5 py-2 absolute bottom-2 left-1/2 -translate-x-1/2 bg-inherit w-fit shadow-lg rounded">
          <span>Link:</span>
          <Link
            role="button"
            className="underline text-blue-900 dark:text-blue-100"
            href={`/a/${article}`}
            target="_blank"
          >
            {`https://ohminesweeper.online/a/${article}`}
          </Link>
          <button
            className="hidden md:block ml-2 !p-1 min-w-[unset] text-[10px]"
            onClick={handleCopy}
          >
            Copy Link
          </button>
        </div>
      </div>
    </aside>
  );
};

export default WindowArticle;
