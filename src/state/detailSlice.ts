import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { IMovie } from './moviesSlice';

interface IDetailBase {
  Title: string,
  Poster: string,
  Actors: string,
  Awards: string,
  Country: string,
  DVD: string,
  Director: string,
  Genre: string,
  Language: string,
  Metascore: string,
  Plot: string,
  Production: string,
  Rated: string,
  Ratings: { Source: string, Value: string}[],
  Released: string,
  Runtime: string,
  Type: string,
  Website: string,
  Year: string
}

interface IDetailForeign extends IDetailBase {
  BoxOffice: string,
  imdbID: string,
  imdbRating: string,
  imdbVotes: string,
  Response: string
}

export interface IDetailLocal extends IDetailBase {
  'Box Office': string,
  'IMDB ID': string,
  'IMDB Rating': string,
  'IMDB Votes': string
}

interface IDetailState {
  detail: IDetailLocal | null
}

const initialState: IDetailState = {
  detail: null
};

const detailForeignToDetailLocal = ({ BoxOffice, imdbID, imdbRating, imdbVotes, ...rest }: IDetailForeign) => {
  return { 
    'Box Office': BoxOffice, 
    'IMDB ID': imdbID,
    'IMDB Rating': imdbRating,
    'IMDB Votes': imdbVotes,
    ...rest
  }
}

export const detailLocalToMovie = ({ Poster, Title, Type, Year, 'IMDB ID': imdbID }: IDetailLocal): IMovie => {
  return {
    Poster,
    Title,
    Type,
    Year,
    imdbID
  }
} 

export const fetchDetail = createAsyncThunk<any, string, { state: RootState }>('detail/fetch-detail', async (id) => {
  const response = await fetch(`http://www.omdbapi.com/?apikey=${encodeURIComponent(process.env.REACT_APP_API_KEY as string)}&i=${encodeURIComponent(id)}`);
  return response.json();
});

export const detailSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDetail.fulfilled, (state, action: PayloadAction<IDetailForeign>) => {
        if (action.payload.Response === 'False') return;

        state.detail = detailForeignToDetailLocal(action.payload);
      });
  }
});

export default detailSlice.reducer;
