import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../store/reducers/categoryReducer";
import { get_jobs } from "../store/reducers/JobReducer";
import MyPagination from "../components/MyPagination";
import { NavLink } from "react-router-dom";
import Banner from "../components/Banner";
import { ImPlus } from "react-icons/im";
import Loading from "../components/Loading";
import { MdAddLocationAlt } from "react-icons/md";
import Filter from "../components/Filter";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
  const { categorys } = useSelector((state) => state.cate);
  const { jobs, uniqLocations, count, pages, loading } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [cat, setCat] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(get_category());
  }, [dispatch]);

  useEffect(() => {
    dispatch(get_jobs({ page, cat, keyword, location, sort }));
  }, [dispatch, page, cat, setCat, keyword, location, setLocation, sort]);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-100">
        <Banner setKeyword={setKeyword} />
        <div className=" container mx-auto flex md-lg:flex-row flex-col gap-5">
          <div className="w-full mt-4 md-lg:hidden block">
            <button
              onClick={() => setOpen(!open)}
              className="w-full bg-orange-500 text-slate-100 font-medium px-7 py-2"
            >
              Click To filter
            </button>
          </div>
          <div className="w-1/4 pt-5 ml-2 hidden md-lg:block">
            <Filter
              handleChange={handleChange}
              categorys={categorys}
              handleChangeCategory={handleChangeCategory}
              uniqLocations={uniqLocations}
              setSort={setSort}
            />
          </div>
          {/* IT is for responsive */}
          {open && (
            <div className="w-full pt-5 block md-lg:hidden">
              <Filter
                handleChange={handleChange}
                categorys={categorys}
                handleChangeCategory={handleChangeCategory}
                uniqLocations={uniqLocations}
                setSort={setSort}
              />
            </div>
          )}
          {/* Right section */}

          <div className="flex-1 bg-slate-100">
            <div className="min-h-[400px]">
              {loading ? (
                <div className="flex items-center mt-4 justify-center h-[60vh]">
                  <Loading />
                </div>
              ) : jobs.length > 0 ? (
                jobs?.map((job, i) => (
                  <div className=" my-4 bg-white p-4 rounded  shadow-md" key={i + 1}>
                    <p className=" flex text-orange-500 items-center gap-3 font-medium">
                      <span className="text-orange-500 text-[17px]">
                        <MdAddLocationAlt />
                      </span>
                      {job.location}
                    </p>
                    <h2 className="text-xl text-slate-700 capitalize font-semibold py-2">{job.title}</h2>
                    <p className="text-slate-500 text-sm  font-semibold py-1">
                      {job.description.slice(0, 250)}...
                    </p>
                    <p className="text-slate-600 font-semibold ">Salary: ${job.salary}</p>
                    <NavLink
                      className="bg-orange-500 px-4 py-[6px] text-sm mt-2 flex gap-3 w-[160px] items-center  rounded text-white hover:bg-orange-600 transition duration-300 text-[17px] font-medium"
                      to={`/jobdetails/${job?._id}`}
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
              <div className="ml-0 md-lg:ml-4">
                <MyPagination page={page} setPage={setPage} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
