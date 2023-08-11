import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delete_msg, get_msg, messageClear } from "../../store/reducers/messageReducer";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const Message = () => {
  const dispatch = useDispatch();
  const { msgs, loading, successMessage, errorMessage } = useSelector((state) => state.msg);

  useEffect(() => {
    dispatch(get_msg());
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  return (
    <div>
      {loading ? (
        <div className=" w-11/12 mx-auto h-[300px] mt-4 flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <table className="bg-white w-11/12 mx-auto text-center border mt-3">
          <thead className=" bg-slate-300 py-2">
            <tr className="border">
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {msgs?.map((j, i) => {
              return (
                <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                  <td className="py-2">{i + 1}</td>
                  <td className="py-2">{j.name}</td>
                  <td>{j.email}</td>
                  <td>{j.message.slice(0, 35)}..</td>
                  <td>
                    <button
                      onClick={() => dispatch(delete_msg(j._id))}
                      className="py-2 text-white hover:bg-orange-600 text-lg px-3 bg-orange-500"
                    >
                      <RiDeleteBin5Fill />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Message;
