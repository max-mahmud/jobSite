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
  const [company, setCompany] = useState("");
  const [requirements, setRequirements] = useState("");
  const [benefits, setBenefits] = useState("");
  const [logo, setLogo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      !cat ||
      !salary ||
      !location ||
      !company ||
      !requirements ||
      !benefits ||
      !logo
    ) {
      return toast.error("Please fill all required fields");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", cat);
    formData.append("salary", salary);
    formData.append("location", location);
    formData.append("company", company);
    formData.append("requirements", requirements);
    formData.append("benefits", benefits);
    formData.append("logo", logo);

    dispatch(add_jobs(formData));
    // toast.success("Job added successfully");
    // navigate("/dashboard");
  };

  useEffect(() => {
    dispatch(get_category());
  }, [categorys, title, description, salary, location]);

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  return (
    <div className="bg-slate-200 min-h-screen p-4">
      <form onSubmit={handleSubmit} className="p-4 w-full mx-auto bg-white gap-3 justify-center items-center">
        <div className="w-20 h-20 mx-auto mb-3">
          <img
            className=" w-full object-cover border"
            src={logo ? URL.createObjectURL(logo) : "/image/company.png"}
            alt="img"
          />
        </div>
        <div className="flex">
          <div className="flex flex-col w-full">
            <div className="flex flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-500" htmlFor="title">
                Title
              </label>
              <input
                className="w-full outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
                type="text"
                id="title"
                name="title"
                placeholder="Please Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-500" htmlFor="description">
                Description
              </label>
              <textarea
                className="w-full outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
                type="text"
                id="description"
                name="description"
                placeholder="Please Enter Description"
                value={description}
                cols="30"
                rows="3"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="flex flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-500" htmlFor="category">
                Category
              </label>
              <select
                onChange={(e) => setCat(e.target.value)}
                className="w-full outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
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

            <div className="flex flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-500" htmlFor="salary">
                Salary
              </label>
              <input
                className="w-full outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
                type="text"
                id="salary"
                name="salary"
                placeholder="Please Enter Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="flex flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-500" htmlFor="location">
                Location
              </label>
              <input
                className="w-full outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
                type="text"
                id="location"
                name="location"
                placeholder="Please Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex  flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-400 " htmlFor="company">
                Company
              </label>
              <input
                className="w-full outline-orange-300 bg-slate-100  py-2 px-4"
                type="text"
                id="company"
                name="company"
                placeholder="Please Enter Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="flex  flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-400 " htmlFor="requirements">
                Requirements
              </label>
              <textarea
                className="w-full outline-orange-300 bg-slate-100  py-2 px-4"
                type="text"
                id="requirements"
                name="requirements"
                placeholder="Please Enter Requirements"
                value={requirements}
                cols="30"
                rows="3"
                onChange={(e) => setRequirements(e.target.value)}
              ></textarea>
            </div>
            <div className="flex  flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-400 " htmlFor="benefits">
                Benefits
              </label>
              <textarea
                className="w-full outline-orange-300 bg-slate-100  py-2 px-4"
                type="text"
                id="benefits"
                name="benefits"
                placeholder="Please Enter Benefits"
                value={benefits}
                cols="30"
                rows="3"
                onChange={(e) => setBenefits(e.target.value)}
              ></textarea>
            </div>
            <div className="flex  flex-col p-2 gap-2 w-full">
              <label className="text-xl text-orange-400 " htmlFor="logo">
                Logo
              </label>
              <input
                required
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleLogoChange}
                className="w-full outline-orange-300 bg-slate-100 py-2 px-4"
                id="logo"
                name="logo"
              />
            </div>
          </div>
        </div>
        <div className="flex  flex-col p-2 gap-2 w-full">
          <button className="bg-orange-500 py-2 px-4 text-center text-white">Add Job</button>
        </div>
      </form>

      {/* {loading && <Loading />} */}
    </div>
  );
};

export default AddJob;
