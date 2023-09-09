import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { shallowEqual } from "react-redux";
import { toPng } from "html-to-image";
import Modal from "./modal";
import Image from "next/image";
import clsx from "clsx";
import WindowTitleBar from "./window-title-bar";
import Loading from "./loading";

type Props = {};

const ScreenShoot = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [screenURL, setScreenURL] = useState("");
  const gameStatus = useAppSelector((store) => store.minesweeper.status, shallowEqual);
  const generateScreenShoot = () => {
    const node = document.getElementById("SCREEN_SHOOT_AREA");
    if (node) {
      const filter = (node: HTMLElement) => {
        const exclusionClasses = ["fsh"];
        return !exclusionClasses.some((classname) => node.classList?.contains(classname));
      };
      toPng(node, {
        filter
        // style: {
        //   backgroundColor: "white"
        // }
      }).then((dataUrl) => {
        console.log("dataUrl", dataUrl);
        setScreenURL(dataUrl);
      });
    }
  };
  const toggleModalVisible = () => {
    setModalVisible((prev) => {
      if (!prev) {
        generateScreenShoot();
      }
      return !prev;
    });
  };
  const handleSave = () => {
    var link = document.createElement("a");
    link.download = `ms.${new Date().getTime()}.jpeg`;
    link.href = screenURL;
    link.click();
  };
  const disabled = !(gameStatus == "loss" || gameStatus == "win");
  return (
    <>
      {modalVisible ? (
        <Modal>
          <div className="window max-h-screen">
            <WindowTitleBar title="Screen shoot">
              <button aria-label="Close" onClick={toggleModalVisible}></button>
            </WindowTitleBar>
            <div className="window-body py-4  px-6 flex flex-col items-center gap-2">
              {screenURL ? (
                <img className="max-h-[1200px]" src={screenURL} alt="screen shoot" />
              ) : (
                <Loading />
              )}
              <button className="m-auto" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
      <button
        onClick={toggleModalVisible}
        disabled={disabled}
        className={clsx("min-w-[unset] !p-1 disabled:cursor-not-allowed", modalVisible && "active")}
      >
        <Image
          className={disabled ? "grayscale opacity-60" : ""}
          alt="screen shoot button"
          src={"/camera.png"}
          width={22}
          height={22}
        />
      </button>
    </>
  );
};

export default ScreenShoot;
