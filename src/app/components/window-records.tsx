import React from "react";
import WindowTitleBar from "./window-title-bar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import clsx from "clsx";
import { updateMiniRecords } from "@/redux/slice/user.data";
import Modal from "./modal";

// type Props = {}

const RecordsWindow = () => {
  const dispatch = useAppDispatch();
  const recordWindowMinimized = useAppSelector((store) => store.userData.recordWindowMinimized);
  const records = useAppSelector((store) => store.userData.records);
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
                        <td>
                          {`${new Date(timestamp).toLocaleDateString()} ${new Date(
                            timestamp
                          ).toLocaleTimeString()}`}
                        </td>
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
