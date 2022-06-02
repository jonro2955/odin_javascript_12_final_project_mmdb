import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { ListsContext } from './ListsContext';

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
      </Link>
      <div className='cardDetail'>
        <div>{props.movie.title}</div>
        <div>Release Date: {props.movie.release_date}</div>
        <div>
          <FontAwesomeIcon icon={faStar} />
          {props.movie.vote_average}
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
                appContext.addToList(props.movie, 'Watch List');
              }}
            >
              Watchlist+
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
