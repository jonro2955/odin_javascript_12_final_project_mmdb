import React, { useContext, useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { AppContext } from "../contexts/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

/*The first 2 parameters (props.id, props.movieList) are mandatory
and must be provided by the calling parent. 
The id parameter is used to match the scrollLeft() and scrollRight()
callbacks to this particular Carousel. The movieList prop must 
be in the form of an array of TMDB movie objects.
listName and deletable props are optional. They are passed down to 
<MovieCard/> to enable the optional 'delete from list' option.*/
export default function MovieCarousel({ id, movieList, listName, deletable }) {
  const appContext = useContext(AppContext);
  const [watchListIDArray, setWatchListIDArray] = useState();

  useEffect(() => {
    if (appContext.userLists) {
      setWatchListIDArray(appContext.watchListIDArray());
    }
  }, [appContext]);

  function scrollLeft(id) {
    document.getElementById(id).scrollLeft -= 1000;
  }

  function scrollRight(id) {
    document.getElementById(id).scrollLeft += 1000;
  }

  return (
    <div className="flexCenteredRow">
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={() => {
          scrollLeft(id);
        }}
        className="carouselScrollArrow"
      />
      <div id={id} className="carousel">
        {movieList.length > 0 ? (
          movieList.map((movie, i) => (
            <MovieCard
              watchListAdded={watchListIDArray ? watchListIDArray.includes(movie.id) : false}
              key={i}
              movie={movie}
              listName={listName}
              deletable={deletable}
            />
          ))
        ) : (
          <h2
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            This list is empty
          </h2>
        )}
      </div>
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={() => {
          scrollRight(id);
        }}
        className="carouselScrollArrow"
      />
    </div>
  );
}
