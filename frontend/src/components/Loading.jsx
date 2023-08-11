import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const Loading = () => {
  let [color, setColor] = useState("#EC8422");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="w-full h-full  bg-[#FFFFFF73] flex justify-center items-center">
      <HashLoader
        color={color}
        size={60}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
