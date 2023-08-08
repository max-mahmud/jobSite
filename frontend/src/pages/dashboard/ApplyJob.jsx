import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { delete_apply_job, get_all_apply_job } from "../../store/reducers/JobReducer";

const ApplyJob = () => {
  const dispatch = useDispatch();
  const { allApplyCount, allApplyjob } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(get_all_apply_job());
  }, [delete_apply_job]);

  const loading = false;

  return (
    <div>
      <table className="bg-white w-11/12 mx-auto text-center border mt-3">
        <thead className=" bg-slate-300 py-2">
          <tr className="border">
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th>Email</th>
            <th>PDF Files</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? "loading......."
            : allApplyjob?.map((j, i) => {
                return (
                  <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">{j.name}</td>
                    <td>{j.email}</td>
                    <td>{j.resume}</td>
                    <td>
                      <button
                        onClick={() => dispatch(delete_apply_job(j._id))}
                        className="py-1 text-white hover:bg-orange-600 px-3 bg-orange-500"
                      >
                        D
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default ApplyJob;
