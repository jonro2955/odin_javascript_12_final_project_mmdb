import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MovieCard from './MovieCard';

function scrollLeft(id) {
  document.getElementById(id).scrollLeft -= 1300;
}

function scrollRight(id) {
  document.getElementById(id).scrollLeft += 1300;
}

/*The id parameter is used to match the scrollLeft() and scrollRight()
button callbacks to this particular Carousel. The movieList prop must 
be in the format of an array of TMDB movie details objects */
export default function MovieCarousel({ id, movieList }) {
  return (
    <div className='flexCenteredRow'>
      <FontAwesomeIcon
        icon={faAngleLeft}
        onClick={() => {
          scrollLeft(id);
        }}
        className='carouselScrollArrow'
      />
      <div id={id} className='carousel'>
        {movieList &&
          movieList.map((movie, i) => <MovieCard key={i} movie={movie} />)}
      </div>
      <FontAwesomeIcon
        icon={faAngleRight}
        onClick={() => {
          scrollRight(id);
        }}
        className='carouselScrollArrow'
      />
    </div>
  );
}
