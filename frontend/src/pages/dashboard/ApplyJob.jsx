import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_apply_job, get_all_apply_job } from "../../store/reducers/JobReducer";
import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";
import Loading from "./../../components/Loading";

const ApplyJob = () => {
  const dispatch = useDispatch();
  const { allApplyCount, allApplyjob, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(get_all_apply_job());
  }, [delete_apply_job]);

  return (
    <div>
      <h3 className="bg-white w-11/12 mx-auto py-3 mt-3 px-4 text-3xl text-slate-600 font-semibold">
        Total Job Applied{allApplyCount}
      </h3>
      {loading ? (
        <div className=" w-11/12 mx-auto h-[80vh] mt-2 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
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
              {allApplyjob?.map((j, i) => {
                return (
                  <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                    <td className="py-2">{i + 1}</td>
                    <td className="py-2">{j.name}</td>
                    <td>{j.email}</td>
                    <td>{j.resume}</td>
                    <td>
                      <button
                        onClick={() => dispatch(delete_apply_job(j._id))}
                        className="py-2 text-lg text-white hover:bg-orange-600 px-2 bg-orange-500"
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ApplyJob;
