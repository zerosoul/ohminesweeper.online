import React from "react";
import Modal from "../modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateFeedback } from "@/redux/slice/user.data";
import clsx from "clsx";
import Image from "next/image";
import WindowTitleBar from "../window-title-bar";

// type Props = {}

const Feedback = () => {
  const feedbackVisible = useAppSelector((store) => store.userData.feedbackVisible);
  const dispatch = useAppDispatch();
  const toggleFeedback = () => {
    dispatch(updateFeedback(!feedbackVisible));
  };
  return (
    <>
      {feedbackVisible && (
        <Modal>
          <div className="window min-w-[360px] max-dvh-screen dark:brightness-75">
            <WindowTitleBar title="Welcome feedback">
              <button aria-label="Close" onClick={toggleFeedback}></button>
            </WindowTitleBar>
            <div className="window-body relative py-3 flex flex-col items-center gap-2">
              <form className="flex flex-col gap-2 w-full px-4" action="">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Email :</label>
                  <input
                    // className="w-full"
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="email"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="content">Content :</label>
                  <textarea
                    name="content"
                    rows={10}
                    id="content"
                    required
                    placeholder="write something, suggest / ask / support / bug, etc."
                  />
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </Modal>
      )}
      <button
        onClick={toggleFeedback}
        className={clsx("min-w-[unset] !p-1", feedbackVisible && "active")}
      >
        <Image alt="feedback button" src={"/win/feedback.png"} width={22} height={22} />
      </button>
    </>
  );
};

export default Feedback;
