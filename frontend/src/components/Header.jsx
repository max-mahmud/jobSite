import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);

  const role = 1;
  return (
    <div className=" bg-orange-700 py-3 text-yellow-50">
      <div className="container mx-auto flex justify-between">
        <div>
          <NavLink to={"/"}>Home</NavLink>
        </div>
        <div className="flex justify-end gap-5">
          {userInfo ? (
            <>
              {role === 1 ? (
                <>
                  <NavLink to={"/dashboard"}>dashboard</NavLink>{" "}
                </>
              ) : (
                <>
                  <NavLink to={"/profile"}>Profile</NavLink>{" "}
                </>
              )}
            </>
          ) : (
            <>
              <NavLink to={"/login"}>Login</NavLink>
              <NavLink to={"/register"}>Register</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
