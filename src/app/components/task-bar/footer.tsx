import React from "react";

// type Props = {}

const CornerFooter = () => {
  return (
    <footer className="status-bar-field flex gap-1 !px-2">
      <span>Made by </span>
      <a
        href="http://yangerxiao.com"
        className="text-blue-500 dark:text-blue-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tristan
      </a>{" "}
      © {new Date().getFullYear()}
    </footer>
  );
};

export default CornerFooter;
