import React from "react";
import SearchBox from "./SearchBox";

const Banner = ({ setKeyword }) => {
  return (
    <div className="bg-img h-80 w-full">
      <div className="bg-overlay w-full h-full flex justify-center items-center">
        <div className="w-8/12">
        <SearchBox setKeyword={setKeyword} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
