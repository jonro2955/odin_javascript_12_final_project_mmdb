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
button callbacks to this particular Carousel*/
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

let mostPopular = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
      genre_ids: [28, 878, 35, 10751, 12],
      id: 675353,
      original_language: 'en',
      original_title: 'Sonic the Hedgehog 2',
      overview:
        'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
      popularity: 10050.323,
      poster_path: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
      release_date: '2022-03-30',
      title: 'Sonic the Hedgehog 2',
      video: false,
      vote_average: 7.7,
      vote_count: 1222,
    },
  ],
  total_pages: 33530,
  total_results: 670593,
};

let cast = {
  id: 675353,
  cast: [
    {
      adult: false,
      gender: 2,
      id: 222121,
      known_for_department: 'Acting',
      name: 'Ben Schwartz',
      original_name: 'Ben Schwartz',
      popularity: 16.204,
      profile_path: '/5vV52TSEIhe4ZZLWwv3i7nfv8we.jpg',
      cast_id: 1,
      character: 'Sonic the Hedgehog (voice)',
      credit_id: '5e4fc66735811d001952f273',
      order: 0,
    },
    {
      adult: false,
      gender: 2,
      id: 17605,
      known_for_department: 'Acting',
      name: 'Idris Elba',
      original_name: 'Idris Elba',
      popularity: 19.854,
      profile_path: '/be1bVF7qGX91a6c5WeRPs5pKXln.jpg',
      cast_id: 27,
      character: 'Knuckles the Echidna (voice)',
      credit_id: '6112d21db046050045900a8f',
      order: 1,
    },
  ],
};
