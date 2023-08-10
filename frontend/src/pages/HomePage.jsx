import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../store/reducers/categoryReducer";
import { get_jobs } from "../store/reducers/JobReducer";
import MyPagination from "../components/MyPagination";
import { NavLink } from "react-router-dom";
import Banner from "../components/Banner";
import { MdAddLocationAlt } from "react-icons/md";
import { ImPlus } from "react-icons/im";
import Loading from "../components/Loading";

const HomePage = () => {
  const { categorys } = useSelector((state) => state.cate);
  const { jobs, uniqLocations, count, pages, loading } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [cat, setCat] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  let [color, setColor] = useState("#EC8422");

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
    <>
      <div className="min-h-screen bg-slate-100">
        <Banner setKeyword={setKeyword} />
        <div className=" container mx-auto flex gap-5">
          <div className="w-1/4 pt-5">
            <div className="bg-white p-4 ">
              <h3 className="font-semibold text-2xl text-orange-500 mb-4">Find Job By Category</h3>
              <select
                className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none hover:bg-slate-100 text-slate-500 font-medium"
                onChange={handleChangeCategory}
              >
                <option value="" className=" text-slate-500 font-medium ">
                  All Category
                </option>
                {categorys?.map((c, i) => (
                  <option className=" text-slate-500 font-medium capitalize" key={i + 1} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white p-4 mt-4">
              <h3 className="font-semibold text-2xl text-orange-500 mb-4">Find Job By Category</h3>
              <div className="flex flex-col mt-4">
                {uniqLocations.map((lc, i) => (
                  <div className="flex items-center m-2 px-4 rounded" key={i + 1}>
                    <input
                      type="radio"
                      name="all"
                      id={i + 1}
                      value={lc}
                      onClick={(e) => handleChange(e)}
                      className="hidden"
                    />
                    <label
                      htmlFor={i + 1}
                      className="ml-2 text-slate-500 font-medium text-[16px] cursor-pointer flex  gap-x-6 items-center capitalize"
                    >
                      <span className="text-orange-500 text-[18px]">
                        <MdAddLocationAlt />
                      </span>
                      {lc}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-4 my-4 ">
              <h3 className="font-semibold text-2xl text-orange-500 mb-4">Sort By Date</h3>

              <select
                className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none hover:bg-slate-100 text-slate-500 font-medium capitalize"
                onClick={(e) => setSort(e.target.value)}
              >
                <option className="font-medium" value="">
                  Sort Now
                </option>
                <option className="font-medium" value="new">
                  New to Old
                </option>
                <option className="font-medium" value="old">
                  Old to New
                </option>
              </select>
            </div>
          </div>
          <div className="flex-1 bg-slate-100">
            <div className="min-h-[400px]">
              {loading ? (
                <div className="flex items-center justify-center min-h-[70vh]">
                 <Loading />
                </div>
              ) : jobs.length > 0 ? (
                jobs?.map((job, i) => (
                  <div className="m-4 bg-white p-4 rounded" key={i + 1}>
                    <p className=" flex text-orange-500 items-center gap-3 font-medium">
                      <span className="text-orange-500 text-[18px]">
                        <MdAddLocationAlt />
                      </span>
                      {job.location}
                    </p>
                    <h2 className="text-2xl text-slate-700 font-semibold py-2">{job.title}</h2>
                    <p className="text-slate-500 font-semibold py-1">{job.description.slice(0, 250)}...</p>
                    <p className="text-slate-600 font-semibold ">Salary: {job.salary}</p>
                    <NavLink
                      className="bg-orange-500 px-4 py-2 mt-2 flex gap-3 w-[180px] items-center  rounded text-white hover:bg-orange-600 transition duration-300 text-[17px] font-medium"
                      to={`/jobdetails/${job._id}`}
                    >
                      <span>
                        <ImPlus />
                      </span>{" "}
                      More Details
                    </NavLink>
                  </div>
                ))
              ) : (
                <div className="mt-5 min-h-[69vh] bg-white flex justify-center items-center">
                  <h2 className="text-center text-6xl text-slate-500 font-medium">No Data Found</h2>
                </div>
              )}
            </div>
            {count > 6 && (
              <div className="ml-4">
                <MyPagination page={page} setPage={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
