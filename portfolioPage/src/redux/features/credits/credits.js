import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCredits = createAsyncThunk("credits/getCredits", async (id) => {
    const numericId = id.split("-")[0];
    const response = await axios.get(`http://localhost:5001/api/credits/${numericId}`);
    return response.data;
});

const creditsSlice = createSlice({
    name: "credits",
    initialState: {
        credits: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCredits.pending, (state) => {
                state.loading = true;
                state.error = null;
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

export default creditsSlice.reducer