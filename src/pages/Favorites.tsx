import { useEffect } from 'react';

import { fetchFavs } from '../state/favsSlice';
import { useAppDispatch } from '../state/store';

import MovieList from '../components/SearchResults';

const Favorites = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {dispatch(fetchFavs())}, [dispatch]);

  return (
    <>
      <h1 className="page-title">Favorites</h1>
      <MovieList />
    </>
  )
}

export default Favorites;
