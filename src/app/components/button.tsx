import React from "react";

interface Props {
  name: string;
  onClick?: () => void;
  config?: Object;
  isLoading?: boolean;
}

export default function Button({ name, onClick, config, isLoading }: Props) {
  return (
    <>
      <button
        onClick={onClick}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 mb-4"
        {...config}
      >
        {isLoading ? "Loading..." : name}
      </button>
    </>
  );
}
