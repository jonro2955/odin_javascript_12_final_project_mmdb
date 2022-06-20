import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDoc, doc } from 'firebase/firestore';
import { AppContext } from '../contexts/AppContext';
import MovieCarousel from '../MovieCarousel';
import ActorCarousel from '../ActorCarousel';
import MovieAdder from '../MovieAdder';
import MovieRater from '../MovieRater';
import MovieReviews from '../MovieReviews';

export default function MoviePage() {
  let movieId = useParams().movieId;
  const appContext = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
  const [usersPriorReview, setUsersPriorReview] = useState();
  const [movieObject, setMovieObject] = useState();
  const [videoKeys, setVideoKeys] = useState(); //array
  const [castList, setCastList] = useState(); //array
  const [recommendedList, setRecommendedList] = useState(); //array
  const [similarList, setSimilarList] = useState(); //array
  const [trailerKey, setTrailerKey] = useState(); //string

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
      setMovieObject(movieJson);
      setCastList(castJson.cast);
      setRecommendedList(recommendedJson.results);
      setSimilarList(similarJson.results);
      setVideoKeys(videoJson.results);
      //Scroll to top everytime component mounts:
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    })();
  }, [movieId]);

  useEffect(() => {
    //Find trailer key. If not found, find any video key
    if (videoKeys) {
      // console.log('videoKeys', videoKeys);
      let trailerKey = videoKeys.find((key) => {
        return key.type === 'Trailer';
      });
      if (trailerKey) {
        setTrailerKey(trailerKey.key);
      } else {
        if (videoKeys[0]) {
          setTrailerKey(videoKeys[0]);
        }
      }
    }
  }, [videoKeys]);

  useEffect(() => {
    if (movieObject) {
      let dbReviewsForThisMovie;
      (async () => {
        const docRef = doc(appContext.db, movieId, 'reviews');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dbReviewsForThisMovie = docSnap.data().coll;
          console.log(dbReviewsForThisMovie);
          /*
          If docSnap exists, dbReviewsForThisMovie will be an array of
          review objects like this: 
          {
            email: "freemovement@live.ca"
            stars: 10
            text: "I loved it!"
            title: "Sonic the Hedgehog 2"
            userId: "B8BesNXeFoM6Q317pWUFRTZ4YKx2"
            userName: "Jon Ro"
          }
          Find the one belonging to the user, and if it exists, set it
          to setUsersPriorReview
          */
          let priorReview = dbReviewsForThisMovie.find((obj) => {
            return obj.userId === appContext.user.uid;
          });
          setUsersPriorReview(priorReview);
          setReviews(dbReviewsForThisMovie);
        } else {
          setReviews([]);
          setUsersPriorReview();
        }
      })();
    }
  }, [movieObject, appContext.userReviews]);

  function getAverageScore(reviews, movieObject) {
    let mmdbPoints = 0;
    for (let i = 0; i < reviews.length; i++) {
      mmdbPoints += reviews[i].stars;
    }
    let tmdbPoints = movieObject.vote_average * movieObject.vote_count;
    return (
      (mmdbPoints + tmdbPoints) /
      (reviews.length + movieObject.vote_count)
    ).toFixed(1);
  }

  return (
    movieObject &&
    castList &&
    reviews && (
      <div id='MoviePage' className='page'>
        <div className='flexCenteredColumn sideBarContainer'>
          <h1>{movieObject.title}</h1>
          <div>
            <FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />
            {` ${getAverageScore(reviews, movieObject)} (${
              movieObject.vote_count + reviews.length
            })`}
          </div>
          <div className='movieInfoGrid'>
            <div>
              {movieObject.genres.map((genre) => (
                <div key={genre.name} style={{ fontSize: 'small' }}>
                  {genre.name}
                </div>
              ))}
            </div>
            <div>
              <div>Released: </div>
              {movieObject.release_date}
            </div>
            {/* MovieRater */}
            <MovieRater
              movieObject={movieObject}
              usersPriorReview={usersPriorReview}
            />
            {/* MovieAdder */}
            <MovieAdder movieObject={movieObject} />
          </div>
          <div style={{ width: '100%' }}>
            <div className='visualsContainer'>
              <Link to={`/poster${movieObject.poster_path}`}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movieObject.poster_path}`}
                  alt={movieObject.title}
                  height='400'
                  className='moviePagePoster'
                ></img>
              </Link>
              {trailerKey ? (
                <iframe
                  width='773'
                  height='400'
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  title='Embedded youtube'
                />
              ) : (
                <div
                  className='trailerSubstitute'
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObject.backdrop_path})`,
                  }}
                >
                  <h3 style={{ backgroundColor: '#343434' }}>
                    Trailer not available
                  </h3>
                </div>
              )}
            </div>
            <div className='overview'>{movieObject.overview}</div>
          </div>
        </div>
        <h1>Top 10 Cast</h1>
        {castList && (
          <ActorCarousel id='MovieCarousel' actorList={castList.slice(0, 10)} />
        )}

        {/* Reviews: extract this to a component */}
        <h1>MMDB User Reviews</h1>
        <MovieReviews reviews={reviews} />

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
