import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { AppContext } from './contexts/AppContext';
import { ListsContext } from './contexts/ListsContext';

export default function MovieCard(props) {
  const appContext = useContext(AppContext);
  const listsContext = useContext(ListsContext);

  return (
    <div className='card'>
      <Link to={`/movie/${props.movie.id}`} className='cardLink'>
        <img
          className='posterImg'
          alt={props.movie.title}
          src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
          width='200'
          height='300'
        ></img>
        <div className='cardDetail'>
          <div className='movieCardTitle'>{props.movie.title}</div>
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
        <button
          onClick={() => {
            listsContext.removeFromList(
              appContext,
              props.movie,
              props.listName
            );
          }}
        >
          Remove
        </button>
      ) : (
        <button
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
      )}
    </div>
  );
}
