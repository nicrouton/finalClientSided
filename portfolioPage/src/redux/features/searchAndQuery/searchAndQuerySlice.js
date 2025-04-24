import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = import.meta.env.VITE_IMDB_BASE_ENDPOINT;

export const getSearchAndQuery = createAsyncThunk("getSearchAndQuery", async (input) => {
  const response = await axios.get(`${base_url}/search?query=${input}`);
  return response.data;
});

const initialState = {
  loading: false,
  movies: [],
  error: ""
};

const searchAndQuerySlice = createSlice({
  name: "searchAndQuery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchAndQuery.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getSearchAndQuery.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getSearchAndQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default searchAndQuerySlice.reducer;