import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './styles/styles.scss';

import Favorites from './pages/Favorites';
import Movie from './pages/Movie';
import Search from './pages/Search';

import Header from './components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/my-favorites" element={<Favorites />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
