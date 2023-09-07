import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import { shallowEqual } from "react-redux";
import { toPng } from "html-to-image";
import Modal from "./modal";

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
  return (
    <>
      {modalVisible ? (
        <Modal>
          <div className="window">
            <div className="title-bar">
              <div className="title-bar-text">Screen Shoot</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={toggleModalVisible}></button>
              </div>
            </div>
            <div className="window-body">
              {screenURL ? <img src={screenURL} alt="screen shoot" /> : "Generating..."}
            </div>
          </div>
        </Modal>
      ) : null}
      <button
        onClick={toggleModalVisible}
        disabled={!(gameStatus == "loss" || gameStatus == "win")}
      >
        Screen Shoot
      </button>
      ;
    </>
  );
};

export default ScreenShoot;
