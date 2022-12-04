import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../state/store';
import { fetchDetail } from '../state/detailSlice';

import NoDataPlaceholder from '../components/NoDataPlaceholder';
import FavToggle from '../components/FavToggle';

const Detail = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { detail } = useAppSelector(state => state.detail);

  useEffect(() => {
    id && dispatch(fetchDetail(id));
  }, [id, dispatch]);

  if(!detail) return <NoDataPlaceholder />

  return (
    <>
      <div className="detail-header">
        <h1 className="page-title page-title--detail">{detail.Title}</h1>
        <FavToggle movie={detail.toMovie()} />
      </div>
    </>
  )
}

export default Detail;
