import PropTypes from "prop-types";
import React from "react";

import "./ProgressBar.css";

// #region FONCTION COMPOSANT
/**
* A component that render a ratio bar of like / dislike
* @class
* @category
*/
function ProgressBar(props) {
  // #region INITIALISATION
  const {
    ratio
  } = props;
  // #endregion

  // #region INTERFACE
  return (
    <div className="Progress-Container" style={ratio === null ? { background: "grey" } : null}>
      <div className="Progress-like" style={{ width: `${ratio * 100}%` }}></div>
    </div >
  );
  // #endregion
}
// #endregion

// #region PROPERTIES
/**
* Properties types of {@link ProgressBar}
* @typedef {Object} ProgressBar.propTypes
* @property {number} [ratio=null] a ratio of like / dislike
*/
// Properties
ProgressBar.propTypes = {
  ratio: PropTypes.number
};

ProgressBar.defaultProps = {
  applied: false
};
// #endregion

export { ProgressBar };
