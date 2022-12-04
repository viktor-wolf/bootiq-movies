import { FC } from 'react';
import { Link } from 'react-router-dom';

import { IMovie } from '../state/moviesSlice';

import FavToggle from './FavToggle';
import NoDataPlaceholder from './NoDataPlaceholder';

interface IMovieListFCSharedProps {
  variant: 'search' | 'favs'
}

interface IMovieFCProps extends IMovieListFCSharedProps{
  movie: IMovie
}

interface IMovieListFCProps extends IMovieListFCSharedProps {
  movies: IMovie[]
}

const Movie: FC<IMovieFCProps> = ({ movie, variant }) => {
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
        (
          favsVariant && (
            <div className="movie__fav-box">
              <FavToggle movie={movie} />
            </div>
          )
        )
      }
    </li>
  )
}

const MovieList: FC<IMovieListFCProps> = ({ movies, variant }) => {
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
