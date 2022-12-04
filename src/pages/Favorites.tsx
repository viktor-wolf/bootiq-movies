import { useAppSelector } from '../state/store';

import MovieList from '../components/MovieList';

const Favorites = () => {
  const { favs } = useAppSelector(state => state.favs);

  return (
    <>
      <h1 className="page-title">Favorites</h1>
      <MovieList variant='favs' movies={favs} />
    </>
  )
}

export default Favorites;
