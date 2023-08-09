import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { delet_job, table_jobs } from "../../store/reducers/JobReducer";
import MyPagination from "../../components/MyPagination";
import SearchBox from "../../components/SearchBox";
import { toast } from "react-toastify";
import { messageClear } from "../../store/reducers/categoryReducer";

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
        <div className="bg-white  w-6/12 m- flex justify-end border">
          <SearchBox setKeyword={setKeyword} />
        </div>
      </div>
      <table className="bg-white w-11/12 mx-auto text-center border mt-3">
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
          {loading
            ? "loading......."
            : tableJobs?.map((j, i) => {
                return (
                  <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">{j.title}</td>
                    <td>{j.description.slice(0,30)}..</td>
                    <td>{j.salary}</td>
                    <td>{j.location}</td>
                    <td>{j.category.name}</td>
                    <td>
                      <NavLink
                        to={`/dashboard/editjob/${j._id}`}
                        className="py-1 text-white hover:bg-orange-600 px-3  bg-orange-500 mr-2"
                      >
                        E
                      </NavLink>
                      <NavLink
                        onClick={() => handleDeleteJob(j._id)}
                        className="py-1 text-white hover:bg-orange-600 px-3 bg-orange-500"
                      >
                        D
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <div className="bg-white w-11/12 mx-auto text-right border">
        <div className="mr-8">
          <MyPagination setPage={setPage} page={page} />
        </div>
      </div>
    </div>
  );
};

export default Table;
