import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JobDetails from "./pages/JobDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import AddJob from "./pages/dashboard/AddJob";
import EditJob from "./pages/dashboard/EditJob";
import User from "./pages/dashboard/User";
import ProtechUser from "./components/ProtechUser";
import DashboardPage from "./pages/dashboard/DashboardPage";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import FaqPage from "./pages/FAQ";
import ApplyJob from "./pages/dashboard/ApplyJob";
import AddCategory from "./pages/dashboard/AddCategory";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/about" element={<AboutPage />} /> */}
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/faq" element={<FaqPage />} /> */}
        <Route path="/jobdetails/:id" element={<JobDetails />} />

        <Route path="/dashboard" element={<ProtechUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="" element={<DashboardPage />} />
            <Route path="addjob" element={<AddJob />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="applyjob" element={<ApplyJob />} />
            <Route path="editjob/:id" element={<EditJob />} />
            <Route path="user" element={<User />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
