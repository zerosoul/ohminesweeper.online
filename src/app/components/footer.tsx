import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="select-text text-gray-400 dark:text-gray-200 text-sm m-auto p-2">
      <div className="flex gap-1">
        Created by{" "}
        <a
          href="http://yangerxiao.com"
          className="text-blue-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tristan
        </a>{" "}
        © {new Date().getFullYear()}
      </div>
    </footer>
  );
};
export default Footer;
