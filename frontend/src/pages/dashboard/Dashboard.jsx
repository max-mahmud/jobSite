import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <div className="w-1/5 bg-stone-500 flex justify-center">
        <div className="flex flex-col gap-4 items-center justify-center text-center ">
        <NavLink
            className={`${
              pathname === "/dashboard" ? "bg-red-200 w-[200px] px-5 py-2" : "w-[200px] px-5 py-2"
            }`}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={`${
              pathname === "/dashboard/addjob" ? "bg-red-200 w-[200px] px-5 py-2" : "w-[200px] px-5 py-2"
            }`}
            to="/dashboard/addjob"
          >
            Add Job
          </NavLink>
          <NavLink
            className={`${
              pathname === "/dashboard/editjob" ? "bg-red-200 w-[200px] px-5 py-2" : "w-[200px] px-5 py-2"
            }`}
            to={"/dashboard/editjob"}
          >
            Edit Job
          </NavLink>
          <NavLink
            className={`${
              pathname === "/dashboard/user" ? "bg-red-200 w-[200px] px-5 py-2" : "w-[200px] px-5 py-2"
            }`}
            to="/dashboard/user"
          >
            User
          </NavLink>
        </div>
      </div>
      <div className="w-4/5 bg-red-400">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
