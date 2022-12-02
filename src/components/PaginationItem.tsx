interface IPaginationItemProps {
  disabled: boolean,
  clickHandler(): void,
  text: string,
  active?: boolean
}

const PaginationItem = ({ disabled, clickHandler, text, active }: IPaginationItemProps) => {
  return(
    <li className={'pagination-item'}>
      <button
        className={`pagination-item__button${ active ? ' pagination-item__button--active' : ''}`}
        disabled={disabled}
        onClick={clickHandler}>
          {text}
        </button>
    </li>
  )
}

export default PaginationItem;
