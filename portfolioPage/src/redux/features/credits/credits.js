import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = '/api';

export const getCredits = createAsyncThunk("credits/getCredits", async (id) => {
  const numericId = id.split("-")[0];
  const response = await axios.get(`${base_url}/credits/${numericId}`);
  return response.data;
});

const initialState = {
  loading: false,
  credits: {
    cast: [],
    crew: []
  },
  error: ""
};

const creditsSlice = createSlice({
  name: "credits",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCredits.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload;
      })
      .addCase(getCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default creditsSlice.reducer;
