import { useContext } from 'react';
import { MyContext } from './MyContext';
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function MovieCard({ movie }) {
  const addToWatchList = useContext(MyContext.addToWatchList);
  return (
    <div className='card'>
      <Link to={`/movie/${movie.id}`} className='cardLink'>
        <img
          className='posterImg'
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          width='200'
          height='300'
        ></img>
      </Link>
      <div className='cardDetail'>
        <div>{movie.title}</div>
        <div>Release Date: {movie.release_date}</div>
        <div>
          <FontAwesomeIcon icon={faStar} />
          {movie.vote_average}
          <button data-movieid={movie.id} onClick={addToWatchList}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
