import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Carousel from '../Carousel';

export default function MoviePage() {
  let movieId = useParams().movieId;
  const [details, setDetails] = useState();
  const [cast, setCast] = useState();
  const [recommendedList, setRecommendedList] = useState();
  const [similarList, setSimilarList] = useState();
  const [videoKeys, setVideoKeys] = useState();

  useEffect(() => {
    (async () => {
      const detailsPacket = await fetch(
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
      const detailsJson = await detailsPacket.json();
      const castJson = await castPacket.json();
      const recommendedJson = await recommendedPacket.json();
      const similarJson = await similarPacket.json();
      const videoJson = await videoPacket.json();
      setDetails(detailsJson);
      setCast(castJson.cast);
      setRecommendedList(recommendedJson.results);
      setSimilarList(similarJson.results);
      setVideoKeys(videoJson.results);
      // console.log(videoJson);
    })();
  }, [movieId]);

  return (
    details &&
    cast && (
      <div
        id='MoviePage'
        className='page'
        style={{
          // backgroundImage: `url('https://image.tmdb.org/t/p/original${details.backdrop_path}')`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className='flexCenteredColumn movieContainer70W'>
          <h1 className=''>{details.title}</h1>
          <div>Release Date: {details.release_date}</div>
          <div style={{ width: '100%' }}>
            <img
              src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
              alt={details.title + 'poster'}
              width='20%'
              className='moviePagePoster'
            ></img>
            <iframe
              width='753'
              height='380'
              src={`https://www.youtube.com/embed/${videoKeys[0].key}`}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='Embedded youtube'
            />
            <div>Tagline: {details.tagline}</div>
            <div>Overview: {details.overview}</div>
            <div>
              <h3>Stars</h3>
              <div>{cast[0].name}</div>
              <div>{cast[1].name}</div>
              <div>{cast[2].name}</div>
            </div>
            {recommendedList.length > 0 && (
              <>
                <h1>Recommended</h1>
                <Carousel list={recommendedList} id='recommendedList' />
              </>
            )}
            {similarList.length > 0 && (
              <>
                <h1>Similar Movies</h1>
                <Carousel list={similarList} id='similarList' />
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

let movieDetailsExample = {
  adult: false,
  backdrop_path: '/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
  belongs_to_collection: {
    id: 720879,
    name: 'Sonic the Hedgehog Collection',
    poster_path: '/rEC1pkQ1UbX7USRkVIrt2Nk7hlC.jpg',
    backdrop_path: '/8jfHKno4tRZ621Uzw4heEaJPgRM.jpg',
  },
  budget: 110000000,
  genres: [
    { id: 28, name: 'Action' },
    { id: 878, name: 'Science Fiction' },
    { id: 35, name: 'Comedy' },
    { id: 10751, name: 'Family' },
    { id: 12, name: 'Adventure' },
  ],
  homepage: 'https://www.sonicthehedgehogmovie.com',
  id: 675353,
  imdb_id: 'tt12412888',
  original_language: 'en',
  original_title: 'Sonic the Hedgehog 2',
  overview:
    'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
  popularity: 6201.709,
  poster_path: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
  production_companies: [
    {
      id: 113750,
      logo_path: '/A3QVZ9Ah0yI2d2GiXUFpdlbTgyr.png',
      name: 'SEGA',
      origin_country: 'JP',
    },
    {
      id: 333,
      logo_path: '/5xUJfzPZ8jWJUDzYtIeuPO4qPIa.png',
      name: 'Original Film',
      origin_country: 'US',
    },
    {
      id: 10644,
      logo_path: '/ocLZIdYJBppuCt1rhYEb2jbpt5F.png',
      name: 'Blur Studios',
      origin_country: 'US',
    },
    {
      id: 77884,
      logo_path: '/dP2lxVNctD5Cried0IWVqgrO2o9.png',
      name: 'Marza Animation Planet',
      origin_country: 'JP',
    },
    {
      id: 4,
      logo_path: '/gz66EfNoYPqHTYI4q9UEN4CbHRc.png',
      name: 'Paramount',
      origin_country: 'US',
    },
  ],
  production_countries: [
    { iso_3166_1: 'JP', name: 'Japan' },
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
  release_date: '2022-03-30',
  revenue: 355200000,
  runtime: 122,
  spoken_languages: [
    { english_name: 'English', iso_639_1: 'en', name: 'English' },
    { english_name: 'Russian', iso_639_1: 'ru', name: 'Pусский' },
  ],
  status: 'Released',
  tagline: 'Welcome to the next level.',
  title: 'Sonic the Hedgehog 2',
  video: false,
  vote_average: 7.8,
  vote_count: 1522,
};

let castListExample = [
  {
    adult: false,
    cast_id: 1,
    character: 'Loretta Sage / Angela',
    credit_id: '5f847ef725b9550036290f5f',
    gender: 1,
    id: 18277,
    known_for_department: 'Acting',
    name: 'Sandra Bullock',
    order: 0,
    original_name: 'Sandra Bullock',
    popularity: 34.677,
    profile_path: '/u2tnZ0L2dwrzFKevVANYT5Pb1nE.jpg',
  },
  {
    adult: false,
    cast_id: 9,
    character: 'Alan / Dash',
    credit_id: '5fea496ea14e10003e1791d3',
    gender: 2,
    id: 38673,
    known_for_department: 'Acting',
    name: 'Channing Tatum',
    order: 1,
    original_name: 'Channing Tatum',
    popularity: 34.71,
    profile_path: '/bhTmp6FA8fOQnGlNk75tdmj2bpu.jpg',
  },
];
