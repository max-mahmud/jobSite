import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user);
  const role = 1;
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
          {userInfo ? (
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
              <button className="bg-red-500 py-2 px-5 text-sm font-medium hover:text-yellow-300 transition duration-300">
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
