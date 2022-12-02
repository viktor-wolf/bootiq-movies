import { useAppSelector, useAppDispatch } from '../state/store';
import { changeCurrentPage, fetchMovies } from '../state/searchSlice';

import PaginationItem from './PaginationItem';

function* generateSequence() {
  let k = 1;
  while (true) yield k++;
}

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages, lastSearchQuery } = useAppSelector(state => state.search);

  if (totalPages <= 1) return null;

  const keygen = generateSequence();
  
  const links = [];

  links.push(
    <PaginationItem 
      key={keygen.next().value as number}
      text={'<'} 
      disabled={currentPage === 1 ? true : false}
      clickHandler={() => {
        dispatch(changeCurrentPage(currentPage - 1));
        dispatch(fetchMovies(lastSearchQuery));
      }}/>
  )

  if (currentPage >= 4) {
    links.push(
      <PaginationItem 
        key={keygen.next().value as number}
        text={'1'}
        disabled={false}
        clickHandler={() => {
          dispatch(changeCurrentPage(1));
          dispatch(fetchMovies(lastSearchQuery));
        }}
      />
    )
  }

  if (currentPage >= 5) {
    links.push(
      <li className="pagination-ellipsis" aria-hidden="true">···</li>
    )
  }

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1 || i > totalPages) continue;

    const isActive = i === currentPage ? true : false;

    links.push(
      <PaginationItem 
        key={keygen.next().value as number}
        text={i.toString()}
        disabled={isActive}
        clickHandler={() => {
          dispatch(changeCurrentPage(i));
          dispatch(fetchMovies(lastSearchQuery));
        }}
        active={isActive}
      />
    )
  }

  if (currentPage <= totalPages - 4) {
    links.push(
      <li className="pagination-ellipsis" aria-hidden="true">···</li>
    )
  }

  if (currentPage <= totalPages - 3) {
    links.push(
      <PaginationItem 
        key={keygen.next().value as number}
        text={totalPages.toString()}
        disabled={false}
        clickHandler={() => {
          dispatch(changeCurrentPage(totalPages));
          dispatch(fetchMovies(lastSearchQuery));
        }}
      />
    )
  }

  links.push(
    <PaginationItem 
      key={keygen.next().value as number}
      text={'>'} 
      disabled={currentPage === totalPages ? true : false}
      clickHandler={() => {
        dispatch(changeCurrentPage(currentPage + 1));
        dispatch(fetchMovies(lastSearchQuery));
      }}/>
  )
  
  return (
    <ul className="pagination">
      {links}
    </ul>
  )
}

export default Pagination;
