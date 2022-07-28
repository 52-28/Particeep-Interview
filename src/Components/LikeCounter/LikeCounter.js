import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";

import "./LikeCounter.css";

// #region COMPONENT
/**
* A component that displays a like / dislike button
* @class
* @category LikeCounter
* @param {LikeCounter.propTypes} props Component properties
*/
const LikeCounter = (props) => {
  //#region INITIALISATION
  const {
    applied,
    icon,
    numberOf,
    onClick
  } = props;
  //#endregion

  //#region INTERFACE
  return (
    <div
      className="LikeCounter-Container"
      onClick={onClick}
    >
      <FontAwesomeIcon
        className={applied ? "LikeCounter-Icon LikeCounter-IconColor" : "LikeCounter-Icon"}
        icon={icon}
        size="1x"
      />
      <div className="LikeCounter-TextContainer">
        <p className="LikeCounter-Text">{numberOf}</p>
      </div>
    </div>
  );
};

// #region PROPERTIES
/**
* Properties types of {@link LikeCounter}
* @typedef {Object} LikeCounter.propTypes
* @property {boolean} [applied=false] True if user has selected it, false otherwise
* @property {object} icon FontAwesome icon
* @property {number} numberOf Number of Like / dislike
* @property {function} onClick Callback on button click
*/
// Properties
LikeCounter.propTypes = {
  applied: PropTypes.bool,
  icon: PropTypes.object.isRequired,
  numberOf: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

LikeCounter.defaultProps = {
  applied: false
};
// #endregion

export { LikeCounter };
