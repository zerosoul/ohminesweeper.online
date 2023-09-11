import React, { useState, useEffect } from "react";
import WindowTitleBar from "./window-title-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { updateMiniRecords } from "@/redux/slice/user.data";
import Modal from "./modal";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { PlayRecord } from "@/types";

// type Props = {}
dayjs.extend(relativeTime);
const RecordsWindow = () => {
  const [best, setBest] = useState<PlayRecord | null>(null);
  const dispatch = useAppDispatch();
  const recordWindowMinimized = useAppSelector((store) => store.userData.recordWindowMinimized);
  const records = useAppSelector((store) => store.userData.records);
  useEffect(() => {
    if (records.length > 0) {
      const tmp = records.filter((r) => r.status == "win").sort((a, b) => a.duration - b.duration);
      if (tmp.length > 0) {
        setBest(tmp[0] as PlayRecord);
      }
    }
  }, [records]);

  if (recordWindowMinimized) return null;
  return (
    <Modal mask={false}>
      <div className={clsx("window")}>
        <WindowTitleBar allowDrag title="minesweeper history records">
          <button
            aria-label="Minimize"
            onClick={() => dispatch(updateMiniRecords(true))}
            title="Hide the window"
          ></button>
        </WindowTitleBar>
        <div className="window-body">
          {best && (
            <div className="flex items-center gap-3 mb-4">
              <Image width={32} height={32} alt="personal best" src={"/cert.png"} />
              <div className="flex flex-col">
                <span className="">Personal Best:</span>
                <span className="text-sm">
                  <strong>{best.level}</strong> level in <strong>{best.duration}s</strong> at{" "}
                  <strong>{dayjs(best.timestamp).fromNow()}</strong>
                </span>
              </div>
            </div>
          )}
          <div className="sunken-panel w-fit min-h-[320px]">
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
                  <tr>
                    <td colSpan={4}>No records yet</td>
                  </tr>
                ) : (
                  records.map((r) => {
                    const { duration, level, timestamp, status } = r;
                    return (
                      <tr key={timestamp} className="hover:bg-[#008] hover:text-white">
                        <td>{dayjs(timestamp).format("YYYY-MM-DD HH:mm:ss")}</td>
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
        </div>
      </div>
    </Modal>
  );
};

export default RecordsWindow;
