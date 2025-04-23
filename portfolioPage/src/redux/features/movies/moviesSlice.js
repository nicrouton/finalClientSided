import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const base_url = import.meta.env.VITE_IMDB_BASE_ENDPOINT

export const getMovies = createAsyncThunk("getMovies", async ({ endpoint }) => {
    const response = await axios.get(`${base_url}/movies`, {
        params: { endpoint }
    });
    return response.data;
});

const initialState = {
    loading: false,
    movies: [],
    error: ""
}

export const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default moviesSlice.reducer;