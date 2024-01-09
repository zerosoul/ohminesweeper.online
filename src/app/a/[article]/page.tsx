// import React from "react";
import "98.css";
import dynamic from "next/dynamic";

const AdvancePatternsPage = ({ params }: { params: { article: string } }) => {
  const WithCustomLoading = dynamic(() => import(`@/articles/${params.article}/index.mdx`), {
    loading: () => <p>Loading...</p>,
    ssr: true
  });
  return <WithCustomLoading />;
  // return "hello";
};

export default AdvancePatternsPage;
