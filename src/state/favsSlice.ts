import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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
    .then(responses => 
      Promise.all(responses.map(res => res.json()))
    );
});

export const favsSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    toggleFav: (state, action: PayloadAction<IMovie>) => {
      const indexInFavs = state.favs.findIndex(fav => fav.imdbID === action.payload.imdbID);
      if (indexInFavs > -1) {
        state.favs.splice(indexInFavs, 1);
      } else {
        state.favs.push(action.payload);
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchFavs.fulfilled, (state, action) => {
        state.favs = action.payload;
      });
  }
});

export const { toggleFav } = favsSlice.actions;
export default favsSlice.reducer;
