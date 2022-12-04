import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export interface IMovie {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string
}

interface IMoviesState {
  movies: IMovie[],
  totalPages: number,
  currentPage: number,
  lastSearchQuery: string
}

const initialState: IMoviesState = {
  movies: [],
  totalPages: 1,
  currentPage: 1,
  lastSearchQuery: ''
};

export const searchMovies = createAsyncThunk<any, string, { state: RootState }>('movies/search', async (searchQuery, { getState }) => {
  const { currentPage } = getState().movies;

  const response = await fetch(`http://www.omdbapi.com/?apikey=${encodeURIComponent(process.env.REACT_APP_API_KEY as string)}&s=${encodeURIComponent(searchQuery)}&type=movie&page=${currentPage}`);
  return response.json();
});

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(searchMovies.pending, (state, action) => {
        if (action.meta.arg !== state.lastSearchQuery) {
          state.movies = [];
          state.totalPages = 1;
          state.currentPage = 1;
          state.lastSearchQuery = action.meta.arg;
        }
      })
      .addCase(searchMovies.fulfilled, (state, { payload }) => {
        if (payload.Search && payload.Search.length) {
          state.movies = payload.Search;
        }

        if (payload.totalResults) {
          state.totalPages = Math.ceil(payload.totalResults / parseInt(process.env.REACT_APP_RESULTS_PER_PAGE as string));
        }
      });
  }
});

export const { changeCurrentPage } = moviesSlice.actions;
export default moviesSlice.reducer;
