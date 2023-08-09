import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const { pathname } = useLocation();
  return (
    <div className="h-[105vh] bg-slate-200 flex">
      <div className="w-1/5 bg-stone-500 flex justify-center">
        <div className="flex flex-col gap-4 items-center justify-center text-center ">
          <NavLink
            className={`${pathname === "/dashboard" ? "bg-red-200  " : " "} w-[200px] px-5 py-2`}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={`${pathname === "/dashboard/addjob" ? "bg-red-200  " : " "} w-[200px] px-5 py-2`}
            to="/dashboard/addjob"
          >
            Add Job
          </NavLink>
          <NavLink
            className={`${pathname === "/dashboard/add-category" ? "bg-red-200  " : " "} w-[200px] px-5 py-2`}
            to="/dashboard/add-category"
          >
            Add Category
          </NavLink>
          <NavLink
            className={`${pathname === "/dashboard/applyjob" ? "bg-red-200  " : " "} w-[200px] px-5 py-2`}
            to="/dashboard/applyjob"
          >
            Apply Job
          </NavLink>
          <NavLink
            className={`${pathname === "/dashboard/user" ? "bg-red-200" : ""} w-[200px] px-5 py-2`}
            to="/dashboard/user"
          >
            User
          </NavLink>
        </div>
      </div>
      <div className="w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
