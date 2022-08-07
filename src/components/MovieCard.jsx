import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { AppContext } from "./contexts/AppContext";

export default function MovieCard({ movie, deletable, listName, watchListAdded }) {
  const appContext = useContext(AppContext);

  // Secrets of Dumbledore
  function shortenedTitle(title) {
    let arr = title.split("");
    if (arr.length > 22) {
      arr = arr.slice(0, 20).concat([".", ".", "."]);
    }
    return arr.join("");
  }

  return (
    <div className="card">
      <Link to={`/movie/${movie.id}`} className="cardLink">
        <img
          className="posterImg"
          alt={movie.title}
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          width="200"
          height="300"
          loading="lazy"
        ></img>
        <div className="cardDetail">
          <div className="movieCardTitle">{shortenedTitle(movie.title)}</div>
          <div style={{ fontSize: "smaller" }}>{movie.release_date}</div>
          <div>
            <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
            {` ${movie.vote_average.toFixed(1)} (${movie.vote_count}) `}
          </div>
        </div>
      </Link>
      {deletable ? (
        // `Remove` Button
        <button
          onClick={() => {
            appContext.removeFromList(movie, listName);
          }}
        >
          Remove
        </button>
      ) : // `Watchlist+` Button
      appContext.user ? (
        <button
          // `disabled` attribute
          disabled={appContext.user ? watchListAdded : false}
          onClick={() => {
            if (appContext.user) {
              appContext.addToList(movie, "Watch List");
            } else {
              alert("You must be logged in to add movies.");
            }
          }}
        >
          Watchlist+
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
