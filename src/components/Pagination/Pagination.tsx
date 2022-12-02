import { useAppSelector, useAppDispatch } from '../../state/store';
import { changeCurrentPage, fetchMovies } from '../../state/searchSlice';

const Pagination = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state);

  const links = [];

  for (let i = 1; i <= state.search.totalPages; i++) {
    links.push(
      <li className="pagination-item" key={i}>
        <button 
          className="pagination-item__button"
          onClick={() => {
            dispatch(changeCurrentPage(i));
            dispatch(fetchMovies(state.search.lastSearchQuery));
          }}>
            {i}
          </button>
      </li>
    )
  }
  
  return (
    <ul className="pagination">
      {links}
    </ul>
  )
}

export default Pagination;
