import React, { ReactNode } from "react";
import WindowTitleBar from "./window-title-bar";
import Modal from "./modal";

type Props = {
  title?: string;
  content: ReactNode;
  close: () => void;
  disableCancel?: boolean;
  confirm?: () => void;
};

const Confirm = ({ content, disableCancel = false, title, close, confirm }: Props) => {
  const handleOK = () => {
    if (confirm) {
      confirm();
    }
    close();
  };
  return (
    <Modal id="confirm-modal" mask={false}>
      <div className="window min-w-[256px] mx-2">
        <WindowTitleBar title={title}>
          <button onClick={close} aria-label="Close"></button>
        </WindowTitleBar>
        <div className="window-body">
          <div className="my-4">{content}</div>
          <div className="field-row justify-end">
            {confirm && <button onClick={handleOK}>OK</button>}
            {!disableCancel && <button onClick={close}>Cancel</button>}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Confirm;
