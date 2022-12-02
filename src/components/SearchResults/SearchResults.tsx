import { useAppSelector } from '../../state/store';

const SearchResults = () => {
  const { results, currentPage } = useAppSelector(state => state.search);
  const pageResults = results.filter(result => result.page === currentPage);
  const resultListItems = pageResults.map((r, k) => {
    return (
      <li className="result" key={k}>
        <h2 className="result__title">{r.title}</h2>
        <img src={r.poster} alt={r.title} className="result__image" />
        <ul className="result-metadata">
          <li className="result-metadata__item">{r.year}</li>
        </ul>
      </li>
    )
  });
  return (
    <div className="results-container">
      <div className="results-placeholder">
        <img src="no-data-image.jpg" alt="" />
        No data
      </div>
      <ul className="results">
        {resultListItems}
      </ul>
    </div>
  )
}

export default SearchResults;
