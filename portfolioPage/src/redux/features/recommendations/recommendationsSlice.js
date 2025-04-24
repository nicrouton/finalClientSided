import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = import.meta.env.VITE_IMDB_BASE_ENDPOINT;

export const getRecommendations = createAsyncThunk("getRecommendations", async (id) => {
    const response = await axios.get(`${base_url}/recommendations/${id}`);
    return response.data;
});

const initialState = {
    loading: false,
    recommendations: [],
    error: ""
};

export const recommendationsSlice = createSlice({
    name: "recommendations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRecommendations.pending, (state) => {
                state.loading = true;
            })
            .addCase(getRecommendations.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendations = action.payload;
            })
            .addCase(getRecommendations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default recommendationsSlice.reducer;