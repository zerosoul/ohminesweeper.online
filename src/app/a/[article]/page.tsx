// import React from "react";
import "98.css";
import dynamic from "next/dynamic";
type Props = {
  params: Promise<{ article: string }>;
};
const AdvancePatternsPage = async ({ params }: Props) => {
  const { article } = await params;
  const WithCustomLoading = dynamic(() => import(`@/articles/${article}/index.mdx`), {
    loading: () => <p>Loading...</p>,
    ssr: true
  });
  return <WithCustomLoading />;
  // return "hello";
};

export default AdvancePatternsPage;
