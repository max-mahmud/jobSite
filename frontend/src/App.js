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

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobdetails/:id" element={<JobDetails />} />

        <Route path="/dashboard" element={<ProtechUser />}>
          <Route path="" element={<Dashboard />}>
            <Route path="addjob" element={<AddJob />} />
            <Route path="editjob" element={<EditJob />} />
            <Route path="user" element={<User />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
