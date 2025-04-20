import { createSlice } from '@reduxjs/toolkit'
import * as Functions from '../../../localStorage/localStorage'

const initialState = {
  which_movies: Functions.fetchWhichMovies(),
  sorted_by: Functions.fetchSortedBy(),
  language: Functions.fetchLanguage(),
  input: Functions.fetchInput(),
  genre: Functions.fetchGenre()
}

const navigationBarSlice = createSlice({
  name: 'navigationBar',
  initialState: initialState,
  reducers: {
    setWhichMovies(state, action) {
      state.which_movies = action.payload;
      Functions.storeWhichMovies(state.which_movies)
    },
    setSortedBy(state, action) {
      state.sorted_by = action.payload;
      Functions.storeSortedBy(state.sorted_by)
    },
    setLanguage(state, action) {
      state.language = action.payload;
      Functions.storeLanguage(state.language)
    },
    setInput(state, action) {
      state.input = action.payload;
      Functions.storeInput(state.input)
    },
    setGenre(state, action) {
      state.genre = action.payload;
      Functions.storeGenre(state.genre)
    }
  }
})

export default navigationBarSlice.reducer
export const { setWhichMovies, setSortedBy, setLanguage, setInput, setGenre } = navigationBarSlice.actions