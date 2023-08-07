import React, { useEffect, useState } from "react";

const SearchBox = ({ setKeyword }) => {
  const [data, setData] = useState("");

  const handleSubmit = () => {
    setKeyword(data);
  };

  useEffect(() => {
    if (data === "") {
      setKeyword("");
    }
  }, [data]);

  return (
    <div>
      <input className="py-2 outline-none px-7"
        type="text"
        placeholder=" search"
        name="search"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleSubmit} className="py-2 px-5 bg-amber-600">
        Search
      </button>
    </div>
  );
};

export default SearchBox;
