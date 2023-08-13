import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_apply_job, get_all_apply_job, messageClear } from "../../store/reducers/JobReducer";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Loading from "./../../components/Loading";
import { toast } from "react-toastify";

const ApplyJob = () => {
  const dispatch = useDispatch();
  const { allApplyCount, allApplyjob, loading, successMessage, errorMessage } = useSelector(
    (state) => state.job
  );

  useEffect(() => {
    dispatch(get_all_apply_job());
  }, [successMessage, dispatch, errorMessage]);

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
    <div>
      <h3 className="bg-white w-11/12 mx-auto py-3 mt-3 px-4 text-2xl text-slate-600 font-semibold">
        Total Job Applied {allApplyCount}
      </h3>
      {loading ? (
        <div className=" w-11/12 mx-auto h-[50vh] mt-2 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <table className="bg-white w-11/12 mx-auto text-center border mt-3">
            <thead className=" bg-slate-300 py-2">
              <tr className="border">
                <th className="py-2 text-sm md:text-base">ID</th>
                <th className="py-2 text-sm md:text-base">Name</th>
                <th className="text-sm md:text-base">Email</th>
                <th className="text-sm md:text-base">PDF Files</th>
                <th className="text-sm md:text-base">Action</th>
              </tr>
            </thead>
            <tbody>
              {allApplyjob?.map((j, i) => {
                return (
                  <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                    <td className="py-2 text-sm md:text-base">{i + 1}</td>
                    <td className="py-2 text-sm md:text-base">{j.name.split(" ")[0]}</td>
                    <td className="text-sm md:text-base">{j.email}</td>
                    <td className="py-2 text-sm md:text-base">{j.resume.slice(0, 10)}.pdf</td>
                    <td>
                      <button
                        onClick={() => dispatch(delete_apply_job(j._id))}
                        className="md:p-2 p-1 text-lg text-white hover:bg-red-600  bg-red-500"
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
