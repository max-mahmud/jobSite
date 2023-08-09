import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apply_job, single_job } from "../store/reducers/JobReducer";

const JobDetailsPage = () => {
  const [open, setopen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { job, loading } = useSelector((state) => state.job);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(single_job({ id }));
  }, [id]);

  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantResume, setApplicantResume] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", applicantName);
    formdata.append("email", applicantEmail);
    formdata.append("resume", applicantResume);
    formdata.append("user", userInfo.id);
    formdata.append("jobId", job._id);

    dispatch(apply_job(formdata));

    setApplicantName("");
    setApplicantEmail("");
    setApplicantResume("");
  };
  return (
    <div className="container min-h-screen mx-auto mt-10 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-40 h-40 mb-4">
            <img className="w-full h-full border" src={job?.logo} alt="img" />
          </div>
          <h1 className="text-3xl text-slate-600 font-semibold mb-4">{job.title}</h1>
          <p className=" mb-2 font-medium text-slate-600">
            Company: {job.company} &nbsp;&nbsp; || &nbsp;&nbsp; Location: {job.location}
          </p>

          <div className="mb-6">
            <h2 className="text-xl my-2 font-medium text-slate-600">Requirements</h2>
            <p className="text-slate-500 font-semibold">{job.requirements}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {job?.applyForm?.user === userInfo.id ? (
            <>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  You have already submitted an application for this job.
                </h2>
                <p className="text-gray-600">
                  Thank you for your interest in this position. Your application is being reviewed.
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl text-slate-500 font-semibold mb-4">Apply for this Job</h2>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Your Name"
                  className="border rounded py-3 px-3 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="Your Email"
                  className="border rounded py-3 px-3 focus:outline-none focus:border-orange-500"
                />
                <label className="block font-medium text-gray-600">
                  Upload Resume
                  <input
                    type="file"
                    onChange={(e) => setApplicantResume(e.target.files[0])}
                    className="mt-1"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="bg-orange-500 font-semibold text-lg text-white py-3 px-4 rounded hover:bg-orange-600 transition duration-300"
                >
                  Submit Application
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <div>
        <div className="flex my-8 ">
          <button
            onClick={() => setopen(false)}
            className={`${
              open ? "bg-slate-200 hover:bg-slate-300 text-slate-600" : "bg-orange-500 text-white"
            } w-full py-2 font-medium `}
          >
            Description
          </button>
          <button
            onClick={() => setopen(true)}
            className={`${
              open ? "bg-orange-500 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-600 "
            } w-full py-2 font-medium `}
          >
            Benefits
          </button>
        </div>
        <div className="mb-3">
          {open ? (
            <>
              <div>
                <h2 className="text-xl text-slate-600 font-semibold mb-2">Job Benefits</h2>
                <p className="text-gray-600 font-medium">{job.benefits}</p>
              </div>
            </>
          ) : (
            <div>
              <h2 className="text-xl text-slate-600 font-semibold mb-2">Job Description</h2>
              <p className="text-gray-600 font-medium">{job.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
