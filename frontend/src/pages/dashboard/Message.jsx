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
              <th className="py-2 text-sm md:text-base">ID</th>
              <th className="py-2 text-sm md:text-base">Name</th>
              <th className="py-2 text-sm md:text-base sm:block hidden">Email</th>
              <th className="py-2 text-sm md:text-base">Message</th>
              <th className="py-2 text-sm md:text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {msgs?.map((j, i) => {
              return (
                <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                  <td className="py-2 text-sm md:text-base">{i + 1}</td>
                  <td className="py-2 text-sm md:text-base">{j.name.split(" ")[0]}</td>
                  <td className="py-2 text-sm md:text-base sm:block hidden">{j.email}</td>
                  <td className="py-2 text-xs md:text-base">{j.message.slice(0, 30)}..</td>
                  <td>
                    <button
                      onClick={() => dispatch(delete_msg(j._id))}
                      className="p-2 text-white hover:bg-orange-600 text-sm md-lg:text-lg bg-orange-500"
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
