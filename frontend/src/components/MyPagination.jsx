import React from "react";
import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import { useSelector } from "react-redux";

const MyPagination = ({ setPage, page }) => {
  const { jobs, uniqLocations, count, pages } = useSelector((state) => state.job);

  const handlePageChange = (page) => {
    setPage(page);
  };
  // bottom-border, square-fill, square-i, circle,square

  return (
    <div className="bg-slate-200">
      <Pagination currentPage={page} totalPages={pages} changeCurrentPage={setPage} theme="square-i" />
    </div>
  );
};

export default MyPagination;
