import React from "react";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-full min-h-screen absolute top-0 right-0 left-0 bottom-0 bg-slate-400 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <MoonLoader color="#AF6606" size={60} />
        <h4 className="mt-4 text-white text-lg font-semibold">Loading...</h4>
      </div>
    </div>
  );
};

export default Loading;
