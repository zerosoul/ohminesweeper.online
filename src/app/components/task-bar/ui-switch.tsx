import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUI } from "@/redux/slice/user.data";
// import dynamic, { LoadableComponent } from "next/dynamic";
import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "../modal";
import Loading from "../loading";
import { UI } from "@/types";
// import * as wtf from "98.css?url";

// type Props = {}

const UISwitch = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const ui = useAppSelector((store) => store.userData.ui);
  useEffect(() => {
    const styleUrl = ui == "win98" ? `https://unpkg.com/98.css` : "https://unpkg.com/xp.css";
    if (ui == "xp") {
      document.documentElement.classList.add("theme-xp");
    } else {
      document.documentElement.classList.remove("theme-xp");
    }
    const appendStyleSheetElement = (url: string) => {
      const _link = document.querySelector(`#theme-ui`) as HTMLLinkElement;
      setLoading(true);
      if (_link) {
        _link.href = url;
        setLoading(false);
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.id = "theme-ui";
        link.href = url;
        link.onload = () => {
          setLoading(false);
        };
        link.onerror = () => {
          setLoading(false);
        };
        document.head.appendChild(link);
      }
    };
    appendStyleSheetElement(styleUrl);

    // import(cssLib);
    // const Style = dynamic(() => import(cssLib), { ssr: false });
    // setStyle(Style);
    // console.log({ wtf });
  }, [ui]);

  const handleUpdateUI = (evt: ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value as UI;
    if (ui !== value) {
      dispatch(updateUI(value));
    }
  };

  return (
    <>
      {loading && (
        <Modal>
          <Loading />
        </Modal>
      )}
      <select onChange={handleUpdateUI} value={ui}>
        <option value="xp">Window XP</option>
        <option value="win98">Window 98</option>
      </select>
    </>
  );
};

export default UISwitch;
