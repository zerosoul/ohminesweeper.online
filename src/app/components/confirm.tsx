import React, { ReactNode } from "react";
import WindowTitleBar from "./window-title-bar";
import Modal from "./modal";

type Props = {
  content: ReactNode;
  close: () => void;
  confirm: () => void;
};

const Confirm = ({ content, close, confirm }: Props) => {
  const handleOK = () => {
    confirm();
    close();
  };
  return (
    <Modal id="confirm-modal">
      <div className="window w-64">
        <WindowTitleBar>
          <button onClick={close} aria-label="Close"></button>
        </WindowTitleBar>
        <div className="window-body">
          <p className="my-4">{content}</p>
          <div className="field-row justify-end">
            <button onClick={handleOK}>OK</button>
            <button onClick={close}>Cancel</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
