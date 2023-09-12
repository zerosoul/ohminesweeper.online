import { FC, PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  mask?: boolean;
}

const Modal: FC<PropsWithChildren<Props>> = ({ mask = true, children }) => {
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById("root-modal");
    if (!modalRoot) return;
    if (mask) {
      modalRoot.classList.add("mask");
    }
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    modalRoot.appendChild(wrapper);
    setWrapper(wrapper);
    return () => {
      modalRoot.removeChild(wrapper);
      if (mask) {
        modalRoot.classList.remove("mask");
      }
    };
  }, [mask]);

  if (!wrapper) return null;
  return createPortal(children, wrapper);
};

export default Modal;
