import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { logout } from "../store/reducers/userReducer";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [local, setLocal] = useState("");
  const role = 1;

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    setLocal(false);
    if (!localStorage.getItem("userToken")) {
      toast.success("logout was successful");
    }
  };

  useEffect(() => {
    setLocal(userInfo);
  }, [userInfo]);

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
            to={"/contact"}
            className="text-sm py-2 px-2 font-medium hover:text-yellow-300 transition duration-300"
          >
            Contact
          </NavLink>
          {local ? (
            <>
              {role === 1 ? (
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
                className="bg-white text-slate-700 py-2 px-5 text-sm font-bold hover:text-orange-400 transition duration-300"
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

// const Header = () => {

//   return (
//     <div className=" bg-orange-700 py-4 text-yellow-50">
//       <div className="container mx-auto flex justify-between">
//         <div>
//           <NavLink to={"/"}>Home</NavLink>
//         </div>
//         <div className="flex justify-end gap-5">

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
