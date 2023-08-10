import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageClear, user_details, user_update } from "../store/reducers/userReducer"; // Import your actions
import { toast } from "react-toastify";
import Loading from "./../components/Loading";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, userDetails, successMessage, applyJobs, loading } = useSelector((state) => state.user);

  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    skill: "",
  });

  useEffect(() => {
    dispatch(user_details(userInfo.id));
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setUpdatedUser({
        name: "",
        email: "",
        contact: "",
        address: "",
        skill: "",
      });
    }
  }, [dispatch, user_details, userInfo.id, successMessage]);

  const handleUpdate = () => {
    dispatch(user_update({ id: userInfo.id, info: updatedUser }));
  };
  return (
    <div className="container min-h-screen mx-auto">
      <div className="flex justify-between gap-5 mt-4">
        <div className="bg-slate-200 p-4 w-full flex-col">
          <h4 className="text-slate-600 font-medium text-xl my-2 ">
            <span>Name:</span> {loading ? "Loading..." : <>{userDetails?.name}</>}
          </h4>
          <h4 className="text-slate-600 font-medium text-xl my-2 ">
            <span>Email:</span>
            {loading ? "Loading..." : <>{userDetails?.email}</>}
          </h4>
          <h4 className="text-slate-600 font-medium text-xl my-2 ">
            <span>Contact:</span>
            {loading ? "Loading..." : <>{userDetails?.contact}</>}
          </h4>
          <h4 className="text-slate-600 font-medium text-xl my-2 ">
            <span>Address:</span>
            {loading ? "Loading..." : <>{userDetails?.address}</>}
          </h4>
          <h4 className="text-slate-600 font-medium text-xl my-2 ">
            <span>Skill:</span> {loading ? "Loading..." : <>{userDetails?.skill}</>}
          </h4>
        </div>
        <div className="bg-slate-200 w-full p-5 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={updatedUser.name}
              onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
              className="border rounded-md py-2 px-3 w-full"
            />
            <input
              type="text"
              placeholder="Email"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              className="border rounded-md py-2 px-3 w-full"
            />
            <input
              type="text"
              placeholder="Contact"
              value={updatedUser.contact}
              onChange={(e) => setUpdatedUser({ ...updatedUser, contact: e.target.value })}
              className="border rounded-md py-2 px-3 w-full"
            />
            <input
              type="text"
              placeholder="Address"
              value={updatedUser.address}
              onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })}
              className="border rounded-md py-2 px-3 w-full"
            />
            <input
              type="text"
              placeholder="Skill"
              value={updatedUser.skill}
              onChange={(e) => setUpdatedUser({ ...updatedUser, skill: e.target.value })}
              className="border rounded-md py-2 px-3 w-full"
            />
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <div>
        <div className="mt-5">
          <h3 className="text-3xl font-medium text-slate-500">Job I Applied </h3>
          {loading ? (
            <div className="h-[200px] mt-2 ">
              <Loading />
            </div>
          ) : (
            <>
              {" "}
              <table className="bg-white w-full mx-auto text-center border mt-3">
                <thead className=" bg-slate-300 py-2">
                  <tr className="border">
                    <th className="py-2">ID</th>
                    <th className="py-2">Title</th>
                    <th>Salary</th>
                    <th>Company</th>
                    <th>Location</th>
                  </tr>
                </thead>

                {applyJobs?.map((jobs, index) => {
                  return (
                    <tbody key={index + 11}>
                      {jobs?.map((job, i) => {
                        return (
                          <tr className="bg-slate-50 hover:bg-slate-300" key={index + 1}>
                            <td className="py-2">{index + 1}</td>
                            <td className="py-2">{job?.title}</td>
                            <td>{job.salary}</td>
                            <td>{job.company}</td>
                            <td>{job.location}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  );
                })}
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
