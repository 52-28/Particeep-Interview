import { moviesSlice } from "./moviesSlice";

// #region ACTIONS
export const {
  movieDeleted,
  movieLiked,
  movieDisliked,
  moviesFiltered,
  numberByPageModifed,
  pageSelected
} = moviesSlice.actions;
  // #endregion
