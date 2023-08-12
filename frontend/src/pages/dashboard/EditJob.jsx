import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_category } from "../../store/reducers/categoryReducer";
import { single_job, update_job, update_logo, messageClear } from "../../store/reducers/JobReducer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

const AddJob = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, loading, successMessage, errorMessage } = useSelector((state) => state.job);
  const { categorys } = useSelector((state) => state.cate);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [salary, setSalary] = useState();
  const [location, setLocation] = useState();

  const [allCategory, setallCategory] = useState([]);
  const [cat, setCat] = useState("");

  const [company, setCompany] = useState();
  const [requirements, setRequirements] = useState();
  const [benefits, setBenefits] = useState();
  const [logo, setLogo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cat) {
      return toast.error("Category Required");
    }
    dispatch(
      update_job({ title, description, salary, location, company, requirements, benefits, category: cat, id })
    );
  };

  useEffect(() => {
    dispatch(get_category());
    setallCategory(categorys);
  }, []);

  useEffect(() => {
    dispatch(single_job({ id }));

    setBenefits(job.benefits);
    setCat(job?.category?._id);
    setCompany(job.company);
    setDescription(job.description);
    setSalary(job.salary);
    setTitle(job.title);
    setLocation(job.location);
    setRequirements(job.requirements);
  }, [job?.logo]);

  const changeImage = (files) => {
    if (files.length > 0) {
      dispatch(
        update_logo({
          newImage: files[0],
          jobid: id,
        })
      );
    }
    setLogo(files[0]);
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
  }, [successMessage,dispatch, errorMessage]);

  return (
    <div className="">
      {loading ? (
        <>
          <div className=" w-11/12 mx-auto h-[90vh] mt-2 flex justify-center items-center">
            <Loading />
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className=" p-4 my-5 w-[97%] mx-auto bg-white gap-3 justify-center items-center"
        >
          <div className="w-20 h-20 mx-auto mb-3">
            <img
              className=" w-full object-cover border"
              src={logo ? URL.createObjectURL(logo) : job.logo}
              alt="img"
            />
          </div>
          <div className="flex md-lg:flex-row flex-col">
            <div className="flex flex-col w-full">
              <div className="flex flex-col p-2 gap-2 w-full">
                <label className="font-medium text-orange-500" htmlFor="title">
                  Title
                </label>
                <input
                  className="w-full text-sm outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Please Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col p-2 gap-2 w-full">
                <label className="font-medium text-orange-500" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="w-full text-sm outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
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
                <label className="font-medium text-orange-500" htmlFor="category">
                  Category
                </label>
                <select
                  onChange={(e) => setCat(e.target.value)}
                  value={cat}
                  className="w-full text-sm outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100 "
                  name="category"
                  id="category"
                >
                  {allCategory?.map((c, i) => {
                    return (
                      <option className="bg-orange-300 cursor-pointer" value={c._id} key={i + 1}>
                        {c.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex flex-col p-2 gap-2 w-full">
                <label className="font-medium text-orange-500" htmlFor="salary">
                  Salary
                </label>
                <input
                  className="w-full text-sm outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="Please Enter Salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="flex flex-col p-2 gap-2 w-full">
                <label className="font-medium text-orange-500" htmlFor="location">
                  Location
                </label>
                <input
                  className="w-full text-sm outline-none bg-slate-100 py-2 px-4 rounded-md focus:bg-gray-100"
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
                <label className="font-medium text-orange-400 " htmlFor="company">
                  Company
                </label>
                <input
                  className="w-full text-sm outline-none  bg-slate-100  py-2 px-4"
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Please Enter Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="flex  flex-col p-2 gap-2 w-full">
                <label className="font-medium text-orange-400 " htmlFor="requirements">
                  Requirements
                </label>
                <textarea
                  className="w-full outline-none text-sm bg-slate-100  py-2 px-4"
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
                <label className="font-medium text-orange-400 " htmlFor="benefits">
                  Benefits
                </label>
                <textarea
                  className="w-full outline-none text-sm bg-slate-100  py-2 px-4"
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
                <label className="font-medium text-orange-400 " htmlFor="logo">
                  Logo
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => changeImage(e.target.files)}
                  className="w-full outline-none text-sm bg-slate-100 py-2 px-4"
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
      )}
    </div>
  );
};

export default AddJob;
