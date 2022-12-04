import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../state/store';
import { IMovie } from '../state/shared-types';
import { toggleFav } from '../state/favsSlice';

const NoDataPlaceholder = () => (
  <div className="no-data-placeholder">
    <img src="/assets/no-data.svg" alt="No data" className="no-data-placeholder__image" />
    <div>
      No data
    </div>
  </div>
)

const Movie = ({ data: movie }: { data: IMovie }) => {
  const dispatch = useAppDispatch();
  const { favs } = useAppSelector(state => state.favs);
  const isFav = favs.find(fav => fav.imdbID === movie.imdbID);
  
  return (
    <li className="movie">
      <div className="movie__image-box">
        <Link to={`/movie/${movie.imdbID}`}>
          <img src={movie.Poster} alt={movie.Title} className="movie__image" />
        </Link>
      </div>
      <div className="movie__info-box">
        <h2 className="movie__title">
          <Link to={`/movie/${movie.imdbID}`} className="movie__title-link">
            {movie.Title}
          </Link>
        </h2>
        <ul className="movie-metadata">
          <li className="movie-metadata-item">
            {movie.Year}
          </li>
        </ul>
      </div>
      { /* TODO: Delete toggle */ }
      <div className="movie__fav-box">
        <button onClick={() => dispatch(toggleFav(movie))}>
          { isFav ? '😍' : '🤍'}
        </button>
      </div>
    </li>
  )
}

const MovieList = () => {
  const { movies } = useAppSelector(state => state.movies);
  
  if (!movies.length) return <NoDataPlaceholder />;

  return (
    <ul className="movie-list">
      {
        movies.map((movie, key) => <Movie data={movie} key={key} />)
      }
    </ul>
  );
}

export default MovieList;
