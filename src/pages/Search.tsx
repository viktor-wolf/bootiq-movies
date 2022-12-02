import { useState, useEffect } from 'react';

import { fetchMovies } from '../state/searchSlice';
import { useAppDispatch } from '../state/store';

import Pagination from '../components/Pagination/Pagination';
import SearchResults from '../components/SearchResults/SearchResults';

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
    if (searchQuery.length >= 3) dispatch(fetchMovies(searchQuery));
  }

  const handleSearchQueryInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  return (
    <>
      <h1>Find your movie</h1>
      <form className="" onSubmit={onSearchSubmit}>
        <input 
          type="text" 
          name="search-query" 
          id="search-form-search-query" 
          placeholder="Movie name" 
          value={searchQuery}
          onInput={handleSearchQueryInput} />
        <button 
          type="submit"
          disabled={submitDisabled}>
            🔍
        </button>
      </form>
      <SearchResults />
      <Pagination />
    </>
  )
}

export default Search;
