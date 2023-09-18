import dayjs from "dayjs";
import { useEffect, useState } from "react";

// type Props = {}
let inter = 0;
const CornerFooter = () => {
  const [time, setTime] = useState(dayjs().format("hh:mm A"));
  useEffect(() => {
    inter = window.setInterval(() => {
      setTime(dayjs().format("hh:mm A"));
    }, 1000);

    return () => {
      clearInterval(inter);
    };
  }, []);

  return (
    <footer className="status-bar-field flex gap-1 items-center !px-2">
      <time>{time}</time>
      {/* <span>by </span>
      <a
        href="http://yangerxiao.com"
        className="text-blue-500 dark:text-blue-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tristan
      </a>{" "}
      © {new Date().getFullYear()} */}
    </footer>
  );
};

export default CornerFooter;
