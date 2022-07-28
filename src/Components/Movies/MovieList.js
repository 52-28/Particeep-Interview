import { fetchMovies } from "../../API/MoviesAPI";
import { IDLE, LOADING } from "../../Store/constants";
import { selectMovies, selectMoviesStatus } from "../../Store/selectors";
import { MoviesLoader } from "../MoviesLoader/MoviesLoader";
import { Movie } from "./Movie";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./MovieList.css";

// #region COMPONENT
/**
* A component that displays a list of movies
* @class
* @category MovieList
*/
const MovieList = () => {
  //#region INITIALIZATION
  // Selectors
  const movies = useSelector(selectMovies);
  const movieStatus = useSelector(selectMoviesStatus);

  // Dispatch
  const dispatch = useDispatch();
  //#endregion

  //#region HOOK
  // Movies initialisation
  useEffect(() => {
    if (movieStatus !== IDLE) {
      return;
    }

    dispatch(fetchMovies());
  }, [movieStatus, dispatch]);
  //#endregion

  //#region INTERFACE
  return (
    <div className="MovieList-Container">
      {movieStatus === LOADING
        ?
        <MoviesLoader />
        :
        movies.map((movie) => {
          return (
            <Movie
              data={movie}
              key={`${movie.id}`}
            />
          );
        })
      }
    </div>
  );
  //#endregion
};
//#endregion

export { MovieList };
