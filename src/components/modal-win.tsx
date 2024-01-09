import React, { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Confetti from "react-confetti";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  FacebookIcon,
  TwitterIcon,
  InstapaperIcon,
  WeiboShareButton,
  WeiboIcon,
  LineShareButton,
  LineIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
import Confirm from "./confirm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Modal from "./modal";
import { difficulty } from "@/config";
import { startGame } from "@minesweeper";
// type Props = {};

const ModalWin = () => {
  const { width, height } = useWindowSize();
  const dispatch = useAppDispatch();
  const status = useAppSelector((store) => store.minesweeper.status);
  const level = useAppSelector((store) => store.userData.level);
  const latestRecord = useAppSelector((store) => store.userData.records[0]);
  const [visible, setVisible] = useState(false);
  const closeShareModal = () => {
    setVisible(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setVisible(status == "win");
    }, 800);
  }, [status]);
  const handleScreenshot = () => {
    const btn = document.querySelector("#SCREEN_SHOOT_BUTTON") as HTMLButtonElement;
    if (btn) {
      closeShareModal();
      btn.click();
    }
  };
  const handlePlayAgain = () => {
    closeShareModal();
    dispatch(
      // @ts-ignore
      startGame({
        difficulty: difficulty[level],
        randSeed: Math.random()
      })
    );
  };
  if (!visible) return null;
  const title = `I just beat #minesweeper in ${latestRecord.duration} seconds on ${level} mode!`;
  return (
    <>
      <Modal id="confetti-modal" mask={false}>
        <Confetti
          className="fixed left-0 top-0 w-full h-full"
          width={width ?? 0}
          height={height ?? 0}
        />
      </Modal>
      <Confirm
        disableCancel
        title="Congratulations!"
        close={closeShareModal}
        content={
          <div className="flex flex-col items-center gap-1">
            <h4>🎉 You have win the game!</h4>
            <div className="flex gap-3">
              <button onClick={handleScreenshot}>Screenshot</button>
              <button onClick={handlePlayAgain}>Play again</button>
            </div>
            <fieldset className="mt-4">
              <legend className="m-auto">share it !</legend>
              <ul className="flex items-center flex-wrap gap-2 m-auto">
                <li>
                  <FacebookShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    title={title}
                    url={window.location.href}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </li>
                <li>
                  <TwitterShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    title={title}
                    related={["wsygc"]}
                    url={window.location.href}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </li>
                <li>
                  <LineShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    title={title}
                    url={window.location.href}
                  >
                    <LineIcon size={32} round />
                  </LineShareButton>
                </li>
                <li>
                  <LinkedinShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    title={title}
                    url={window.location.href}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </li>
                <li>
                  <RedditShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    title={title}
                    url={window.location.href}
                  >
                    <RedditIcon size={32} round />
                  </RedditShareButton>
                </li>
                <li>
                  <WhatsappShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    title={title}
                    url={window.location.href}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </li>
                <li>
                  <EmailShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    content={title}
                    url={window.location.href}
                  >
                    <EmailIcon size={32} round />
                  </EmailShareButton>
                </li>
                <li>
                  <InstapaperShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    content={title}
                    url={window.location.href}
                  >
                    <InstapaperIcon size={32} round />
                  </InstapaperShareButton>
                </li>
                <li>
                  <WeiboShareButton
                    className="flex items-center gap-1 !p-1 !min-w-[unset]"
                    title={title}
                    url={window.location.href}
                  >
                    <WeiboIcon size={32} round />
                  </WeiboShareButton>
                </li>
              </ul>
              <p className="text-left pt-4 text-sm">{title}</p>
            </fieldset>
          </div>
        }
      />
    </>
  );
};

export default ModalWin;
