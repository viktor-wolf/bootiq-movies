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

const Movie = ({ movie, variant }: { movie: IMovie, variant: 'search' | 'favs' }) => {
  const dispatch = useAppDispatch();
  const { favs } = useAppSelector(state => state.favs);
  const isFav = favs.find(fav => fav.imdbID === movie.imdbID);
  let favsVariant;

  if (variant === 'favs') favsVariant = true;
  
  return (
    <li className="movie">
      <div className="movie__image-box">
        <Link to={`/movie/${movie.imdbID}`}>
          <img src={movie.Poster} alt={movie.Title} className="movie__image" />
        </Link>
      </div>
      <div className={`movie__info-box${ favsVariant ? ' movie__info-box--favorites' : ''}`}>
        <h2 className={`movie__title${ favsVariant ? ' movie__title--favorites' : ''}`}>
          <Link to={`/movie/${movie.imdbID}`} className="movie__title-link">
            {movie.Title}
          </Link>
        </h2>
        {
          !favsVariant && (
            <ul className="movie-metadata">
              <li className="movie-metadata-item">
                {movie.Year}
              </li>
            </ul>
          )
        }
      </div>
      {
        favsVariant && (
          <div className="movie__fav-box">
            <button 
              className={`fav-toggle${ isFav ? ' fav-toggle--toggled' : ''}`}
              onClick={() => dispatch(toggleFav(movie))}>
                <svg className="fav-toggle__heart">
                  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle">❤</text>
                </svg>
            </button>
          </div>
        )
      }
    </li>
  )
}

const MovieList = ({ movies, variant }: { movies: IMovie[], variant: 'search' | 'favs' }) => {
  if (!movies.length) return <NoDataPlaceholder />;

  return (
    <ul className="movie-list">
      {
        movies.map((movie, key) => <Movie movie={movie} variant={variant} key={key} />)
      }
    </ul>
  );
}

export default MovieList;
