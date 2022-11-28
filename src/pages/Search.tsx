import { useState } from 'react';

import Pagination from '../components/Pagination/Pagination';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <h1>Find your movie</h1>
      <form className="" onSubmit={onSearchSubmit}>
        <input type="text" name="" id="" placeholder="Movie name" value={searchQuery} onChange={handleSearchQueryChange} />
        <button type="submit">LUPA-ICON</button>
      </form>
      <div className="results-container">
        <div className="results-placeholder">
          <img src="no-data-image.jpg" alt="" />
          No data
        </div>
        <ul className="results">
          <li className="result">
            <h2 className="result__title">Star wars</h2>
            <img src="result-image.jpg" alt="" className="result__image" />
            <ul className="result-metadata">
              <li className="result-metadata__item">1972</li>
            </ul>
          </li>
        </ul>
      </div>
      <Pagination />
    </>
  )
}

export default Search;
