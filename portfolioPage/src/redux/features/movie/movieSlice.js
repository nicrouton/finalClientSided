import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const base_url = import.meta.env.VITE_IMDB_BASE_ENDPOINT
const access_token = import.meta.env.VITE_ACCESS_TOKEN 

// Fetch movie details and reviews
export const getMovieAndReviews = createAsyncThunk("getMovieAndReviews", async ({ id, language }) => {
    const movieResponse = axios.get(`${base_url}/movie/${id}?api_key=${api_key}&language=${language}`)
    const reviewsResponse = axios.get(`${base_url}/movie/${id}/reviews?api_key=${api_key}&language=${language}`)
    
    const [movie, reviews] = await axios.all([movieResponse, reviewsResponse])
    return { movie: movie.data, reviews: reviews.data.results }
})

export const postRating = createAsyncThunk("postRating", async ({ id, rating }) => {
    const response = await axios.post(`${base_url}/movie/${id}/rating`, {
        value: rating
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        }
    })
    // return response.data
    console.log(response.data);
})

const initialState = {
    loading: false,
    movie: {},
    reviews: [],
    error: ""
}

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        addReview: (state, action) => {
            state.reviews.push({
                // author: action.payload.author,
                // author_details: {
                //     name: action.payload.author,
                //     username: action.payload.author,
                //     avatar_path: action.payload.avatar_path,
                //     rating: action.payload.rating
                // },
                // content: action.payload.content,
                // created_at: Date.now().toString(),
                // id: Date.now().toString(),
                // updated_at: Date.now().toString(),
                // url: `https://www.themoviedb.org/review/${Date.now().toString()}`,
                author: "labib",
                author_details: {
                    name: "newuser",
                    username: "newuser",
                    avatar_path: "newuser",
                    rating: action.payload.rating
                },
                content: action.payload.review,
                created_at: Date.now().toString(),
                id: Date.now().toString(),
                updated_at: Date.now().toString(),
                url: `https://www.themoviedb.org/review/${Date.now().toString()}`,
            },)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovieAndReviews.pending, (state) => {
                state.loading = true
            })
            .addCase(getMovieAndReviews.fulfilled, (state, action) => {
                state.loading = false
                state.movie = action.payload.movie
                state.reviews = action.payload.reviews
            })
            .addCase(getMovieAndReviews.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export const { addReview } = movieSlice.actions
export default movieSlice.reducer