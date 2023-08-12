import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { apply_job, messageClear, single_job } from "../store/reducers/JobReducer";
import Loading from "./../components/Loading";
import { toast } from "react-toastify";
import Header from "../components/Header";
import Footer from "../components/Footer";

const JobDetailsPage = () => {
  const [open, setopen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { job, loading, successMessage, errorMessage } = useSelector((state) => state.job);
  const { userInfo } = useSelector((state) => state.user);

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

  useEffect(() => {
    dispatch(single_job({ id }));
  }, [dispatch, successMessage, errorMessage, id]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch, errorMessage]);

  return (
    <>
      <Header />

      <div className="container min-h-screen mx-auto mt-10">
        <div className="md-lg:flex md-lg:flex-row flex-col gap-5">
          <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
            <div className="w-40 h-40 mb-4">
              {loading ? (
                <div className="-full h-full border bg-slate-200 flex justify-center items-center text-2xl text-slate-600">
                  Loading...
                </div>
              ) : (
                <img className="w-full h-full border" src={job?.logo} alt="img" />
              )}
            </div>
            <h1 className="text-2xl text-slate-600 font-semibold mb-4">{job.title}</h1>
            <p className="text-sm mb-2 font-medium text-slate-600">
              <span className="text-green-500  bg-slate-300/50 p-1 rounded-md">Company:</span> {job.company}{" "}
              &nbsp;&nbsp; || &nbsp;&nbsp;{" "}
              <span className="text-green-500 bg-slate-300/50 p-1 rounded-md">Location:</span> {job.location}
            </p>

            <div className="mb-6">
              <h2 className="text-lg my-2 font-medium text-slate-600">Requirements</h2>
              <p className="text-slate-500 text-sm font-semibold">{job.requirements}</p>
            </div>
          </div>
          <div className="bg-white md-lg:mt-0 mt-5 p-6 rounded-lg shadow-md">
            {loading ? (
              <div className="w-full h-full ">
                <Loading />
              </div>
            ) : (
              <>
                {userInfo ? (
                  <>
                    {job?.applyForm?.user === userInfo?.id ? (
                      <>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <h2 className="text-lg font-semibold mb-2">
                            You have already submitted an application for this job.
                          </h2>
                          <p className="text-gray-600">
                            Thank you for your interest in this position. Your application is being reviewed.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="text-xl text-slate-500 font-semibold mb-4">Apply for this Job</h2>
                        <form onSubmit={handleSubmit} className="grid gap-4">
                          <input
                            type="text"
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            placeholder="Your Name"
                            className="border rounded py-2 px-3 focus:outline-none focus:border-orange-500"
                          />
                          <input
                            type="email"
                            value={applicantEmail}
                            onChange={(e) => setApplicantEmail(e.target.value)}
                            placeholder="Your Email"
                            className="border rounded py-2 px-3 focus:outline-none focus:border-orange-500"
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
                            className="bg-orange-500 font-semibold text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
                          >
                            Submit Application
                          </button>
                        </form>
                      </>
                    )}
                  </>
                ) : (
                  <div className=" p-4 rounded">
                    <h2 className="text-xl font-semibold mb-2">Please Login First To Submit Application</h2>
                  </div>
                )}
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
              } w-full py-1 font-medium `}
            >
              Description
            </button>
            <button
              onClick={() => setopen(true)}
              className={`${
                open ? "bg-orange-500 text-white" : "bg-slate-200 hover:bg-slate-300 text-slate-600 "
              } w-full py-1 font-medium `}
            >
              Benefits
            </button>
          </div>
          <div className="mb-3">
            {open ? (
              <>
                <div>
                  <h2 className="text-xl text-slate-600 font-semibold mb-2">Job Benefits</h2>
                  <p className="text-gray-600 text-sm font-medium">{job.benefits}</p>
                </div>
              </>
            ) : (
              <div>
                <h2 className="text-xl text-slate-600 font-semibold mb-2">Job Description</h2>
                <p className="text-gray-600 text-sm font-medium">{job.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobDetailsPage;
