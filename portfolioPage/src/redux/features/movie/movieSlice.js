import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const base_url = '/api';

export const getMovieAndReviews = createAsyncThunk(
  "getMovieAndReviews",
  async ({ id, language }) => {
    const movieResponse = axios.get(`${base_url}/movie/${id}`);
    const reviewsResponse = axios.get(`${base_url}/movie/${id}/reviews?language=${language}`);
    const [movie, reviews] = await axios.all([movieResponse, reviewsResponse]);

    return {
      movie: movie.data,
      reviews: reviews.data
    };
  }
);

export const postRating = createAsyncThunk(
  "postRating",
  async ({ id, rating }) => {
    const response = await axios.post(`${base_url}/movie/${id}/rating`, { value: rating });
    return response.data;
  }
);

const initialState = {
  loading: false,
  movie: {},
  reviews: [],
  error: ""
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push({
        author: "labib",
        author_details: {
          name: "newuser",
          username: "newuser",
          avatar_path: "newuser",
          rating: action.payload.rating
        },
        content: action.payload.review,
        created_at: new Date().toISOString(),
        id: Date.now().toString(),
        updated_at: new Date().toISOString(),
        url: `https://www.themoviedb.org/review/${Date.now().toString()}`
      });
    },
    clearMovie: (state) => {
      state.movie = {};
      state.reviews = [];
      state.loading = false;
      state.error = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieAndReviews.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getMovieAndReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload.movie;
        state.reviews = action.payload.reviews;
      })
      .addCase(getMovieAndReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addReview, clearMovie } = movieSlice.actions;
export default movieSlice.reducer;