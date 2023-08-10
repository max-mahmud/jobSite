import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../store/reducers/userReducer";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    const token = localStorage.getItem("userToken");
    // const userToken = Cookies.get("accessToken");
    dispatch(logout({ token: token }));
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-800 py-4 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-semibold mb-3 md:mb-0">
          <NavLink to={"/"} className="hover:text-yellow-300">
            Job Portal
          </NavLink>
        </div>
        <div className="flex md:flex-row gap-3">
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
      </div>
    </div>
  );
};

export default Header;
