import React from "react";

interface Props {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
  config?: Object;
}

export default function Input({
  type,
  name,
  value,
  onChange,
  placeholder,
  config,
}: Props) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.name, e.target.value)}
        className=" text-gray-900 text-sm border border-gray-300 px-4 py-2 rounded-md outline-none"
        {...config}
      />
    </>
  );
}
