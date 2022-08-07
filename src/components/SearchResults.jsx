import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from './contexts/AppContext';

export default function Navbar({searchInputValue,}) {
  const appContext = useContext(AppContext);
  const [fetchedResults, setFetchedResults] = useState([]);
  /**The following useEffect sets the fetchedResults state to an array of
   * objects with the above structure.*/
  useEffect(() => {
    if (searchInputValue) {
      (async function fetchSearch() {
        const packet = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&query=${searchInputValue}`
        );
        const json = await packet.json();
        const results = json.results;
        setFetchedResults(results);
      })();
      document.querySelector('.searchResultWindow').style.display = 'initial';
      //Scroll to top everytime input value chages
      document.querySelector('.searchResultWindow').scrollTop = 0; // For Safari
      document.querySelector('.searchResultWindow').scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  }, [searchInputValue]);

  /** Make search result window disappear only when clicking not button*/
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target.getAttribute('class') !== 'searchResultEntryAddBtn') {
        document.querySelector('.searchResultWindow').style.display = 'none';
      }
    });
  }, []);

  return (
    <div
      className='searchResultWindow'
      style={{ display: searchInputValue ? 'initial' : 'none' }}
    >
      {fetchedResults &&
        fetchedResults.map((movie) => (
          <div key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              className='searchResultEntryLinkGrid'
            >
              <img
                className='searchResultsImg'
                style={{ gridArea: 'poster' }}
                width='120'
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              ></img>
              <div className='searchResultDetail'>
                <h4>{movie.title}</h4>
                <div>{movie.release_date}</div>
                <div>
                  <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                  {` ${movie.vote_average} (${movie.vote_count})`}
                </div>
                <div
                  className='searchResultsGenre'
                  style={{ fontSize: 'small' }}
                >
                  {movie.genre_ids.map((id) => (
                    <div key={id}>{appContext.getGenre(id)}</div>
                  ))}
                </div>
              </div>
              {appContext.user && (
                <button
                  className='searchResultEntryAddBtn'
                  onClick={(e) => {
                    e.preventDefault();
                    appContext.addToList(movie, 'Watch List');
                  }}
                >
                  Watchlist+
                </button>
              )}
            </Link>
          </div>
        ))}
    </div>
  );
}
