import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const api_key = import.meta.env.VITE_API_KEY
const base_url = import.meta.env.VITE_BASE_URL

export const getVideo = createAsyncThunk("getVideo", async ({ id, language }) => {
    const response = await axios.get(`${base_url}/video/${id}?language=${language}`);
    return response.data;
});

const initialState = {
    loading: false,
    video: {},
    error: ""
}

export const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getVideo.pending, (state) => {
            state.loading = true
        }),
            builder.addCase(getVideo.fulfilled, (state, action) => {
                state.loading = false
                state.video = action.payload
            }),
            builder.addCase(getVideo.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default videoSlice.reducer