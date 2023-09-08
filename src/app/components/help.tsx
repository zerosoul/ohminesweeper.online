import React, { useState } from "react";
import Modal from "./modal";
import Image from "next/image";
import clsx from "clsx";

type Props = {};

const Help = (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisible = () => {
    setModalVisible((prev) => {
      return !prev;
    });
  };
  return (
    <>
      {modalVisible ? (
        <Modal>
          <div className="window">
            <div className="title-bar">
              <div className="title-bar-text">Help</div>
              <div className="title-bar-controls">
                <button aria-label="Close" onClick={toggleModalVisible}></button>
              </div>
            </div>
            <div className="window-body py-4  px-6 flex flex-col items-center gap-2">
              help content
            </div>
          </div>
        </Modal>
      ) : null}

      <button
        id="HELP_TASK_BUTTON"
        onClick={toggleModalVisible}
        className={clsx("min-w-[unset] !p-1 disabled:cursor-not-allowed", modalVisible && "active")}
      >
        <Image
          //   className={}
          alt="help button"
          src={"/help.png"}
          width={22}
          height={22}
        />
      </button>
    </>
  );
};

export default Help;
