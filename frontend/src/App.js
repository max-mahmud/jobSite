import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import JobDetails from "./pages/JobDetails";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job" element={<JobDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
