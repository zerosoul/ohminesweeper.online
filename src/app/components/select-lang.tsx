import React from "react";

type Props = {};

const Language = (props: Props) => {
  return (
    <select>
      <option>Language: English</option>
      <option>Language: 简体中文</option>
      <option>Language: 正體中文</option>
      <option>Language: 日本语</option>
    </select>
  );
};

export default Language;
