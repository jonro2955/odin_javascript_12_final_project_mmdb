import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext } from '../AppContext';
import MovieCarousel from '../MovieCarousel';
import ActorCarousel from '../ActorCarousel';
import Adder from '../Adder';

export default function MoviePage() {
  let movieId = useParams().movieId;
  const appContext = useContext(AppContext);
  const [movie, setMovie] = useState();
  const [videoKeys, setVideoKeys] = useState();
  const [cast, setCast] = useState();
  const [recommendedList, setRecommendedList] = useState();
  const [similarList, setSimilarList] = useState();
  const [trailerKey, setTrailerKey] = useState();

  useEffect(() => {
    (async () => {
      const moviePacket = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US`
      );
      const castPacket = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US`
      );
      const recommendedPacket = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1`
      );
      const similarPacket = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1`
      );
      const videoPacket = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US`
      );
      const movieJson = await moviePacket.json();
      const castJson = await castPacket.json();
      const recommendedJson = await recommendedPacket.json();
      const similarJson = await similarPacket.json();
      const videoJson = await videoPacket.json();
      setMovie(movieJson);
      setCast(castJson.cast);
      setRecommendedList(recommendedJson.results);
      setSimilarList(similarJson.results);
      setVideoKeys(videoJson.results);
      //Scroll to top everytime this component mounts:
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })();
  }, [movieId]);

  useEffect(() => {
    if (videoKeys) {
      let trailerKey = videoKeys.find((key) => {
        return key.type === 'Trailer';
      });
      setTrailerKey(trailerKey.key);
      // console.log(trailerKey);
    }
  }, [videoKeys]);

  return (
    movie &&
    trailerKey &&
    cast && (
      <div id='MoviePage' className='page'>
        <div className='flexCenteredColumn container70W'>
          <h1>{movie.title}</h1>
          <Adder movie={movie} />
          {movie.tagline && <h3>"{movie.tagline}"</h3>}
          <div style={{ marginBottom: '10px' }}>
            Release Date: {movie.release_date}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <FontAwesomeIcon icon={faStar} />
            {movie.vote_average}
          </div>
          <div style={{ width: '100%' }}>
            <div className='visualsContainer'>
              <Link to={`/poster/${movieId}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                  height='400'
                  className='moviePagePoster'
                ></img>
              </Link>
              <iframe
                width='773'
                height='400'
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='Embedded youtube'
              />
            </div>
            <div className='overview'>{movie.overview}</div>
          </div>
        </div>
        <h3>Top 10 Cast</h3>
        <ActorCarousel id='ActorCarousel' actorList={cast.slice(0, 10)} />
        {recommendedList.length > 0 && (
          <>
            <h1>Recommended</h1>
            <MovieCarousel movieList={recommendedList} id='recommendedList' />
          </>
        )}
        {similarList.length > 0 && (
          <>
            <h1>Similar</h1>
            <MovieCarousel movieList={similarList} id='similarList' />
          </>
        )}
      </div>
    )
  );
}
