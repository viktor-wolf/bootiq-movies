import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../state/store';
import { IMovie } from '../state/moviesSlice';
import { toggleFav } from '../state/favsSlice';

interface IFavToggleProps {
  movie: IMovie
}

const FavToggle: FC<IFavToggleProps> = ({ movie }) => {
  const dispatch = useAppDispatch();
  const { favs } = useAppSelector(state => state.favs);
  const isFav = Boolean(favs.find(fav => fav.imdbID === movie.imdbID));
  
  return (
    <button 
      className={`fav-toggle${ isFav ? ' fav-toggle--toggled' : ''}`}
      onClick={() => {dispatch(toggleFav(movie))}}>
        <svg className="fav-toggle__heart">
          <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle">❤</text>
        </svg>
    </button>
  )
}

export default FavToggle
