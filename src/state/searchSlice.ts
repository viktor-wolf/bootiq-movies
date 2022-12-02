import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

interface IAPIMovie {
  Poster: string,
  Title: string,
  Type: string,
  Year: string,
  imdbID: string
}

export interface IMovie {
  page: number,
  poster: string,
  title: string,
  type: string,
  year: string,
  imdbID: string
}

export interface ISearchState {
  results: IMovie[],
  totalPages: number,
  currentPage: number,
  lastSearchQuery: string,
  status: string
}

const initialState: ISearchState = {
  results: [],
  totalPages: 1,
  currentPage: 1,
  lastSearchQuery: '',
  status: 'idle'
};

export const fetchMovies = createAsyncThunk<any, string, { state: RootState }>('search/fetch', async (searchQuery, { getState }) => {
  const { currentPage, results } = getState().search;

  if (results.find(r => r.page === currentPage)) {
    return Promise.resolve();
  }

  const response = await fetch(`http://www.omdbapi.com/?apikey=${encodeURIComponent(process.env.REACT_APP_API_KEY as string)}&s=${encodeURIComponent(searchQuery)}&type=movie&page=${currentPage}`);
  return response.json();
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    fetchFavorites: (state) => {

    },
    searchMovies: (state, action: PayloadAction<string>) => {
      
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        if (action.meta.arg !== state.lastSearchQuery) {
          state.results = [];
          state.totalPages = 1;
          state.currentPage = 1;
          state.lastSearchQuery = action.meta.arg;
        }
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (!action.payload) return;
        
        const { payload } = action;
        
        if (payload.Search && payload.Search.length) {
          payload.Search.forEach((result: IAPIMovie) => {
            state.results.push({
              page: state.currentPage,
              poster: result.Poster,
              title: result.Title,
              type: result.Type,
              year: result.Year,
              imdbID: result.imdbID
            } as IMovie);
          });
        }

        if (payload.totalResults) {
          state.totalPages = Math.ceil(payload.totalResults / parseInt(process.env.REACT_APP_RESULTS_PER_PAGE as string));
        }

        state.status = 'idle'
      })
  }
});

export const { changeCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;
