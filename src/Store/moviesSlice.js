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

  return movies;
};

// Apply currentPage
const applyCurrentPage = (state) => {
  const page = state.page;
  // Page film's filter
  let firstItemOfPage = 0;
  let movies = applyCategoryFilterOnMovies(state);

  firstItemOfPage = (page - 1) * state.numberByPage;
  movies = movies.slice(firstItemOfPage, firstItemOfPage + state.numberByPage);
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
      if (!applyCurrentPage(state).length) {
        if (state.page > 1) {
          state.page -= 1;
          state.pageCount -= 1;
        } else {
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
        let moviesFiltered = applyCurrentPage(state);
        // let moviesFiltered = state.movies.filter(movie => movie.category === state.category);
        let movieFiltered = moviesFiltered.find(movie => movie.id === id);
        if (movieFiltered) {
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
      state.category = category;

      if (category === "") {
        state.pageCount = Math.ceil(state.movies.length / state.numberByPage);
        state.moviesFiltered = state.movies.slice(0, state.numberByPage);
        state.page = 1;

        return;
      }

      let movies = state.movies.filter(movie => movie.category === category);
      state.moviesFiltered = movies.slice(0, state.numberByPage);
      state.page = 1;
      state.pageCount = Math.ceil(movies.length / state.numberByPage);
    },
    numberByPageModifed: (state, action) => {
      const numberByPage = action.payload;
      state.numberByPage = numberByPage;

      state.page = 1;
      state.pageCount = Math.ceil(state.movies.length / numberByPage);

      // Maj moviesFiltered
      let movies = state.movies;
      if (state.category !== "") {
        movies = movies.filter(movie => movie.category === state.category);
      }
      state.moviesFiltered = movies.slice(0, numberByPage);
    },
    pageSelected: (state, action) => {
      const page = action.payload;
      state.page = page;

      // Page film's filter
      let firstItemOfPage = 0;
      if (page - 1) {
        firstItemOfPage = (page - 1) * state.numberByPage;
      }

      let movies = state.movies;
      if (state.category !== "") {
        movies = movies.filter(movie => movie.category === state.category);
      }

      state.moviesFiltered = movies.slice(firstItemOfPage, firstItemOfPage + state.numberByPage);
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
        movies = movies.sort((a, b) => {
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
