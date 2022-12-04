import { useAppSelector } from '../state/store';

const Favorites = () => {
  const { favs } = useAppSelector(state => state.favs);

  return (
    <>
      <h1 className="page-title">Favorites</h1>
      {
        favs.map((f,k) => (<div key={k}>{f.Title}</div>))
      }
    </>
  )
}

export default Favorites;
