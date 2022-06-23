import { Link } from 'react-router-dom';
import React from 'react';
import avatar from './images/avatar.png';

export default function ActorCard({ actor }) {
  return (
    <div className='actorCard'>
      <Link to={`/actor/${actor.id}`} className='cardLink'>
        <img
          className='actorImg'
          alt={actor.name}
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
              : avatar
          }
          width='100'
          height='150'
        ></img>
        <div className='actorCardDetail'>
          <div>{actor.name}</div>
        </div>
      </Link>
    </div>
  );
}
