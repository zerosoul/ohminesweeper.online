// import React, { useState, useEffect } from "react";
import WindowTitleBar from "./window-title-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { updateMiniRecords } from "@/redux/slice/user.data";
import Modal from "./modal";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { PlayRecord } from "@/types";
import useRecords from "../hooks/useRecords";

// type Props = {}
dayjs.extend(relativeTime);
const PersonalBest = ({ data }: { data: PlayRecord }) => {
  return (
    <div
      className={clsx(
        "border p-1 my-2",
        data.level == "beginner" && "border-yellow-700",
        data.level == "intermediate" && "border-orange-600",
        data.level == "expert" && "border-red-600"
      )}
    >
      <fieldset className="">
        <legend className="capitalize">
          Personal Best at <strong>{data.level}</strong> Level
        </legend>
        <div className="flex items-center gap-3">
          <Image
            width={32}
            height={32}
            className="drop-shadow-xl"
            alt="personal best"
            src={"/cert.png"}
          />
          <div className="flex text-sm drop-shadow-lg">
            <strong>{data.duration}s</strong> &nbsp;{` at `}
            <strong>{dayjs(data.timestamp).fromNow()}</strong>
          </div>
        </div>
      </fieldset>
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
    <Modal mask={false}>
      <div className={clsx("window")}>
        <WindowTitleBar allowDrag title="play records" icon="/table.png">
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
          {best.beginner && <PersonalBest data={best.beginner} />}
          {best.intermediate && <PersonalBest data={best.intermediate} />}
          {best.expert && <PersonalBest data={best.expert} />}
        </div>
      </div>
    </Modal>
  );
};

export default RecordsWindow;
