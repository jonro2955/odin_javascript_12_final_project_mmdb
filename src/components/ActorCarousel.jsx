import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActorCard from './ActorCard';

function scrollLeft(id) {
  document.getElementById(id).scrollLeft -= 1300;
}

function scrollRight(id) {
  document.getElementById(id).scrollLeft += 1300;
}

/*The id parameter is used to match the scrollLeft() and scrollRight()
callbacks to this particular Carousel*/
export default function ActorCarousel({ id, actorList }) {
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
        {actorList.map((actor) => (
          <ActorCard key={actor.id} actor={actor} />
        ))}
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
