// import React from "react";
"use client";

type Props = {
  error: Error;
};

const ArticleErrorPage = ({ error }: Props) => {
  return <div>{error.message}</div>;
};

export default ArticleErrorPage;
