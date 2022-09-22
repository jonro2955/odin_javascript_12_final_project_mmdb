import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDoc, doc } from "firebase/firestore";
import { AppContext } from "../contexts/AppContext";
import {
  db,
  getCollectionDoc,
  setCollectionDoc,
} from "/home/pc/Documents/TOP/github_projects/odin_javascript_12_mmdb/src/Db.js";
import MovieCarousel from "../components/MovieCarousel";
import ActorCarousel from "../components/ActorCarousel";
import MovieAdder from "../components/MovieAdder";
import MovieRater from "../components/MovieRater";
import MovieReviews from "../components/MovieReviews";
import logo512 from "../images/logo512.png";
import Footer from "../components/Footer";

export default function MoviePage() {
  let movieId = useParams().movieId;
  const appContext = useContext(AppContext);
  const [reviews, setReviews] = useState([]);
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
      console.log("movie:", movieJson);
      console.log("cast:", castJson.cast);
      console.log("recommended:", recommendedJson.results);
      console.log("similar:", similarJson.results);
      console.log("videos:", videoJson.results);
      setMovieObject(movieJson);
      setCastList(castJson.cast);
      setRecommendedList(recommendedJson.results);
      setSimilarList(similarJson.results);
      setVideoKeys(videoJson.results);
      //Scroll everything to top and left everytime component mounts:
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      document.querySelectorAll(".carousel").forEach((div) => {
        div.scrollTo(0, 0);
      });
      document.querySelectorAll(".actorCarousel").forEach((div) => {
        div.scrollTo(0, 0);
      });
    })();
  }, [movieId]);

  useEffect(() => {
    //Find a trailer key and set the state
    if (videoKeys) {
      let trailerKey = videoKeys.find((key) => {
        return key.type === "Trailer";
      });
      if (trailerKey) {
        setTrailerKey(trailerKey.key);
      } else {
        if (videoKeys[0]) {
          setTrailerKey(videoKeys[0]);
        } else {
          setTrailerKey("");
        }
      }
    }
  }, [videoKeys]);

  useEffect(() => {
    if (movieObject) {
      /* get movie reviews from db to pass to <MovieRater> */
      (async function getReviews() {
        const docRef = doc(db, movieId, "reviews");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReviews(docSnap.data().reviews);
        } else {
          setReviews([]);
        }
      })();
      // If logged in user visits a new movie, update their genre list
      if (appContext.user) {
        updateUserGenres(movieObject.genres);
      }
    }
  }, [movieObject, appContext.userReviewsState]);

  function getAverageScore(reviews, movieObject) {
    let mmdbPoints = 0;
    for (let i = 0; i < reviews.length; i++) {
      mmdbPoints += reviews[i].stars;
    }
    let tmdbPoints = movieObject.vote_average * movieObject.vote_count;
    return ((mmdbPoints + tmdbPoints) / (reviews.length + movieObject.vote_count)).toFixed(1);
  }

  async function updateUserGenres(genreInputArray) {
    const docSnap = await getCollectionDoc(appContext.user.uid, "4genres");
    let genres = {};
    if (docSnap.exists()) {
      let existingGenres = docSnap.data()["genres"];
      genreInputArray.forEach((genre) => {
        let newGenre = true;
        existingGenres.forEach((existingGenre) => {
          if (existingGenre.id === genre.id) {
            newGenre = false;
            existingGenre.occurance++;
          }
        });
        if (newGenre) {
          existingGenres.push({ ...genre, occurance: 1 });
        }
      });
      genres = existingGenres;
    } else {
      genreInputArray.forEach((genre) => {
        genre.occurance = 1;
      });
      genres = genreInputArray;
    }
    setCollectionDoc(appContext.user.uid, "4genres", { genres });
  }

  return (
    movieObject &&
    castList &&
    reviews && (
      <div id="MoviePage" className="page">
        <div className="flexCenteredColumn sideBarContainer">
          <h1>{movieObject.title}</h1>
          <div>
            <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
            {` ${getAverageScore(reviews, movieObject)} (${
              movieObject.vote_count + reviews.length
            })`}
          </div>
          <div className="movieInfoGrid">
            <div>
              {movieObject.genres.map((genre) => {
                return (
                  <div key={genre.name} style={{ fontSize: "small" }}>
                    {genre.name}
                  </div>
                );
              })}
            </div>
            <div>
              <div>Released: </div>
              {movieObject.release_date}
            </div>
            {/* MovieRater */}
            <MovieRater movieObject={movieObject} reviews={reviews} />
            {/* MovieAdder */}
            <MovieAdder movieObject={movieObject} />
          </div>
          <div style={{ width: "100%" }}>
            <div className="visualsContainer">
              <Link
                target="_blank"
                to={movieObject.poster_path ? `/poster${movieObject.poster_path}` : `/poster/null`}
              >
                <img
                  src={
                    movieObject.poster_path
                      ? `https://image.tmdb.org/t/p/original${movieObject.poster_path}`
                      : logo512
                  }
                  alt={movieObject.title}
                  height="400"
                  className="moviePagePoster"
                />
              </Link>
              {trailerKey ? (
                <iframe
                  width="773"
                  height="400"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              ) : (
                <div
                  className="trailerSubstitute"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObject.backdrop_path})`,
                  }}
                >
                  <h3 style={{ backgroundColor: "#343434" }}>Trailer not available</h3>
                </div>
              )}
            </div>
            <div className="overview">{movieObject.overview}</div>
          </div>
        </div>
        <h1>Top 10 Cast</h1>
        {castList && <ActorCarousel id="MovieCarousel" actorList={castList.slice(0, 10)} />}

        {/* Reviews: extract this to a component */}
        <h1>MMDB User Reviews</h1>
        <MovieReviews reviews={reviews} />

        {recommendedList.length > 0 && (
          <>
            <h1>Recommended</h1>
            <MovieCarousel movieList={recommendedList} id="recommendedList" />
          </>
        )}
        {similarList.length > 0 && (
          <>
            <h1>Similar</h1>
            <MovieCarousel movieList={similarList} id="similarList" />
          </>
        )}
        <Footer />
      </div>
    )
  );
}
