import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { IMovie } from './moviesSlice';

interface IFetchedMovieDetail {
  Title: string,
  Poster: string,
  Actors: string,
  Awards: string,
  BoxOffice: string,
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
  Year: string,
  imdbID: string,
  imdbRating: string,
  imdbVotes: string,
  Response: string
}

export interface IMovieDetail {
  Title: string,
  Poster: string,
  Actors: string,
  Awards: string,
  ['Box Office']: string,
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
  Year: string,
  ['IMDB ID']: string,
  ['IMDB Rating']: string,
  ['IMDB Votes']: string
}

class MovieDetail implements IMovieDetail {
  Title: string;
  Poster: string;
  Actors: string;
  Awards: string;
  'Box Office': string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Production: string;
  Rated: string;
  Ratings: { Source: string; Value: string}[];
  Released: string;
  Runtime: string;
  Type: string;
  Website: string;
  Year: string;
  'IMDB ID': string;
  'IMDB Rating': string;
  'IMDB Votes': string
  
  constructor(data: IFetchedMovieDetail) {
    this.Title = data.Title;
    this.Poster = data.Poster;
    this.Actors = data.Actors;
    this.Awards = data.Awards;
    this['Box Office'] = data.BoxOffice;
    this.Country = data.Country;
    this.DVD = data.DVD;
    this.Director = data.Director;
    this.Genre = data.Genre;
    this.Language = data.Language;
    this.Metascore = data.Metascore;
    this.Plot = data.Plot;
    this.Production = data.Production;
    this.Rated = data.Rated;
    this.Ratings = data.Ratings;
    this.Released = data.Released;
    this.Runtime = data.Runtime;
    this.Type = data.Type;
    this.Website = data.Website;
    this.Year = data.Year;
    this['IMDB ID'] = data.imdbID;
    this['IMDB Rating'] = data.imdbRating;
    this['IMDB Votes'] = data.imdbVotes
  }

  toMovie(): IMovie {
    return {
      Poster: this.Poster,
      Title: this.Title,
      Type: this.Type,
      Year: this.Year,
      imdbID: this['IMDB ID']
    }
  }
}

interface IDetailState {
  detail: MovieDetail | null
}

const initialState: IDetailState = {
  detail: null
};

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
      .addCase(fetchDetail.fulfilled, (state, action: PayloadAction<IFetchedMovieDetail>) => {
        if (action.payload.Response === 'False') return;

        state.detail = new MovieDetail(action.payload);
      });
  }
});

export default detailSlice.reducer;
