import React from "react";
import { useParams, useRouter, useSelectedLayoutSegments } from "next/navigation";
// type Props = {}

const LangSwitcher = () => {
  const router = useRouter();
  const urlSegments = useSelectedLayoutSegments();
  const params = useParams();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(`/${locale}/${urlSegments.join("/")}`);
  };
  return (
    <select value={params.locale} onChange={handleChange}>
      <option value="en">English</option>
      <option value="zh-CN">中文</option>
    </select>
  );
};

export default LangSwitcher;
