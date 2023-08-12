import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-800 py-4 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="md:text-lg font-medium mb-3 md:mb-0">
          <p>&copy; {new Date().getFullYear()} Job Portal</p>
        </div>
        <div className="md:text-lg">
          <p>Follow us:</p>
          <div className="flex gap-4 mt-2">
            <NavLink to="#" className="hover:text-yellow-300 transition duration-300">
              Linkedin
            </NavLink>
            <NavLink to="#" className="hover:text-yellow-300 transition duration-300">
              Github
            </NavLink>
            <NavLink to="#" className="hover:text-yellow-300 transition duration-300">
              Facebook
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
