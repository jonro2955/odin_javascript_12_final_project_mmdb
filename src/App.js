import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';

export default function App() {
  const [mostPopularList, setMostPopularList] = useState([]);
  const [comingSoonList, setComingSoonList] = useState([]);
  const [nowPlayingList, setNowPlayingList] = useState([]);
  const [topRatedList, setTopRatedList] = useState([]);
  useEffect(() => {
    (async function fetchPopular() {
      const packet = await fetch(
        'https://api.themoviedb.org/3/movie/popular?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1'
      );
      const json = await packet.json();
      const array = json.results;
      console.log(array);
      setMostPopularList(array);
      // console.log('Popular', array);
    })();
    (async function fetchComingSoon() {
      const packet = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1'
      );
      const json = await packet.json();
      const array = json.results;
      setComingSoonList(array);
      // console.log('Coming Soon', array);
    })();
    (async function fetchBoxOffice() {
      const packet = await fetch(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1'
      );
      const json = await packet.json();
      const array = json.results;
      setNowPlayingList(array);
      // console.log('Box office', array);
    })();
    (async function fetchTopRated() {
      const packet = await fetch(
        'https://api.themoviedb.org/3/movie/top_rated?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1'
      );
      const json = await packet.json();
      const array = json.results;
      setTopRatedList(array);
      // console.log('Top rated', array);
    })();
  }, []);

  return (
    <>
      <HashRouter basename='/'>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              <HomePage
                mostPopularList={mostPopularList}
                comingSoonList={comingSoonList}
                nowPlayingList={nowPlayingList}
                topRatedList={topRatedList}
              />
            }
          />
        </Routes>
      </HashRouter>
    </>
  );
}
