// import React, { useState, useEffect } from "react";
import WindowTitleBar from "../window-title-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { updateMiniRecords } from "@/redux/slice/user.data";
import dayjs from "dayjs";
import PersonalBest from "./personal-best";
// import relativeTime from "dayjs/plugin/relativeTime";

import useRecords from "../../hooks/useRecords";
import RadioFilter from "./radio-filter";
import Operations from "./operations";
import { useState } from "react";

// type Props = {}
// dayjs.extend(relativeTime);

export const RecordWindowTitle = `Play Records`;
const RecordsWindow = () => {
  const dispatch = useAppDispatch();
  const [optTimestamp, setOptTimestamp] = useState<number | null>(null);
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
  const toggleOperations = (timestamp?: number) => {
    console.log(timestamp);
    setOptTimestamp(timestamp ?? null);
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
      <div className="window-body max-h-screen overflow-y-auto overflow-x-hidden">
        <div className="my-2 pl-0.5">
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
        <div className="sunken-panel w-full md:w-96  min-h-[100px] max-h-96 relative">
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
                      onClick={toggleOperations.bind(null, timestamp)}
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
          {optTimestamp && <Operations handleClose={toggleOperations} timestamp={optTimestamp} />}
        </div>
        <em className="drop-shadow">* play time less than 1 second excluded</em>
        <div className="mt-3 pt-5 px-1.5 grid grid-rows-2 grid-cols-1 justify-items-center">
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
