import React, { useEffect } from "react";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { all_user } from "../../store/reducers/userReducer";
import { get_all_apply_job } from "../../store/reducers/JobReducer";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.job);
  const { userCount } = useSelector((state) => state.user);
  const { allApplyCount } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(all_user());
    dispatch(get_all_apply_job());
  }, []);

  return (
    <div className="">
      <div className="my-8 w-11/12 mx-auto flex justify-between">
        <div className="bg-slate-400 py-3 px-2 text-white w-1/4 text-center">
          <h3 className="text-2xl">Total Jobs</h3>
          <h3 className="text-xl">{count}</h3>
        </div>
        <div className="bg-emerald-500 py-3 px-2 text-white w-1/4 text-center">
          <h3 className="text-2xl">Total User</h3>
          <h3 className="text-xl">{userCount}</h3>
        </div>
        <div className="bg-indigo-600 py-3 px-2 text-white w-1/4 text-center">
          <h3 className="text-2xl">Applied Job</h3>
          <h3 className="text-xl">{allApplyCount}</h3>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default DashboardPage;
