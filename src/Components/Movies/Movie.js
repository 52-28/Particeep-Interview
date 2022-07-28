import { movieDeleted, movieDisliked, movieLiked } from "../../Store/actions";
import { LikeCounter } from "../LikeCounter/LikeCounter";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import "./Movie.css";

// #region COMPONENT
/**
* A component that displays a Film card
* @class
* @category Movie
* @param Movie.propTypes Component properties
*/
const Movie = (props) => {
  //#region INITIALIZATION
  const {
    data
  } = props;

  //Dispatch
  const dispatch = useDispatch();
  //#endregion

  // #region UTILS
  // Return à % like / dislike
  const getRatio = useCallback(() => {
    let total = data.likes + data.dislikes;

    if (!total) {
      return null;
    }

    total = data.likes / (data.likes + data.dislikes);
    return total;
  }, [data]);
  // #endregion

  //#region HOOK
  // Click on dislike button
  const handleClickdisLike = () => {
    dispatch(movieDisliked(data));
  };

  // Click on like button
  const handleClickLike = () => {
    dispatch(movieLiked(data));
  };

  // Click on trash button
  const handleClickTrash = () => {
    dispatch(movieDeleted(data));
  };
  //#endregion

  //#region INTERFACE
  return (
    <div
      className="Movie-Container"
      key={`${data.id}`}
    >
      <img
        alt={`${data.title}`}
        placeholder={`${data.title} image`}
        src={data.image}
      />
      <div className="Movie-ContentContainer">
        <p className="Movie-Title">{data.title}</p>
        <div className="Movie-CategorieContainer">
          <FontAwesomeIcon className="Movie-Icon" icon={faList} />
          <p className="Movie-CategoryText">{data.category}</p>
        </div>
        <div className="Movie-BottomContainer">
          <ProgressBar ratio={getRatio()} />
          <div className="Movie-CountersContainer">
            <LikeCounter
              applied={data.liked}
              icon={faThumbsUp}
              numberOf={data.likes}
              onClick={handleClickLike}
            />
            <LikeCounter
              applied={data.disliked}
              icon={faThumbsDown}
              numberOf={data.dislikes}
              onClick={handleClickdisLike}
            />
            <div className="Movie-TrashContainer">
              <FontAwesomeIcon
                color="#1C252C"
                icon={faTrashAlt}
                onClick={handleClickTrash}
                size="2x"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// #region PROPERTIES
/**
* Properties types of {@link Movie}
      * @typedef {Object} Movie.PropTypes
      * @property {object} data Movie's data
      */
// Properties
Movie.propTypes = {
  data: PropTypes.object.isRequired
};
// #endregion

export { Movie };
