import React, { useEffect } from "react";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { all_user } from "../../store/reducers/userReducer";
import { all_job_count, get_all_apply_job } from "../../store/reducers/JobReducer";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { userCount } = useSelector((state) => state.user);
  const { allApplyCount, allCount, successMessage } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(all_user());
    dispatch(get_all_apply_job());
    dispatch(all_job_count());
  }, [dispatch, successMessage]);

  return (
    <div className="">
      <div className="my-8 w-full mx-auto flex container flex-wrap justify-between gap-3">
        <div className="bg-sky-400 py-3 px-2 text-white md:w-[30%] w-[150px] text-center">
          <h3 className="md-lg:text-xl text-base">Total Jobs</h3>
          <h3 className="md-lg:text-xl text-base font-semibold "> {allCount} </h3>
        </div>
        <div className="bg-emerald-500 py-3 px-2 text-white md:w-[30%] w-[150px] text-center">
          <h3 className="md-lg:text-xl text-base">Total User</h3>
          <h3 className="md-lg:text-xl text-base font-semibold">{userCount}</h3>
        </div>
        <div className="bg-indigo-600 py-3 px-2 text-white md:w-[30%] w-[150px] text-center">
          <h3 className="md-lg:text-xl text-base">Applied Job</h3>
          <h3 className="md-lg:text-xl text-base font-semibold">{allApplyCount}</h3>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default DashboardPage;
