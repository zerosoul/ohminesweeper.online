import { useAppSelector } from "@/redux/hooks";
// import React, { useEffect } from "react";

type Props = {
  type: "flag" | "time";
};
const Counter = ({ type }: Props) => {
  const count = useAppSelector((store) =>
    type == "flag" ? store.minesweeper.remainingFlags : store.userData.elapsedTime
  );

  const countStr = (count >= 999 ? 999 : count < 0 ? 0 : count).toString().padStart(3, "0");
  const [num1, num2, num3] = countStr.split("");
  console.log("count", countStr, num1, num2, num3);
  const numClass = `w-3 h-6 !bg-contain !bg-no-repeat`;
  return (
    <div className="flex items-center gap-[3px] bg-black p-1">
      <span className={numClass} style={{ backgroundImage: `url(/ms/num/${num1}.svg)` }}></span>
      <span className={numClass} style={{ background: `url(/ms/num/${num2}.svg)` }}></span>
      <span className={numClass} style={{ background: `url(/ms/num/${num3}.svg)` }}></span>
    </div>
  );
};

export default Counter;
