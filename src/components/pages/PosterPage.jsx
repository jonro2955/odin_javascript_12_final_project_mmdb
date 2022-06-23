import { useParams } from 'react-router-dom';
import React from 'react';

/**This can display either a movie poster or an actor photo */
export default function PosterPage() {
  let path = useParams().path;

  return (
    <div id='PosterPage' className='page'>
      <img
        width='600'
        alt={path}
        src={`https://image.tmdb.org/t/p/original/${path}`}
      ></img>
    </div>
  );
}
