import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from "../../Store/moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer
  },
});
