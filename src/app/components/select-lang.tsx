import React from "react";

type Props = {};

const Language = (props: Props) => {
  return (
    <select className="dark:bg-gray-900 dark:text-gray-100">
      <option>English</option>
      <option>简体中文</option>
      <option>正體中文</option>
      <option>日本语</option>
    </select>
  );
};

export default Language;
