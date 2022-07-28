import PropTypes from "prop-types";
import React from "react";

import "./NbPerPageSelector.css";

// #region COMPONENT
/**
* A component that render a selector with the number of card to display
* @class
* @category NbPerPageSelector
*/
function NbPerPageSelector(props) {
  //#region INITIALISATION
  const {
    onChange,
    value
  } = props;
  //#endregion

  //#region INTERFACE
  return (
    <div className="NbPerPageSelector-Container">
      <select
        className="NbPerPageSelector-Selector"
        id="numberByPage"
        name="numberByPage"
        onChange={onChange}
        value={value}
      >
        <option value={4}>4</option>
        <option value={8}>8</option>
        <option value={12}>12</option>
      </select>
    </div >
  );
  //#endregion
}
//#endregion

//#region PROPERTIES
/**
* Properties types of {@NbPerPageSelector Movie}
* @typedef {Object} NbPerPageSelector.PropTypes
* @property {function} onChange Callback on number by page changed
* @property {string} value The current page
*/
// Properties
NbPerPageSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};
//#endregion

export { NbPerPageSelector };
