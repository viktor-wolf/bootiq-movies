import { useState, useEffect } from 'react';

import { searchMovies } from '../state/moviesSlice';
import { useAppDispatch, useAppSelector } from '../state/store';

import SearchPagination from '../components/Pagination';
import MovieList from '../components/MovieList';

const Search = () => {
  const dispatch = useAppDispatch();
  const { movies } = useAppSelector(state => state.movies);
  const [searchQuery, setSearchQuery] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(
    () => searchQuery.length >= 3 ? setSubmitDisabled(false) : setSubmitDisabled(true),
    [searchQuery]
  );

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.length >= 3) dispatch(searchMovies(searchQuery));
  }

  const handleSearchQueryInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  return (
    <>
      <h1 className="page-title">Find your movie</h1>
      <form className="search-form" onSubmit={onSearchSubmit}>
        <div className="search-group">
          <input 
            type="text" 
            name="search-query" 
            id="search-form-search-query" 
            className="search-input"
            placeholder="Movie name" 
            value={searchQuery}
            onInput={handleSearchQueryInput} />
          <button 
            type="submit"
            className="search-submit"
            disabled={submitDisabled}>
              🔍
          </button>
        </div>
      </form>
      <MovieList variant='search' movies={movies} />
      <SearchPagination />
    </>
  )
}

export default Search;
