import { movies$ } from "../Data/movies";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
    const response = await movies$;
    return response;
});

export { fetchMovies };