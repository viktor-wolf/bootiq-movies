import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import moviesReducer from './moviesSlice';
import favsReducer from './favsSlice';
import persistenceMiddleware from './middleware';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favs: favsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(persistenceMiddleware.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
