import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { delet_job, messageClear, table_jobs } from "../../store/reducers/JobReducer";
import MyPagination from "../../components/MyPagination";
import SearchBox from "../../components/SearchBox";
import { toast } from "react-toastify";
import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";
import Loading from "./../../components/Loading";

const Table = () => {
  const dispatch = useDispatch();
  const { tableJobs, count, loading, successMessage, errorMessage } = useSelector((state) => state.job);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const handleDeleteJob = (id) => {
    dispatch(delet_job({ id }));
  };

  useEffect(() => {
    dispatch(table_jobs({ page, keyword }));
  }, [setPage, page, keyword, setKeyword, successMessage]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className=" mx-auto mb-6 dash-table">
      <div className="flex justify-end w-full mx-auto">
        <div className="bg-white md-lg:w-6/12 w-full flex justify-end border">
          <SearchBox setKeyword={setKeyword} />
        </div>
      </div>
      <table className="bg-white w-full mx-auto text-center border mt-3">
        {loading ? (
          <div className="h-[350px] w-full">
            <Loading />
          </div>
        ) : (
          <>
            {count > 0 ? (
              <>
                <thead className=" bg-slate-300 py-2">
                  <tr className="border overflow-x-auto">
                    <th className="py-2 text-xs md:text-base md-lg:text-lg ">ID</th>
                    <th className="py-2 text-xs md:text-base md-lg:text-lg">Title</th>
                    <th className="py-2 text-xs md:text-base md-lg:text-lg ">Description</th>
                    <th className="py-2 text-xs md:text-base md-lg:text-lg">Salary</th>
                    {/* <th className="py-2 text-xs md:text-base md-lg:text-lg sm:block hidden">Location</th> */}
                    {/* <th className="py-2 text-xs md:text-base md-lg:text-lg">Category</th> */}
                    <th className="py-2 text-sm md:text-base md-lg:text-lg ">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableJobs?.map((j, i) => {
                    return (
                      <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                        <td className="py-2 whitespace-normal md-lg:text-base text-xs ">{i + 1}</td>
                        <td className="py-2 whitespace-normal md-lg:text-base text-xs">
                          {j.title.slice(0, 9)}..
                        </td>
                        <td className="py-2 whitespace-normal md-lg:text-base text-xs ">
                          {j.description.slice(0, 30)}..
                        </td>
                        <td className="whitespace-normal md-lg:text-base text-xs">{j.salary}</td>
                        {/* <td className="whitespace-normal md-lg:text-base text-xs sm:block hidden">
                          {j.location.slice(0, 8)}
                        </td> */}
                        {/* <td className="whitespace-normal md-lg:text-base text-xs">
                          {j.category?.name.slice(0, 9)}..
                        </td> */}
                        <td className="flex items-center justify-center gap-1">
                          <NavLink
                            to={`/dashboard/editjob/${j._id}`}
                            className="md:py-1 md:px-2 px-[3px] text-white hover:bg-orange-600 text-sm md-lg:text-lg  bg-orange-500 mr-2"
                          >
                            <button>
                              <RiEditBoxLine />
                            </button>
                          </NavLink>
                          <button
                            onClick={() => handleDeleteJob(j._id)}
                            className="md:py-[9px] md:px-2 px-[3px] py-[3px] text-white hover:bg-red-600 text-sm md-lg:text-lg  bg-red-500"
                          >
                            <RiDeleteBin5Fill />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </>
            ) : (
              <div className="h-[300px] flex justify-center items-center">
                <h3 className="text-4xl text-slate-600 font-semibold">No Data Found</h3>
              </div>
            )}
          </>
        )}
      </table>
      {loading ? (
        ""
      ) : (
        <>
          {count > 8 && (
            <>
              <div className="bg-white w-full mx-auto text-right border">
                <div className="mr-8">
                  <MyPagination setPage={setPage} page={page} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Table;
