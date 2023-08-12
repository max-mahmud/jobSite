import React from "react";
import SearchBox from "./SearchBox";

const Banner = ({ setKeyword }) => {
  return (
    <div className="bg-img md-lg:h-72 h-60 w-full">
      <div className="bg-overlay w-full h-full flex justify-center items-center">
        <div className="md:w-8/12 w-11/12">
        <SearchBox setKeyword={setKeyword} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
