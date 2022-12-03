import { useState, useEffect } from 'react';

import { searchMovies } from '../state/moviesSlice';
import { useAppDispatch } from '../state/store';

import SearchPagination from '../components/SearchPagination';
import MovieList from '../components/SearchResults';

const Search = () => {
  const dispatch = useAppDispatch();
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
      <MovieList />
      <SearchPagination />
    </>
  )
}

export default Search;
