// import { ArticleName } from "@/types";
import dynamic from "next/dynamic";
import React from "react";
import WindowTitleBar from "./window-title-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateArticle } from "@/redux/slice/user.data";
import Loading from "./loading";

const WindowArticle = () => {
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
  return (
    <aside className="window min-h-[200px] w-[calc(100%_-_40px)] max-w-4xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <WindowTitleBar title={article}>
        <button onClick={handleClose} aria-label="Close" title="Close the window"></button>
      </WindowTitleBar>
      <div className="article max-h-[calc(100vh_-_120px)] overflow-y-auto">
        <WithCustomLoading />
      </div>
    </aside>
  );
};

export default WindowArticle;
