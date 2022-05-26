import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avatar from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_12_final/odin_javascript_12_mmdb/src/images/user.png';

export default function ActorCard({ actor }) {
  return (
    <div className='card'>
      <Link to={`/actor/${actor.id}`} className='cardLink'>
        <img
          className='posterImg'
          alt={actor.name}
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
              : avatar
          }
          width='200'
          height='300'
        ></img>
      </Link>
      <div className='cardDetail'>
        <div>{actor.name}</div>
        <div>{actor.character}</div>
      </div>
    </div>
  );
}
