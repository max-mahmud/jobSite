import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/reducers/userReducer";
import { toast } from "react-toastify";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";

const Header = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    toast.success("logged out successfully");
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-800 py-4 text-white">
      <div className="container mx-auto flex md:flex-row justify-between items-center">
        <div className="text-xl font-semibold mb-3 md:mb-0">
          <NavLink onClick={() => setOpen(false)} to={"/"} className="hover:text-yellow-300">
            Job Portal
          </NavLink>
        </div>
        <div className=" md-lg:flex hidden gap-3">
          <NavLink
            to={"/about"}
            className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
          >
            About
          </NavLink>
          <NavLink
            to={"/contact"}
            className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
          >
            Contact
          </NavLink>
          <NavLink
            to={"/faq"}
            className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
          >
            FAQ
          </NavLink>
          {userInfo ? (
            <>
              {userInfo.role === 1 ? (
                <>
                  <NavLink
                    className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
                    to={"/dashboard"}
                  >
                    dashboard
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
                    to={"/profile"}
                  >
                    Profile
                  </NavLink>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-white rounded text-slate-700 py-2 px-5 text-sm font-bold hover:text-orange-400 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
                to={"/login"}
              >
                Login
              </NavLink>
              <NavLink
                className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
                to={"/register"}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
        <div className="md-lg:hidden flex">
          <button
            onClick={() => setOpen(!open)}
            className="p-[6px] font-medium text-2xl bg-slate-300 text-slate-600 "
          >
            {open ? <RiCloseLine /> : <RiMenu3Fill />}
          </button>
        </div>
      </div>
      {open && (
        <div className="w-full md-lg:hidden flex flex-col items-center pb-5 pt-3 bg-gradient-to-r from-orange-600 to-orange-800  gap-3 absolute top-[60px] left-0">
          <NavLink
            to={"/about"}
            onClick={() => setOpen(false)}
            className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to={"/contact"}
            className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
          >
            Contact
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to={"/faq"}
            className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
          >
            FAQ
          </NavLink>
          {userInfo ? (
            <>
              {userInfo.role === 1 ? (
                <>
                  <NavLink
                    onClick={() => setOpen(false)}
                    className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
                    to={"/dashboard"}
                  >
                    dashboard
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    onClick={() => setOpen(false)}
                    className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
                    to={"/profile"}
                  >
                    Profile
                  </NavLink>
                </>
              )}
              <button
                onClick={handleLogout}
                className="bg-white rounded text-slate-700 py-2 px-5 text-sm font-bold hover:text-orange-400 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                onClick={() => setOpen(false)}
                className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
                to={"/login"}
              >
                Login
              </NavLink>
              <NavLink
                onClick={() => setOpen(false)}
                className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
                to={"/register"}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
