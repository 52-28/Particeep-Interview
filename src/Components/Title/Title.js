import React from "react";

import "./Title.css";

// #region COMPONENT
/**
* A component that displays a Title
* @class
* @category Title
*/
function Title() {
  // Interface
  return (
    <div>
      <div className="Title-Container">
        <h1 className="Title-Text">My movie library</h1>
      </div>
      <hr className="Title-divider" />
    </div>
  );
}

export { Title };
