import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { single_category, update_category } from "../../store/reducers/categoryReducer";

const CategoryModal = ({ setOpen, open, cateId }) => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");

  const { category } = useSelector((state) => state.cate);

  const handleEditCategory = (e) => {
    e.preventDefault();
    dispatch(update_category({ id: cateId, category: categoryName }));
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(single_category({ id: cateId }));

    setCategoryName(category.name);
  }, [dispatch, cateId, category.name]);

  return (
    <div className="flex items-center bbbbbbbbbb justify-center h-full z-50 m-5 p-5">
      <div className="bg-slate-500 min-h-[35vh] w-2/6 flex items-center justify-center">
        <form onSubmit={handleEditCategory} className="">
          <div className="flex flex-col items-center justify-center gap-5">
            <input
              className="outline-none border w-full px-7 py-2 font-medium text-slate-500"
              type="text"
              id="category"
              name="category"
              placeholder="Edit category"
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
            />
            <button
              className="bg-orange-500 w-full text-white hover:bg-orange-600 font-medium text-lg py-2 px-7"
            >
              Edit Category
            </button>
          </div>
        </form>
        <span
          onClick={() => setOpen(!open)}
          className="absolute font-medium text-2xl p-[6px] hover:bg-slate-300 cursor-pointer top-2 right-2 bg-slate-200"
        >
          <MdClose />
        </span>
      </div>
    </div>
  );
};

export default CategoryModal;
