import { Link } from 'react-router-dom';

import { useAppSelector } from '../state/store';
import { IMovie } from '../state/searchSlice';

const NoDataPlaceholder = () => (
  <div className="no-data-placeholder">
    <img src="/assets/no-data.svg" alt="No data" className="no-data-placeholder__image" />
    <div>
      No data
    </div>
  </div>
)

const Movie = ({ data: m }: { data: IMovie }) => {
  return (
    <li className="movie">
      <div className="movie__image-box">
        <Link to={`/movie/${m.imdbID}`}>
          <img src={m.poster} alt={m.title} className="movie__image" />
        </Link>
      </div>
      <div className="movie__info-box">
        <h2 className="movie__title">
          <Link to={`/movie/${m.imdbID}`} className="movie__title-link">
            {m.title}
          </Link>
        </h2>
        <ul className="movie-metadata">
          <li className="movie-metadata-item">
            {m.year}
          </li>
        </ul>
      </div>
    </li>
  )
}

const MovieList = () => {
  const { results, currentPage } = useAppSelector(state => state.search);
  const pageResults = results.filter(result => result.page === currentPage);
  
  if (!results.length) return <NoDataPlaceholder />;

  return (
    <ul className="movie-list">
      {
        pageResults.map((result, key) => <Movie data={result} key={key} />)
      }
    </ul>
  );
}

export default MovieList;
