import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';

import './styles/styles.scss';

// import Favorites from './pages/Favorites';
import Movie from './pages/Movie';
import Search from './pages/Search';

import Header from './components/Header';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // useEffect(() => {
  //   dispatch(getStoredFavorites());
  // }, [dispatch]);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          {/* <Route path="/my-favorites" element={<Favorites />} /> */}
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
