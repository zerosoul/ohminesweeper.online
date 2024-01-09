import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { shallowEqual } from "react-redux";
import { toCanvas } from "html-to-image";
import saveAs from "file-saver";
import Modal from "./modal";
import Image from "next/image";
import clsx from "clsx";
import WindowTitleBar from "./window-title-bar";
import Loading from "./loading";
import { isWebview } from "@/utils";

// type Props = {};

const ScreenShot = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currCanvas, setCurrCanvas] = useState<HTMLCanvasElement | null>(null);
  const gameStatus = useAppSelector((store) => store.minesweeper.status, shallowEqual);
  const generateScreenShot = () => {
    const node = document.querySelector("#SCREEN_SHOOT_AREA") as HTMLElement;
    if (!node) return;
    toCanvas(node, {
      pixelRatio: window.devicePixelRatio * (isWebview() ? 2 : 1),
      filter: (node) => {
        console.log("node", node);
        return !node.classList.contains("html2img-ignore");
      }
    }).then((canvas) => {
      setCurrCanvas(canvas);
    });
    // html2canvas(node, {
    //   logging: process.env.NODE_ENV !== "production",
    //   allowTaint: true,
    //   useCORS: true,
    //   // debug: process.env.NODE_ENV !== 'production',
    //   scale: window.devicePixelRatio * (isWebview() ? 2 : 1),
    //   onclone: (document) => {
    //     const node = document.querySelector("#SCREENSHOT_AREA .window-body") as HTMLElement;
    //     if (node) {
    //       node.style.margin = "0";
    //       node.style.padding = "8px";
    //       // node.style.boxShadow = "none";
    //     }
    //   }
    // }).then((canvas) => {
    //   setCurrCanvas(canvas);
    // });
  };
  const toggleModalVisible = () => {
    setModalVisible((prev) => {
      if (!prev) {
        generateScreenShot();
      }
      return !prev;
    });
  };
  const handleSave = () => {
    if (currCanvas) {
      currCanvas.toBlob((blob) => {
        saveAs(blob || "", `oms-${new Date().getTime()}.png`);
        // setGenerating(false);
      }, "image/png");
    }
  };
  const disabled = !(gameStatus == "loss" || gameStatus == "win");
  return (
    <>
      {modalVisible ? (
        <Modal mask>
          <div className="window max-dvh-screen dark:brightness-75">
            <WindowTitleBar title="Screen shoot">
              <button aria-label="Close" onClick={toggleModalVisible}></button>
            </WindowTitleBar>
            <div className="window-body relative py-3 flex flex-col items-center gap-2">
              {currCanvas ? (
                <Image
                  width={currCanvas.width}
                  height={currCanvas.height}
                  className="max-h-[1000px] m-auto"
                  src={currCanvas.toDataURL("image/png")}
                  alt="screen shoot"
                />
              ) : (
                <Loading />
              )}
              {currCanvas && (
                <button className="m-auto" onClick={handleSave}>
                  Save
                </button>
              )}
            </div>
          </div>
        </Modal>
      ) : null}
      <button
        id="SCREEN_SHOOT_BUTTON"
        onClick={toggleModalVisible}
        disabled={disabled}
        className={clsx("min-w-[unset] !p-1 disabled:cursor-not-allowed", modalVisible && "active")}
      >
        <Image
          className={disabled ? "grayscale opacity-60" : ""}
          alt="screen shoot button"
          src={"/win/camera.png"}
          width={22}
          height={22}
        />
      </button>
    </>
  );
};

export default ScreenShot;
