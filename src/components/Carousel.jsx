import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Card';

function scrollRight(id) {
  document.getElementById(id).scrollLeft += 1300;
}
function scrollLeft(id) {
  document.getElementById(id).scrollLeft -= 1300;
}

export default function Carousel({ id, list }) {
  return (
    <div className='flexCenteredColumn'>
      <div id={id} className='carousel'>
        {list.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
      <div className='arrowRow'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => {
            scrollLeft(id);
          }}
          className='scrollArrow'
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => {
            scrollRight(id);
          }}
          className='scrollArrow'
        />
      </div>
    </div>
  );
}
