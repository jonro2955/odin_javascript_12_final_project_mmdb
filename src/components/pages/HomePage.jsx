import {
  faStar,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

async function getCast(movieId) {
  const packet = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US`
  );
  const json = await packet.json();
  const array = json.cast;
  console.log([array[0].name, array[1].name]);
  return [array[0].name, array[1].name];
}

function scrollRight(id) {
  document.getElementById(id).scrollLeft += 1300;
}
function scrollLeft(id) {
  document.getElementById(id).scrollLeft -= 1300;
}

export default function HomePage({
  mostPopularList,
  comingSoonList,
  nowPlayingList,
  topRatedList,
}) {
  return (
    <div id='HomePage' className='page'>
      <h1 className='homeListTitle'>Most Popular</h1>
      <div id='popularCarousel' className='carousel'>
        {mostPopularList.map((movie, i) => (
          <div className='card' key={movie.id}>
            <img
              className='posterImg'
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              width='200'
              height='300'
            ></img>
            <div>{movie.title}</div>
            <div>Release Date: {movie.release_date}</div>
            <div>
              <FontAwesomeIcon icon={faStar} />
              {movie.vote_average}
            </div>
            <div>{i}</div>
          </div>
        ))}
      </div>
      <div class='centeredRow'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => {
            scrollLeft('popularCarousel');
          }}
          className='scrollArrow'
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => {
            scrollRight('popularCarousel');
          }}
          className='scrollArrow'
        />
      </div>

      <h1 className='homeListTitle'>Coming Soon</h1>
      <div id='comingCarousel' className='carousel'>
        {comingSoonList.map((movie) => (
          <div className='card' key={movie.id}>
            {movie.title}
          </div>
        ))}
      </div>
      <div class='centeredRow'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => {
            scrollLeft('comingCarousel');
          }}
          className='scrollArrow'
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => {
            scrollRight('comingCarousel');
          }}
          className='scrollArrow'
        />
      </div>

      <h1 className='homeListTitle'>Now Playing</h1>
      <div id='nowCarousel' className='carousel'>
        {nowPlayingList.map((movie) => (
          <div className='card' key={movie.id}>
            {movie.title}
          </div>
        ))}
      </div>
      <div class='centeredRow'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => {
            scrollLeft('nowCarousel');
          }}
          className='scrollArrow'
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => {
            scrollRight('nowCarousel');
          }}
          className='scrollArrow'
        />
      </div>

      <h1 className='homeListTitle'>Top Rated</h1>
      <div id='topCarousel' className='carousel'>
        {topRatedList.map((movie) => (
          <div className='card' key={movie.id}>
            {movie.title}
          </div>
        ))}
      </div>
      <div class='centeredRow'>
        <FontAwesomeIcon
          icon={faAngleLeft}
          onClick={() => {
            scrollLeft('topCarousel');
          }}
          className='scrollArrow'
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          onClick={() => {
            scrollRight('topCarousel');
          }}
          className='scrollArrow'
        />
      </div>
    </div>
  );
}
