import MovieCard from './MovieCard';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/*The first 2 parameters (id, movieList) are mandatory. 
The id parameter is used to match the scrollLeft() and scrollRight()
button callbacks to this particular Carousel. The movieList prop must 
be in the form of an array of TMDB movie details objects.
listName and deletable props are optional. They are passed down to 
<MovieCard/> to enable the optional 'delete from list' option.*/
export default function MovieCarousel(props) {

  function scrollLeft(id) {
    document.getElementById(id).scrollLeft -= 1300;
  }

  function scrollRight(id) {
    document.getElementById(id).scrollLeft += 1300;
  }

  return (
    <div className='flexCenteredRow'>
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={() => {
          scrollLeft(props.id);
        }}
        className='carouselScrollArrow'
      />
      <div id={props.id} className='carousel'>
        {props.movieList &&
          props.movieList.map((movie, i) => (
            <MovieCard
              key={i}
              movie={movie}
              listName={props.listName}
              deletable={props.deletable}
            />
          ))}
      </div>
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={() => {
          scrollRight(props.id);
        }}
        className='carouselScrollArrow'
      />
    </div>
  );
}
