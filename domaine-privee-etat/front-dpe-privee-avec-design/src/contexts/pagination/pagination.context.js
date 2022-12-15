import React from "react";
import { useState } from "react";

import { setCurrentItems, getUserData } from "./items.list.context";

export default function PaginationContext({ onSearchFirstPage }) {
  //#region  //----- MY PAGINATION -----
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  if (onSearchFirstPage) {
    function retourALaPremierPage() {
      setcurrentPage(1);
      if (currentPage > 5) {
        setmaxPageNumberLimit(5);
        setminPageNumberLimit(0);
      }
    }
  }

  const data = getUserData();
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  setCurrentItems(currentItems);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if (currentPage - 2 < minPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  //#endregion

  return (
    <>
      {/* {renderPageNumbers || renderPageNumbers === 1 ? null : ( */}
        <ul className="pageNumbers">
          <li>
            <button
              disabled={currentPage == pages[0] ? true : false}
              onClick={handlePrevbtn}
            >
              Précédent
            </button>
          </li>
          {renderPageNumbers}
          <li>
            <button
              disabled={currentPage == pages[pages.length - 1] ? true : false}
              onClick={handleNextbtn}
            >
              Suivant
            </button>
          </li>
        </ul>
       {/* )} */}
    </>
  );
}
