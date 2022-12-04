import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from './store';
import { IMovie } from './shared-types';

export interface IFavsState {
  favs: IMovie[]
}

const initialState: IFavsState = {
  favs: []
};


export const fetchFavs = createAsyncThunk<any, void, { state: RootState }>('favs/fetch-favorites', async () => {
  const dataString = localStorage.getItem('favs');

  if (!dataString) {
    localStorage.setItem('favs', '');
    return [];
  }

  const favIds = JSON.parse(dataString);
  const requests = favIds.map((id: string) => {
    return fetch(`http://www.omdbapi.com/?apikey=${encodeURIComponent(process.env.REACT_APP_API_KEY as string)}&i=${encodeURIComponent(id)}&type=movie`);
  });

  return await Promise.all(requests)
    .then(responses => Promise.all(responses.map(res => res.json())));
});

export const toggleFav = createAsyncThunk<any, string, { state: RootState }>('favs/toggle-fav', async (toggledId, { getState }) => {
  const { favs } = getState().favs;
  const favIndex = favs.findIndex(fav => fav.imdbID === toggledId);

  // TODO: Figure out how to return a favs array instead of those tuples
  if (favIndex > -1) {
    return ['splice', favIndex];
  } else {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${encodeURIComponent(process.env.REACT_APP_API_KEY as string)}&i=${encodeURIComponent(toggledId)}&type=movie`);
    const data = await response.json();
    const movie: IMovie = (({ Poster, Title, Type, Year, imdbID }) => ({ Poster, Title, Type, Year, imdbID }))(data);
    return ['push', movie];
  }
});

export const favsSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavs.fulfilled, (state, action) => {
        state.favs = action.payload;
      })
      .addCase(toggleFav.fulfilled, (state, action) => {
        if (action.payload[0] === 'splice') {
          state.favs.splice(action.payload[1], 1);
        } else {
          state.favs.push(action.payload[1]);
        }
      })
  }
});

export default favsSlice.reducer;
