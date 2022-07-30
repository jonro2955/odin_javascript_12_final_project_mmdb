import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { AppContext } from './contexts/AppContext';

export default function MovieCard(props) {
  const appContext = useContext(AppContext);

  // Secrets of Dumbledore
  function shortenedTitle(title) {
    let arr = title.split('');
    if (arr.length > 22) {
      arr = arr.slice(0,20).concat(['.', '.', '.']);
    }
    return arr.join('');
  }

  return (
    <div className='card'>
      <Link to={`/movie/${props.movie.id}`} className='cardLink'>
        <img
          className='posterImg'
          alt={props.movie.title}
          src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
          width='200'
          height='300'
          loading="lazy"
        ></img>
        <div className='cardDetail'>
          <div className='movieCardTitle'>
            {shortenedTitle(props.movie.title)}
          </div>
          <div style={{ fontSize: 'smaller' }}>{props.movie.release_date}</div>
          <div>
            <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
            {` ${props.movie.vote_average.toFixed(1)} (${
              props.movie.vote_count
            }) `}
          </div>
        </div>
      </Link>
      {props.deletable ? (
        // `Remove` Button
        <button
          onClick={() => {
            appContext.removeFromList(props.movie, props.listName);
          }}
        >
          Remove
        </button>
      ) : // `Watchlist+` Button
      appContext.user ? (
        <button
          // `disabled` attribute
          disabled={appContext.user ? props.watchListAdded : false}
          onClick={() => {
            if (appContext.user) {
              appContext.addToList(props.movie, 'Watch List');
            } else {
              alert('You must be logged in to add movies.');
            }
          }}
        >
          Watchlist+
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
