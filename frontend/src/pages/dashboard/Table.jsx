import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { delet_job, table_jobs } from "../../store/reducers/JobReducer";
import MyPagination from "../../components/MyPagination";
import SearchBox from "../../components/SearchBox";

const Table = () => {
  const dispatch = useDispatch();
  const { tableJobs, uniqLocations, count, pages, loading } = useSelector((state) => state.job);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const handleDeleteJob = (id) => {
    dispatch(delet_job({ id }));
  };

  useEffect(() => {
    dispatch(table_jobs({ page, keyword }));
  }, [setPage, page, keyword, setKeyword]);

  return (
    <div className="bg-slate-100 dash-table">
      <div className="flex justify-end w-11/12 mx-auto">
        <div className="bg-white  w-6/12 m- flex justify-end border">
          <SearchBox setKeyword={setKeyword} />
          {/* <input
            className="py-2 w-full outline-none px-5 font-semibold"
            type="text"
            placeholder="Search Job"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="py-2 px-5 bg-orange-500 text-white font-semibold ">Submit</button> */}
        </div>
      </div>
      <table className="bg-white w-11/12 mx-auto text-center border mt-3">
        <thead className=" bg-slate-200 py-2">
          <tr className="border">
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
                    <td className="py-2">{j.title}</td>
                    <td>{j.description}</td>
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
