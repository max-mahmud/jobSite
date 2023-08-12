import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, user_register } from "../store/reducers/userReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMessage, errorMessage, userInfo } = useSelector((state) => state.user);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(user_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage, navigate, dispatch, userInfo]);
  return (
    <>
      <Header />
      <div className="container mx-auto min-h-screen bg-slate-200 flex justify-center items-center">
        <div className="bg-slate-300 w-[350px] mx-auto">
          <h3 className="text-center mt-3 text-2xl font-semibold text-green-500">Register Here!</h3>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={inputHandle}
                value={state.name}
                className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-orange-500 rounded-md"
                name="name"
                placeholder="name"
              />
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="Email"
                className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-orange-500 rounded-md"
                name="email"
                onChange={inputHandle}
                value={state.email}
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                id="Password"
                className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-orange-500 rounded-md"
                name="password"
                onChange={inputHandle}
                value={state.password}
                placeholder="Password"
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button className="bg-orange-600 py-2 text-white font-semibold">Register</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
