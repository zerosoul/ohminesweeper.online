import { Level, PlayRecord } from "@/types";
import clsx from "clsx";
import dayjs from "dayjs";
import React from "react";
import Image from "next/image";

type Props = { level: Level; data: PlayRecord | null };

const PersonalBest = ({ level, data }: Props) => {
  return (
    <div
      className={clsx(
        "px-3 py-2 my-1 min-w-[135px] min-h-[90px] flex flex-col gap-2 relative shadow-md rounded bg-orange-600",
        // level == "beginner" && "bg-yellow-700",
        // level == "intermediate" && "bg-orange-600",
        // level == "expert" && "bg-red-600",
        !data && "grayscale text-gray-300"
      )}
    >
      <span className="font-semibold absolute -top-0 -right-4 rotate-45 drop-shadow-xl text-black grayscale-0">
        Personal Best
      </span>
      <div className="bg-transparent flex flex-col">
        <span className="font-semibold capitalize">{level}</span>
        {data && <span>at {dayjs(data.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>}
      </div>
      <div className="flex items-center gap-3">
        <Image
          width={38}
          height={38}
          className={clsx("drop-shadow-xl")}
          alt="personal best"
          src={"/win/cert.png"}
        />
        {data ? (
          <div className="flex text-sm drop-shadow-lg">
            <strong>{data.duration}s</strong>
            {/* <strong>{dayjs(data.timestamp).fromNow()}</strong> */}
          </div>
        ) : (
          "No win yet!"
        )}
      </div>
    </div>
  );
};

export default PersonalBest;
