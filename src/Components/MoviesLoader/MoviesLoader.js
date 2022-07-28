import React from "react";
import { DotLoader } from "react-spinners";

import "./MoviesLoader.css";

// #region COMPONENT
/**
* A component that displays a loader in the movie List
* @class
* @category MoviesLoader
*/
const MoviesLoader = () => {
  // #region INTERFACE
  return (
    <div className="FilmsLoader-Container">
      <DotLoader
        color={"var(--main-border-color"}
        size={50}
      />
    </div>
  );
  // #endregion
};
// #endregion

export { MoviesLoader };
