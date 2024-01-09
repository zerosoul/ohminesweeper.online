import React, { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  list: {
    value: string;
    name: string;
  }[];
};

const Select = ({ disabled, value, onChange, list }: Props) => {
  return (
    <select
      disabled={disabled}
      value={value}
      className="capitalize dark:bg-[--theme-desktop-dark-bg] dark:text-gray-100 font-semibold"
      onChange={onChange}
    >
      {list.map(({ name, value }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
