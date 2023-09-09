import React from "react";
import Select from "./select";

type Props = {};

const Language = (props: Props) => {
  return (
    <Select
      value={"English"}
      // onChange={handleSizeChange}
      list={["English", "简体中文"].map((name) => {
        return { value: name, name };
      })}
    />
  );
};

export default Language;
