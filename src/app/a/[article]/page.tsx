import React from "react";

import dynamic from "next/dynamic";

const AdvancePatternsPage = ({ params }: { params: { article: string } }) => {
  const WithCustomLoading = dynamic(() => import(`@/app/article/${params.article}/index.mdx`), {
    loading: () => <p>Loading...</p>,
    ssr: true
  });
  return <WithCustomLoading />;
};

export default AdvancePatternsPage;
