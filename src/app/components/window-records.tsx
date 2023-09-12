// import React, { useState, useEffect } from "react";
import WindowTitleBar from "./window-title-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { updateMiniRecords } from "@/redux/slice/user.data";
import Image from "next/image";
import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";

import { Level, PlayRecord } from "@/types";
import useRecords from "../hooks/useRecords";

// type Props = {}
// dayjs.extend(relativeTime);
const PersonalBest = ({ level, data }: { level: Level; data: PlayRecord | null }) => {
  return (
    <div
      className={clsx(
        "px-3 py-2 my-1 min-w-[135px] min-h-[90px] flex flex-col gap-2 relative",
        level == "beginner" && "bg-yellow-700",
        level == "intermediate" && "bg-orange-600",
        level == "expert" && "bg-red-600",
        !data && "grayscale text-gray-300"
      )}
    >
      <span className="uppercase font-semibold absolute -top-1 -right-4 rotate-45 drop-shadow-xl text-black grayscale-0">
        {level}
      </span>
      <div className="bg-transparent flex flex-col">
        <span>Personal Best</span>
        {data && <span>at {dayjs(data.timestamp).format("YYYY-MM-DD HH:mm:ss")}</span>}
      </div>
      <div className="flex items-center gap-3">
        <Image
          width={38}
          height={38}
          className={clsx("drop-shadow-xl")}
          alt="personal best"
          src={"/cert.png"}
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
const RadioFilter = ({
  handleUpdate,
  name,
  filter,
  filters
}: {
  filter: string;
  filters: string[];
  name: string;
  // eslint-disable-next-line no-unused-vars
  handleUpdate: (param: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm capitalize">
      <span className="text-right w-8 text-xs">{name}:</span>
      <ul className="flex gap-1 items-center py-1 font-semibold">
        {filters.map((_key) => {
          const id_key = `${name}_${_key}`;
          return (
            <li key={_key} className="cursor-pointer" onClick={handleUpdate.bind(null, _key)}>
              <input id={id_key} name={id_key} type="radio" checked={filter == _key} />
              <label htmlFor={id_key}>{_key}</label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export const RecordWindowTitle = `Play Records`;
const RecordsWindow = () => {
  const dispatch = useAppDispatch();
  const recordWindowMinimized = useAppSelector((store) => store.userData.recordWindowMinimized);
  const { best, records, updateFilter, filter } = useRecords();
  const handleLevelChange = (level: any) => {
    console.log(level);

    updateFilter({ ...filter, level });
  };
  const handleResultChange = (result: any) => {
    console.log(result);

    updateFilter({ ...filter, result });
  };
  if (recordWindowMinimized) return null;
  return (
    <div className={clsx("window fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2")}>
      <WindowTitleBar allowDrag title={RecordWindowTitle} icon="/table.png">
        <button
          aria-label="Minimize"
          onClick={() => dispatch(updateMiniRecords(true))}
          title="Hide the window"
        ></button>
      </WindowTitleBar>
      <div className="window-body">
        <div className="my-2">
          <RadioFilter
            filters={["all", "beginner", "intermediate", "expert"]}
            filter={filter.level}
            name="level"
            handleUpdate={handleLevelChange}
          />
          <RadioFilter
            filters={["all", "win", "loss"]}
            filter={filter.result}
            name="result"
            handleUpdate={handleResultChange}
          />
        </div>
        <div className="sunken-panel w-full md:w-96  min-h-[320px] max-h-96">
          <table className="interactive w-full text-sm">
            <thead>
              <tr>
                <th>Time</th>
                <th>Level</th>
                <th>Duration</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {records.length == 0 ? (
                <tr className="translate-y-20">
                  <td colSpan={4} className="text-center">
                    No records yet
                  </td>
                </tr>
              ) : (
                records.map((r) => {
                  const { duration, level, timestamp, status } = r;
                  return (
                    <tr
                      role="button"
                      key={timestamp}
                      className={clsx(
                        "hover:bg-[#008] hover:text-white",
                        status == "win" && "bg-teal-200"
                      )}
                    >
                      <td width={30}>{dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss")}</td>
                      <td>{level}</td>
                      <td>{duration}s</td>
                      <td>{status}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <em className="drop-shadow">* play time less than 1 second excluded</em>
        <div className="grid  grid-rows-2 grid-cols-1 justify-items-center">
          <div className="col-span-2">
            <PersonalBest level="expert" data={best.expert} />
          </div>
          <div className="place-self-start">
            <PersonalBest level="intermediate" data={best.intermediate} />
          </div>
          <div className="place-self-end">
            <PersonalBest level="beginner" data={best.beginner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsWindow;
