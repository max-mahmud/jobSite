import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtechUser = () => {
  const { userInfo } = useSelector((state) => state.user);

  if (userInfo) {
    if (userInfo?.role === 1) {
      return <Outlet />;
    } else {
      return <Navigate to={"/login"} replace={true} />;
    }
  }
};

export default ProtechUser;
