import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';
import { IMovie } from './shared-types';

export interface IFavsState {
  favs: IMovie[]
}

const initialState: IFavsState = {
  favs: []
};


export const fetchFavs = createAsyncThunk<any, void, { state: RootState }>('favs/fetch-favorites', async (arg, { getState }) => {
  const dataString = localStorage.getItem('favs');

  if (!dataString) return;

  const favIds = JSON.parse(dataString);
  const requests = favIds.map((id: string) => {
    return fetch(`http://www.omdbapi.com/?apikey=${encodeURIComponent(process.env.REACT_APP_API_KEY as string)}&i=${encodeURIComponent(id)}&type=movie`);
  });

  return await Promise.all(requests)
    .then(responses => Promise.all(responses.map(res => res.json())));
});

// export const toggleFav = () => {
//   const favIndex = state.favs.findIndex(fav => fav === action.payload);
//       const movieIndex = state.movies.findIndex(mov => mov.imdbID === action.payload);
//       if (favIndex > -1) {
//         state.favs.splice(favIndex, 1);
//         if (movieIndex > -1) {
//           state.movies.splice(movieIndex, 1);
//         } 
//       } else {
//         state.favs.push(action.payload);
//       }
//       localStorage.setItem('favs', JSON.stringify(state.favs));
// }

export const favsSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavs.fulfilled, (state, action) => {
        console.log(action);
      });
  }
});

export default favsSlice.reducer;
