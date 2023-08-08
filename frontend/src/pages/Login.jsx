import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, user_login } from "../store/reducers/userReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { successMessage, errorMessage, userInfo } = useSelector((state) => state.user);

  const [state, setState] = useState({
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
    dispatch(user_login(state));
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
  }, [successMessage, errorMessage, userInfo]);

  //firstName, lastName, email, password
  return (
    <div className="container mx-auto min-h-screen bg-slate-300 flex justify-center items-center">
      <div className="bg-slate-100 w-[350px] mx-auto">
        <h3 className="text-center mt-3 text-2xl font-semibold text-green-500">Login Here!</h3>
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mt-3">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
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
              className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
              name="password"
              onChange={inputHandle}
              value={state.password}
              placeholder="Password"
            />
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button className="bg-orange-600 py-2 text-white font-semibold">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
