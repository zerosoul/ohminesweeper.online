import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  id?: string;
  mask?: boolean;
  children: React.ReactNode;
}

const Modal = ({ id = "root-modal", mask = true, children }: Props) => {
  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const modalRoot = document.getElementById(id);
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
  }, [mask, id]);

  if (!wrapper) return null;
  // @ts-ignore
  return createPortal(children, wrapper) as React.ReactNode;
};

export default Modal;
