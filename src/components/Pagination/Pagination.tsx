import { useAppSelector, useAppDispatch } from '../../state/store';
import { changeCurrentPage, fetchMovies } from '../../state/searchSlice';

interface IPaginationItemProps {
  disabled: boolean,
  clickHandler(): void,
  text: string,
  extraClass?: string
}

function* generateSequence() {
  let k = 1;
  while (true) yield k++;
}

const PaginationItem = ({ disabled, clickHandler, text, extraClass }: IPaginationItemProps) => {
  return(
    <li className={`pagination-item${extraClass ? ` ${extraClass}` : ''}`}>
      <button
        className="pagination-item__button"
        disabled={disabled}
        onClick={clickHandler}>
          {text}
        </button>
    </li>
  )
}

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, totalPages, lastSearchQuery } = useAppSelector(state => state.search);

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
        extraClass={currentPage >= 5 ? 'pagination-item--first' : ''}
      />
    )
  }

  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1 || i > totalPages) continue;

    links.push(
      <PaginationItem 
        key={keygen.next().value as number}
        text={i.toString()}
        disabled={i === currentPage ? true : false}
        clickHandler={() => {
          dispatch(changeCurrentPage(i));
          dispatch(fetchMovies(lastSearchQuery));
        }}
      />
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
        extraClass={currentPage <= totalPages - 4 ? 'pagination-item--last' : ''}
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
