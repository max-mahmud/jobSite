import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add_category, delete_category, get_category } from "../../store/reducers/categoryReducer";
import CategoryModal from "../../components/Modal/CategoryModal";
import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { categorys } = useSelector((state) => state.cate);
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [cateId, setCateId] = useState("");
  const handleCategory = (e) => {
    e.preventDefault();
    dispatch(add_category({ name: category }));
  };

  useEffect(() => {
    dispatch(get_category());
  }, [get_category, open, setOpen]);

  const handleEdit = (cid) => {
    setOpen(true);
    setCateId(cid);
  };
  const loading = false;
  return (
    <div className="bg-white relative flex justify-center items-center gap-10 flex-col text-slate-600 min-h-[90vh] m-5 p-4">
      <div>
        <form onSubmit={handleCategory} className="flex items-center flex-col gap-4">
          <div className="flex items-center justify-center gap-2">
            <input
              className="outline-none border px-7 py-2 font-medium text-slate-500"
              type="text"
              id="category"
              name="category"
              placeholder="Add category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
            <button className="bg-orange-500 text-white hover:bg-orange-600 font-medium text-lg py-2 px-6">
              Add Category
            </button>
          </div>
        </form>
      </div>
      <div className="w-full">
        <div>
          <table className="bg-white w-11/12 mx-auto text-center border mt-3">
            <thead className=" bg-slate-300 py-2">
              <tr className="border">
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? "loading......."
                : categorys?.map((j, i) => {
                    return (
                      <tr className="bg-slate-50 hover:bg-slate-300" key={i + 1}>
                        <td className="py-2">{i + 1}</td>
                        <td className="py-2">{j.name}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(j._id)}
                            className="py-2 mr-3 text-lg text-white hover:bg-orange-600 px-2 bg-orange-500"
                          >
                            <RiEditBoxLine />
                          </button>

                          <button
                            onClick={() => dispatch(delete_category(j._id))}
                            className="py-2 text-lg text-white hover:bg-orange-600 px-2 bg-orange-500"
                          >
                            <RiDeleteBin5Fill />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
      {open ? (
        <>
          <div className="w-full min-h-[60vh] absolute top-0 right-0 bottom-0 left-0 bg-[#1F1E1EA6]">
            <CategoryModal setOpen={setOpen} open={open} cateId={cateId} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AddCategory;
