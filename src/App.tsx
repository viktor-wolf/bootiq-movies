import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from './state/store';
import { fetchFavs } from './state/favsSlice';

import './styles/styles.scss';

import Favorites from './pages/Favorites';
import Movie from './pages/Movie';
import Search from './pages/Search';

import Header from './components/Header';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {dispatch(fetchFavs())}, [dispatch]);
  
  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/my-favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
