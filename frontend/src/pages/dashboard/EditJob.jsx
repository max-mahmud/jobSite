import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_category, messageClear } from "../../store/reducers/categoryReducer";
import { add_jobs } from "../../store/reducers/JobReducer";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.job);
  const { categorys } = useSelector((state) => state.cate);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [cat, setCat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return toast.error("Please enter a title");
    } else if (!description) {
      return toast.error("Please enter a description");
    } else if (!cat) {
      return toast.error("Please enter a category ");
    } else if (!salary) {
      return toast.error("Please enter a salary");
    } else if (!location) {
      return toast.error("Please enter a location");
    } else {
      dispatch(add_jobs({ title, description, salary, location, category: cat }));
      toast.success("Job added successfully");
      if (loading) {
        return null;
      } else {
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    dispatch(get_category());
  }, [categorys, title, description, salary, location]);

  return (
    <div className="bg-slate-200 min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="flex p-4 w-1/2 mx-auto bg-white flex-col gap-3 justify-center items-center"
      >
        <div className="flex  flex-col p-2 gap-2 w-full">
          <label className="text-xl text-orange-400 " htmlFor="title">
            Title
          </label>
          <input
            className="w-full outline-orange-300 bg-slate-100  py-2 px-4"
            type="text"
            id="title"
            name="title"
            placeholder="Please Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex  flex-col p-2 gap-2 w-full">
          <label className="text-xl text-orange-400 " htmlFor="description">
            description
          </label>
          <textarea
            className="w-full outline-orange-300 bg-slate-100  py-2 px-4"
            type="text"
            id="description"
            name="description"
            placeholder="Please Enter description"
            value={description}
            cols="30"
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="flex  flex-col p-2 gap-2 w-full">
          <label className="text-xl text-orange-400" htmlFor="category">
            Category
          </label>
          <select
            onChange={(e) => setCat(e.target.value)}
            className="w-full outline-orange-300 bg-slate-100  py-2 px-4"
            name="category"
            id="category"
          >
            <option className="bg-orange-300" value="">
              Select Category
            </option>
            {categorys?.map((c, i) => {
              return (
                <option className="bg-orange-300" value={c._id} key={i + 1}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex  flex-col p-2 gap-2 w-full">
          <label className="text-xl text-orange-400" htmlFor="salary">
            salary
          </label>
          <input
            className="w-full outline-orange-300 bg-slate-100  py-2 px-4"
            type="text"
            id="salary"
            name="salary"
            placeholder="Please Enter salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="flex  flex-col p-2 gap-2 w-full">
          <label className="text-xl text-orange-400 " htmlFor="location">
            location
          </label>
          <input
            className="w-full outline-orange-300 bg-slate-100  py-2 px-4"
            type="text"
            id="location"
            name="location"
            placeholder="Please Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="flex  flex-col p-2 gap-2 w-full">
          <button className="bg-orange-500 py-2 px-4 text-center text-white">Add Job</button>
        </div>
      </form>
      {loading && <Loading />}
    </div>
  );
};

export default AddJob;
