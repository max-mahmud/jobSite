import React from "react";
import { NavLink } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="bg-white shadow-md min-h-[91vh] py-10 text-gray-800">
      <div className="container mx-auto p-5">
        <h1 className="text-4xl font-semibold mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Connecting job seekers with employment opportunities and helping companies find the right talent.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              Our mission is to simplify the job search and recruitment process, making it efficient, effective,
              and accessible to all. We believe in connecting individuals with meaningful career opportunities
              and supporting businesses in building successful teams.
            </p>
            <p className="text-gray-600">
              Thank you for choosing Job Portal as your trusted partner in the world of employment.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Why Choose Us</h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Wide range of job listings based on preferences</li>
              <li>User-friendly interface and advanced search features</li>
              <li>Efficient application and hiring process</li>
              <li>Supportive and dedicated team</li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <NavLink
            to="/contact"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
