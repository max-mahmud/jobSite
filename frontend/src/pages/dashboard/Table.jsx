import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { delet_job, table_jobs } from "../../store/reducers/JobReducer";
import MyPagination from "../../components/MyPagination";
import SearchBox from "../../components/SearchBox";
import { toast } from "react-toastify";
import { messageClear } from "../../store/reducers/categoryReducer";
import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";
import Loading from "./../../components/Loading";

const Table = () => {
  const dispatch = useDispatch();
  const { tableJobs, successMessage, uniqLocations, count, pages, loading } = useSelector(
    (state) => state.job
  );
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const handleDeleteJob = (id) => {
    dispatch(delet_job({ id }));
    if (successMessage) {
      toast.success(successMessage);
      // dispatch(messageClear());
    }
  };

  useEffect(() => {
    dispatch(table_jobs({ page, keyword }));
  }, [setPage, page, keyword, setKeyword, count]);

  return (
    <div className=" dash-table">
      <div className="flex justify-end w-11/12 mx-auto">
        <div className="bg-white w-6/12 flex justify-end border">
          <SearchBox setKeyword={setKeyword} />
        </div>
      </div>
      <table className="bg-white w-11/12 mx-auto text-center border mt-3">
        {loading ? (
          <div className="h-[350px] w-full">
            <Loading />
          </div>
        ) : (
          <>
            {count > 0 ? (
              <>
                <thead className=" bg-slate-300 py-2">
                  <tr className="border">
                    <th className="py-2">ID</th>
                    <th className="py-2">Title</th>
                    <th>Description</th>
                    <th>Salary</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th className="w-[150px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableJobs?.map((j, i) => {
                    return (
                      <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                        <td className="py-2">{i + 1}</td>
                        <td className="py-2">{j.title}</td>
                        <td>{j.description.slice(0, 30)}..</td>
                        <td>{j.salary}</td>
                        <td>{j.location}</td>
                        <td>{j.category.name}</td>
                        <td>
                          <NavLink
                            to={`/dashboard/editjob/${j._id}`}
                            className="py-1 text-white hover:bg-orange-600 px-2 text-lg  bg-orange-500 mr-2"
                          >
                            <button>
                              <RiEditBoxLine />
                            </button>
                          </NavLink>
                          <button
                            onClick={() => handleDeleteJob(j._id)}
                            className="py-[7px] text-white hover:bg-orange-600 text-lg px-2 bg-orange-500"
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
              <div className="bg-white w-11/12 mx-auto text-right border">
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
