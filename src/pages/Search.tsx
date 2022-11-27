import Pagination from '../components/Pagination/Pagination'

export default function Search() {
  return (
    <>
      <h1>Find your movie</h1>
      <form action="">
        <input type="text" name="" id="" placeholder="Movie name" />
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
