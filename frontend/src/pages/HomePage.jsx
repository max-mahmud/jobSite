import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../store/reducers/categoryReducer";
import { get_jobs } from "../store/reducers/JobReducer";
import HashLoader from "react-spinners/HashLoader";
import MyPagination from "../components/MyPagination";
import { NavLink } from "react-router-dom";
import SearchBox from "../components/SearchBox";

const HomePage = () => {
  const { categorys } = useSelector((state) => state.cate);
  const { jobs, uniqLocations, count, pages, loading } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [cat, setCat] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  let [color, setColor] = useState("#ffffff");

  useEffect(() => {
    dispatch(get_category());
  }, [get_category]);

  useEffect(() => {
    dispatch(get_jobs({ page, cat, keyword, location, sort }));
  }, [page, cat, setCat, keyword, location, setLocation, sort]);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="min-h-screen bg-slate-500 flex">
      <div className="w-1/4 p-4 bg-zinc-500">
        <select
          className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleChangeCategory}
        >
          <option value="">Select Category</option>
          {categorys?.map((c, i) => (
            <option key={i + 1} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <div className="flex flex-col mt-4">
          {uniqLocations.map((lc, i) => (
            <div className="flex m-2 px-2 bg-green-400 rounded-md" key={i + 1}>
              <input type="radio" name="all" id={i + 1} value={lc} onClick={(e) => handleChange(e)} />
              <label htmlFor={i + 1} className="ml-2">
                {lc}
              </label>
            </div>
          ))}
        </div>
        <div className="bg-cyan-500 p-4 mt-4">
          <select
            className="w-full p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => setSort(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="new">New to Old</option>
            <option value="old">Old to New</option>
          </select>
        </div>
      </div>
      <div className="flex-1 bg-green-300 p-5">
        <div className="flex bg-teal-600 p-5 m-2">
          <SearchBox setKeyword={setKeyword} />
        </div>

        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <HashLoader
                color={color}
                size={60}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          ) : jobs.length > 0 ? (
            jobs?.map((job, i) => (
              <div className="m-4 bg-orange-400 p-2 rounded-md" key={i + 1}>
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-700">{job.description}</p>
                <p className="text-gray-600">Location: {job.location}</p>
                <p className="text-gray-600">Salary: {job.salary}</p>
                <NavLink
                  className="bg-teal-500 px-4 py-1 mt-2 inline-block rounded-md text-white hover:bg-teal-600 transition duration-300"
                  to={`/jobdetails/${job._id}`}
                >
                  View Details
                </NavLink>
              </div>
            ))
          ) : (
            <div className="mt-8">
              <h2 className="text-center text-4xl">No data found</h2>
            </div>
          )}
        </div>
        <div>
          <MyPagination page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
