import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import ActorPage from './components/pages/ActorPage';
import PosterPage from './components/pages/PosterPage';

const firebaseConfig = {
  apiKey: 'AIzaSyDmnDmYKukf4pvEC6QecqF4cSlUmSNeijY',
  authDomain: 'mmdb-97518.firebaseapp.com',
  projectId: 'mmdb-97518',
  storageBucket: 'mmdb-97518.appspot.com',
  messagingSenderId: '456054498165',
  appId: '1:456054498165:web:f31e82fd20ce940728293c',
};

export default function App() {
  return (
    <>
      <HashRouter basename='/'>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movie/:movieId' element={<MoviePage />} />
          <Route path='/poster/:movieId' element={<PosterPage />} />
          <Route path='/actor/:actorId' element={<ActorPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}
