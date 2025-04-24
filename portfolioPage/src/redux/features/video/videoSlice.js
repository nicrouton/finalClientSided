import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = import.meta.env.VITE_IMDB_BASE_ENDPOINT;

export const getVideo = createAsyncThunk("getVideo", async ({ id, language }) => {
  const response = await axios.get(`${base_url}/video/${id}?language=${language}`);
  return response.data;
});

const initialState = {
  loading: false,
  video: {},
  error: ""
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    clearVideo: (state) => {
      state.video = {};
      state.loading = false;
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVideo.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(getVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearVideo } = videoSlice.actions;
export default videoSlice.reducer;