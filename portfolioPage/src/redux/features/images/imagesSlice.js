import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const base_url = import.meta.env.VITE_IMDB_BASE_ENDPOINT;

export const getImages = createAsyncThunk("images/getImages", async (id) => {
    const numericId = id.split("-")[0]; 
    const response = await axios.get(`${base_url}/images/${numericId}`);
    return response.data;
});

const imagesSlice = createSlice({
    name: "images",
    initialState: {
        images: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getImages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            })
            .addCase(getImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default imagesSlice.reducer;