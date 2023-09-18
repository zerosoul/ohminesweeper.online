import { useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

// type Props = {}
let inter = 0;
const CornerFooter = () => {
  const ui = useAppSelector((store) => store.userData.ui);
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
    <footer
      className={clsx(
        "flex gap-1 items-center !px-2",
        ui == "xp" ? "text-white" : "status-bar-field"
      )}
    >
      <time className="">{time}</time>
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
