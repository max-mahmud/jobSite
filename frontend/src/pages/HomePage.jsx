import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import API from "../API/Api";
import { get_category } from "../store/reducers/categoryReducer";
import { get_jobs } from "../store/reducers/JobReducer";
import { useParams } from "react-router-dom";

const HomePage = () => {
  const { category } = useSelector((state) => state.cate);
  const { jobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const { keyword, location } = useParams();
  const [cat, setCat] = React.useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(get_category());
  }, [get_category]);

  useEffect(() => {
    dispatch(get_jobs(page, keyword, cat, location));
  }, [page, keyword, cat, location]);

  const handleChangeCategory = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="min-h-screen block bg-slate-500 flex">
      <div>
        <div className="w-40 p-4 bg-zinc-500">
          <select onClick={handleChangeCategory} name="" id="">
            <option value="">Select Category</option>
            {category?.map((c, i) => {
              return <option key={i+1} value={c._id}>{c.name}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="flex-1 bg-green-300 p-5">
        <h2>Home</h2>
        {jobs?.map((job) => {
          return (
            <div className="m-4 bg-orange-400 p-2">
              <h2>{job.title}</h2>
              <h3>{job.description}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
