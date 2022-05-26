import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import avatar from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_12_final/odin_javascript_12_mmdb/src/images/user.png';

export default function PosterPage() {
  let movieId = useParams().movieId;
  const [details, setDetails] = useState();

  useEffect(() => {
    (async () => {
      const detailsPacket = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US`
      );
      const detailsJson = await detailsPacket.json();
      setDetails(detailsJson);
    })();
  }, [movieId]);

  return (
    <div id='PosterPage' className='page'>
      {details ? (
        <img
          width='600'
          alt={details.poster_path}
          src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
        ></img>
      ) : (
        avatar
      )}
    </div>
  );
}
