import { numberByPageModifed, pageSelected } from "../../Store/actions";
import { LOADING } from "../../Store/constants";
import {
  selectCurrentPage,
  selectMoviesStatus,
  selectNumberByPage,
  selectPageCount
} from "../../Store/selectors";
import { NbPerPageSelector } from "./NbPerPageSelector";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";

import "./Pagination.css";

// #region COMPONENT
/**
* A component that displays a paging
* @class
* @category Pagination
*/
const Pagination = () => {
  // #region INITIALISATION
  // Selectors
  const page = useSelector(selectCurrentPage);
  const numberOfPage = useSelector(selectPageCount);
  const numberByPage = useSelector(selectNumberByPage);
  const status = useSelector(selectMoviesStatus);

  // Dispatch
  const dispatch = useDispatch();
  // #endregion

  // #region EVENTS
  // Changing number by page
  const handleChangeNumberByPage = (e) => {
    let value = e.target.value;
    if (value === numberByPage) {
      return;
    }

    // Apply
    dispatch(numberByPageModifed(e.target.value));
  };

  // Select a page
  const handleClick = (number) => {
    if (number === page) {
      return;
    }

    // Apply
    dispatch(pageSelected(number));
  };

  // Click on previous button
  const handleClickLeft = () => {
    if (page === 1) {
      return;
    }

    handleClick(page - 1);
  };

  // Click on next button
  const handleClickRight = () => {
    if (page === numberOfPage) {
      return;
    }

    handleClick(page + 1);
  };
  // #endregion

  // #region INTERFACE
  // Return an array of pages number
  const renderPages = () => {
    let pages = [];

    for (let i = 1; i <= numberOfPage; i++) {
      pages.push({ number: i });
    }

    return pages;
  };

  // Interface
  return (
    <div className="Pagination-MainContainer">
      <div className="Pagination-Container">
        {/* left button */}
        <button
          className="Pagination-Button"
          onClick={handleClickLeft}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        {/* pages */}
        <div className="Pagination-PagesContainer">
          {status === LOADING
            ?
            <ClipLoader
              color={"var(--main-border-color)"}
              loading={true}
              size={40}
            />
            :
            renderPages().map((pageOf, index) => {
              return (
                <div
                  className={page === pageOf.number ? "Pagination-Page Pagination-Page-Selected" : "Pagination-Page"}
                  key={`${index}`}
                  onClick={() => { handleClick(pageOf.number); }}
                >
                  {pageOf.number}
                </div>
              );
            })
          }
        </div>
        {/* right button */}
        <button
          className="Pagination-Button"
          onClick={handleClickRight}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
      <NbPerPageSelector
        onChange={handleChangeNumberByPage}
        value={numberByPage}
      />
    </div>
  );
};
// #endregion

export { Pagination };
