import { fetchMovies } from '../API/MoviesAPI';
import {
  EMPTY,
  FAILED,
  initialState,
  LOADING,
  SUCCEDEED
} from './constants';
import { createSlice } from '@reduxjs/toolkit';

// #region UTILS
// Apply category filter
const applyCategoryFilterOnMovies = (state) => {
  let movies = [...state.movies];

  if (state.category !== "") {
    return movies.filter(movie => movie.category === state.category);
  }

  // If no category filter, return state.movies
  return movies;
};

// Apply currentPage
const applyCurrentPage = (state) => {
  const page = state.page;
  // Page film's filter
  let firstItemOfPage = 0;
  let movies = applyCategoryFilterOnMovies(state);

  firstItemOfPage = (page - 1) * state.numberByPage;
  movies = movies.slice(firstItemOfPage, firstItemOfPage + Number(state.numberByPage));
  return movies;
};
// #endregion

// #region SLICE
export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    movieDeleted: (state, action) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload.id);
      // If the current page has no movies
      if (!applyCurrentPage(state).length) {
        if (state.page > 1) {
          //  return the previous page
          state.page -= 1;
          state.pageCount -= 1;
        } else {
          // Delete the category filter and return to 1st page
          state.category = "";
        }
      }

      let moviesLength = applyCategoryFilterOnMovies(state).length;
      state.moviesFiltered = applyCurrentPage(state);
      state.pageCount = Math.ceil(moviesLength / state.numberByPage);
    },
    movieLiked: (state, action) => {
      const { id } = action.payload;
      const movieFinded = state.movies.find(movie => movie.id === id);
      if (!movieFinded) {
        return;
      }

      if (movieFinded.liked) {
        movieFinded.liked = false;
        movieFinded.likes -= 1;
      } else {
        movieFinded.liked = true;
        movieFinded.likes += 1;
      }

      if (movieFinded.disliked) {
        movieFinded.disliked = false;
        movieFinded.dislikes -= 1;
      }

      // // Apply on moviesFiltered
      if (state.category !== "") {
        // Get movies of the current page
        let moviesFiltered = applyCurrentPage(state);
        // Get the movie liked
        let movieFiltered = moviesFiltered.find(movie => movie.id === id);
        if (movieFiltered) {
          // Replace by the original movie
          movieFiltered = movieFinded;
        }
        state.moviesFiltered = moviesFiltered;
      } else {
        state.moviesFiltered = applyCurrentPage(state);
      }
    },
    movieDisliked: (state, action) => {
      const { id } = action.payload;
      const movieFinded = state.movies.find(movie => movie.id === id);
      if (!movieFinded) {
        return;
      }

      if (movieFinded.disliked) {
        movieFinded.disliked = false;
        movieFinded.dislikes -= 1;
      } else {
        movieFinded.disliked = true;
        movieFinded.dislikes += 1;
      }

      if (movieFinded.liked) {
        movieFinded.liked = false;
        movieFinded.likes -= 1;
      }

      // // Apply on moviesFiltered
      if (state.category !== "") {
        let moviesFiltered = applyCurrentPage(state);
        let movieFiltered = moviesFiltered.find(movie => movie.id === id);
        if (movieFiltered) {
          movieFiltered = movieFinded;
        }
        state.moviesFiltered = moviesFiltered;
      } else {
        state.moviesFiltered = applyCurrentPage(state);
      }
    },
    moviesFiltered: (state, action) => {
      const category = action.payload;
      // Update category applied
      state.category = category;
      // Get movies filtered on category
      let movies = applyCategoryFilterOnMovies(state);

      // Reset current page
      state.page = 1;

      // Update page count
      state.pageCount = Math.ceil(movies.length / state.numberByPage);

      // Filter movies on 1st page
      state.moviesFiltered = movies.slice(0, state.numberByPage);
    },
    numberByPageModifed: (state, action) => {
      // Get the last index of item in current page
      const lastIndexOfMoviePage = state.page * Number(state.numberByPage) - 1;
      // Get the first index of item in current page
      const firstIndexOfMoviePage = lastIndexOfMoviePage + 1 - (state.numberByPage);

      // Update number by page
      const numberByPage = action.payload;
      state.numberByPage = numberByPage;

      // Update page count
      let movies = applyCategoryFilterOnMovies(state);
      state.pageCount = Math.ceil(movies.length / Number(numberByPage));

      // Update current page
      state.page = Math.ceil((firstIndexOfMoviePage + 1) / Number(numberByPage));

      // Maj moviesFiltered
      state.moviesFiltered = applyCurrentPage(state);
    },
    pageSelected: (state, action) => {
      const page = action.payload;
      state.page = page;

      state.moviesFiltered = applyCurrentPage(state);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = LOADING;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        let movies = action.payload;
        if (!movies.length) {
          state.status = EMPTY;
        } else {
          state.status = SUCCEDEED;
        }

        // Sort array by title ascending
        movies = movies.slice().sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });

        state.movies = movies;
        state.moviesFiltered = movies.slice(0, state.page * state.numberByPage);
        state.pageCount = Math.ceil(action.payload.length / state.numberByPage);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = FAILED;
        state.error = action.error.message;
      });
  }
});
// #endregion

export default moviesSlice.reducer;
