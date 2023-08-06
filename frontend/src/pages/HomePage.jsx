import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../store/reducers/categoryReducer";
import { get_jobs, test_job } from "../store/reducers/JobReducer";
import HashLoader from "react-spinners/HashLoader";
import MyPagination from "../components/MyPagination";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const { category } = useSelector((state) => state.cate);
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

  const handlesettle = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(keyword);
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
    <div className="min-h-screen  bg-slate-500 flex">
      <div>
        <div className="w-40 p-4 bg-zinc-500">
          <select onClick={handleChangeCategory} name="" id="">
            <option value="">Select Category</option>
            {category?.map((c, i) => {
              return (
                <option key={i + 1} value={c._id}>
                  {c.name}
                </option>
              );
            })}
          </select>
          <div className="flex flex-col mt-2">
            {uniqLocations.map((lc, i) => {
              return (
                <div className="flex m-2 px-2 bg-green-400 " key={i + 1}>
                  <input type="radio" name="all" id={i + 1} value={lc} onClick={(e) => handleChange(e)} />
                  <label htmlFor={i + 1}>{lc}</label>
                </div>
              );
            })}
          </div>
          <div className="bg-cyan-500 p-4">
            <select name="" id="" onClick={(e) => setSort(e.target.value)}>
              <option value="new">New to Old</option>
              <option value="old">Old to New</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-green-300 p-5">
        <div className="flex bg-teal-600 p-5 m-2">
          <form onSubmit={handleSearch}>
            <input
              className="py-2 px-5"
              type="text"
              placeholder="search here"
              value={keyword}
              onChange={handlesettle}
            />
            <button className="px-4 py-2 bg-orange-500">Search</button>
          </form>
        </div>

        <div className="min-h-[400px]">
          {loading ? (
            <HashLoader
              color={color}
              size={60}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : jobs.length > 0 ? (
            jobs?.map((job, i) => {
              return (
                <div className="m-4 bg-orange-400 p-2" key={i + 1}>
                  <h2>{job.title}</h2>
                  <h3>{job.description}</h3>
                  <h3>{job.location}</h3>
                  <h3>{job.salary}</h3>
                  <NavLink className="bg-teal-500 px-4 py-1 m-2" to={`/jobdetails/${job._id}`}>
                    View Details
                  </NavLink>
                </div>
              );
            })
          ) : (
            <>
              <div className="mt-8">
                <h2 className="text-center text-4xl">No data found</h2>
              </div>
            </>
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
