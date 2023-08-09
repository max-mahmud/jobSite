import React from "react";
import SearchBox from "./SearchBox";

const Banner = ({ setKeyword }) => {
  return (
    <div className="bg-img h-80 w-full">
      <div className="bg-overlay w-full h-full flex justify-center items-center">
        <SearchBox setKeyword={setKeyword} />
      </div>
    </div>
  );
};

export default Banner;
