import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

/**Get search up. Search api request:
 * `https://api.themoviedb.org/3/search/movie?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&query=${search}`
 * Replace ${search} with the search input string. Render the resulting data onto
 */
export default function Navbar(props) {
  const [fetchedResults, setFetchedResults] = useState([]);
  const [displayOn, setDisplayOn] = useState(false);
  const sampleFetchedResultEntry = {
    adult: false,
    backdrop_path: '/hcNM0HjfPonIzOVy6LVTDBXSfMq.jpg',
    genre_ids: (3)[(28, 53, 80)],
    id: 864116,
    original_language: 'en',
    original_title: 'A Day to Die',
    overview:
      "A disgraced parole officer is indebted to a local gang leader and forced to pull off a series of dangerous drug heists within twelve hours in order to pay the $2 million dollars he owes, rescue his kidnapped pregnant wife, and settle a score with the city's corrupt police chief, who is working with the gang leader and double-crossed him years ago.",
    popularity: 1812.82,
    poster_path: '/8Kce1utfytAG5m1PbtVoDzmDZJH.jpg',
    release_date: '2022-03-04',
    title: 'A Day to Die',
    video: false,
    vote_average: 5.8,
    vote_count: 41,
  };
  /**The following useEffect sets the fetchedResults state to an array of
   * objects with the above structure.
   * */
  useEffect(() => {
    if (props.searchInputValue) {
      (async function fetchSearch() {
        const packet = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&query=${props.searchInputValue}`
        );
        const json = await packet.json();
        const results = json.results;
        setFetchedResults(results);
      })();
      document.querySelector('.searchResultWindow').style.display = 'initial';
    }
  }, [props]);

  /** Make search result window disappear when clicking anything else*/
  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target !== document.querySelector('.searchResultWindow')) {
        document.querySelector('.searchResultWindow').style.display = 'none';
      }
    });
  }, []);

  function getGenre(idNum) {
    const genreList = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
    ];
    const target = genreList.find((obj) => {
      return obj.id === idNum;
    });
    return target.name;
  }

  return (
    <div
      className='searchResultWindow'
      // style={{ display: props.searchInputValue ? 'initial' : 'none' }}
    >
      {fetchedResults &&
        fetchedResults.map((movie) => (
          <div key={movie.id}>
            <Link
              to={`/movie/${movie.id}`}
              style={{ textDecoration: 'none', color: 'aliceblue' }}
            >
              <div className='searchResultEntry'>
                <img
                  style={{ gridArea: 'poster' }}
                  height='200'
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                ></img>
                <h4 style={{ gridArea: 'title' }}>{movie.title}</h4>
                <div style={{ gridArea: 'release_date' }}>
                  Released: {movie.release_date}
                </div>
                <div style={{ gridArea: 'vote_average' }}>
                  <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
                  {` ${movie.vote_average} (${movie.vote_count})`}
                </div>
                <div style={{ gridArea: 'genre_ids', fontSize: 'small' }}>
                  {movie.genre_ids.map((id) => (
                    <div>{getGenre(id)}</div>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
