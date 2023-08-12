import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AiFillDashboard, AiFillFileAdd , AiOutlineMenuFold} from "react-icons/ai";
import { BiSolidCategoryAlt, BiMessageAltError } from "react-icons/bi";
import { HiNewspaper } from "react-icons/hi";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="relative">
        <div className=" bg-slate-100 flex">
          <div
            className={`${
              open ? "w-1/12 " : "w-[20%] "
            } hidden  bg-gray-600 md-lg:flex justify-center z-0 min-h-[100vh]`}
          >
            {open ? (
              <>
                <div className=" md-lg:flex hidden  flex-col gap-4 items-center justify-center text-center ">
                  <NavLink
                    className={`${
                      pathname === "/dashboard" ? "bg-orange-300  " : " "
                    }  bashboard-nav-responsive`}
                    to="/dashboard"
                  >
                    <AiFillDashboard />
                  </NavLink>
                  <NavLink
                    className={`${
                      pathname === "/dashboard/addjob" ? "bg-orange-300  " : " "
                    } bashboard-nav-responsive`}
                    to="/dashboard/addjob"
                  >
                    <AiFillFileAdd />
                  </NavLink>
                  <NavLink
                    className={`${
                      pathname === "/dashboard/add-category" ? "bg-orange-300  " : " "
                    } bashboard-nav-responsive`}
                    to="/dashboard/add-category"
                  >
                    <BiSolidCategoryAlt />
                  </NavLink>
                  <NavLink
                    className={`${
                      pathname === "/dashboard/applyjob" ? "bg-orange-300  " : " "
                    } bashboard-nav-responsive`}
                    to="/dashboard/applyjob"
                  >
                    <HiNewspaper />
                  </NavLink>
                  <NavLink
                    className={`${
                      pathname === "/dashboard/message" ? "bg-orange-300  " : " "
                    } bashboard-nav-responsive`}
                    to="/dashboard/message"
                  >
                    <BiMessageAltError />
                  </NavLink>
                </div>
              </>
            ) : (
              <div className=" flex flex-col gap-4 items-center justify-center text-center ">
                <NavLink
                  className={`${pathname === "/dashboard" ? "bg-orange-300  " : " "}  bashboard-nav`}
                  to="/dashboard"
                >
                  <AiFillDashboard /> Dashboard
                </NavLink>
                <NavLink
                  className={`${pathname === "/dashboard/addjob" ? "bg-orange-300  " : " "}  bashboard-nav`}
                  to="/dashboard/addjob"
                >
                  <AiFillFileAdd /> Add Job
                </NavLink>
                <NavLink
                  className={`${
                    pathname === "/dashboard/add-category" ? "bg-orange-300  " : " "
                  } bashboard-nav`}
                  to="/dashboard/add-category"
                >
                  <BiSolidCategoryAlt /> Add Category
                </NavLink>
                <NavLink
                  className={`${pathname === "/dashboard/applyjob" ? "bg-orange-300  " : " "} bashboard-nav`}
                  to="/dashboard/applyjob"
                >
                  <HiNewspaper /> Apply Job
                </NavLink>
                <NavLink
                  className={`${pathname === "/dashboard/message" ? "bg-orange-300  " : " "} bashboard-nav`}
                  to="/dashboard/message"
                >
                  <BiMessageAltError /> Messages
                </NavLink>
              </div>
            )}
          </div>
          {open && (
            <div className="md-lg:hidden z-50 absolute top-[63px] py-5 left-0 right-0 bg-gray-600  flex">
              <div className="w-full flex flex-col gap-4 items-center justify-center text-center ">
                <NavLink
                  onClick={() => setOpen(false)}
                  className={`${pathname === "/dashboard" ? "bg-orange-300  " : " "}  bashboard-nav`}
                  to="/dashboard"
                >
                  <AiFillDashboard /> Dashboard
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={`${pathname === "/dashboard/addjob" ? "bg-orange-300  " : " "}  bashboard-nav`}
                  to="/dashboard/addjob"
                >
                  <AiFillFileAdd /> Add Job
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={`${
                    pathname === "/dashboard/add-category" ? "bg-orange-300  " : " "
                  } bashboard-nav`}
                  to="/dashboard/add-category"
                >
                  <BiSolidCategoryAlt /> Add Category
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={`${pathname === "/dashboard/applyjob" ? "bg-orange-300  " : " "} bashboard-nav`}
                  to="/dashboard/applyjob"
                >
                  <HiNewspaper /> Apply Job
                </NavLink>
                <NavLink
                  onClick={() => setOpen(false)}
                  className={`${pathname === "/dashboard/message" ? "bg-orange-300  " : " "} bashboard-nav`}
                  to="/dashboard/message"
                >
                  <BiMessageAltError /> Messages
                </NavLink>
              </div>
            </div>
          )}
          <div className={`w-full md-lg:mx-5 mx-2 mt-[80px]`}>
            <Outlet />
          </div>
        </div>
        <div
          className={`${open ? "w-full md-lg:w-[93%]" : "md-lg:w-[84%] w-full"} absolute top-0 right-0 z-0`}
        >
          <div className="bg-gray-600 py-4 text-white">
            <div className="px-8 flex justify-between">
              <button onClick={() => setOpen(!open)} className="bg-white py-2 px-3 text-slate-700">
                <AiOutlineMenuFold />
              </button>
              <button>Hi! Admin</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
