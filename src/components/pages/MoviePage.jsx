import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Carousel from '../Carousel';
import avatar from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_12_final/odin_javascript_12_mmdb/src/images/user.png';

export default function MoviePage() {
  let movieId = useParams().movieId;
  const [details, setDetails] = useState();
  const [cast, setCast] = useState();
  const [recommendedList, setRecommendedList] = useState();
  const [similarList, setSimilarList] = useState();
  const [trailerKey, setTrailerKey] = useState();
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
      // console.log(videoPacket);
    })();
  }, [movieId]);

  useEffect(() => {
    if (videoKeys) {
      // console.log('Number of Video Keys:', Object.keys(videoKeys).length);
      let trailerKey = videoKeys.find((key) => {
        return key.type === 'Trailer';
      });
      setTrailerKey(trailerKey.key);
    }
  }, [videoKeys]);

  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

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
          <h1>{details.title}</h1>
          {details.tagline && <h3>"{details.tagline}"</h3>}
          <div style={{ marginBottom: '10px' }}>
            Release Date: {details.release_date}
          </div>
          <div style={{ width: '100%' }}>
            <div className='visualsContainer'>
              <img
                src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                alt={details.title + 'poster'}
                height='400'
                className='moviePagePoster'
              ></img>
              <iframe
                width='773'
                height='400'
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='Embedded youtube'
              />
            </div>
            <div className='overview'>{details.overview}</div>
            <div>
              <h3>Top Cast</h3>
              <div className='castRow'>
                {cast.slice(0, 10).map((actor, i) => {
                  return (
                    <Link key={i} to={`/actor/${actor.id}`}>
                      <div key={i}>
                        <img
                          width='100'
                          height='150'
                          alt={actor.name}
                          src={
                            actor.profile_path
                              ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                              : avatar
                          }
                        ></img>
                        <div>{actor.name}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
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
    )
  );
}

let videoResults = {
  id: 675353,
  results: [
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Knuckle Down Featurette',
      key: '9djAMds545g',
      site: 'YouTube',
      size: 1080,
      type: 'Featurette',
      official: true,
      published_at: '2022-04-06T13:03:17.000Z',
      id: '625f56d80792e10177d1f049',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Put A Ring On It Clip',
      key: 'RHSU0SJv33A',
      site: 'YouTube',
      size: 1080,
      type: 'Clip',
      official: true,
      published_at: '2022-04-04T15:00:44.000Z',
      id: '625f56c9d4cc8e0051a2ea47',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Kid Cudi',
      key: 'YkZ1aAPApAc',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2022-04-03T16:00:58.000Z',
      id: '624abb4d84591c0064898ed3',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'No Spoilers',
      key: 'UXWwYfvJ7BA',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2022-03-29T16:00:58.000Z',
      id: '625f56b7a5046e00a473d13c',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Bigger, Bluer, Better',
      key: 'Xr-VlbaJvcA',
      site: 'YouTube',
      size: 1080,
      type: 'Featurette',
      official: true,
      published_at: '2022-03-28T13:03:21.000Z',
      id: '625f52e7db952d004f89d2a6',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Meet Knuckles Clip',
      key: 'LF64NG_NJQw',
      site: 'YouTube',
      size: 1080,
      type: 'Clip',
      official: true,
      published_at: '2022-03-28T13:03:01.000Z',
      id: '625f52b8e61e6d0050f7f638',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: '"I Make This Look Good" Clip',
      key: 'qdJfgKGgHP4',
      site: 'YouTube',
      size: 1080,
      type: 'Clip',
      official: true,
      published_at: '2022-03-25T13:00:36.000Z',
      id: '62413ad9706e5600481793ca',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Final Trailer',
      key: '47r8FXYZWNU',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
      official: true,
      published_at: '2022-03-14T13:02:25.000Z',
      id: '622f6e2e9c24fc0044921909',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Madness',
      key: 'F5uv5XiNHAs',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2022-03-13T19:00:19.000Z',
      id: '6269b877c613ce006684544b',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Fastest Trailer',
      key: 'HCzqO6SPgnk',
      site: 'YouTube',
      size: 1080,
      type: 'Featurette',
      official: true,
      published_at: '2022-03-13T16:00:32.000Z',
      id: '622f6e5098f1f1007808f169',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: '"Blue Justice"',
      key: 'sEOrfwBCxYI',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2022-03-02T14:08:12.000Z',
      id: '62384a38db4ed6001b06107f',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Choose Your Team',
      key: '7NVMZWV_vTg',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2022-02-13T17:01:52.000Z',
      id: '62094453cb8028009c0204c0',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Big Game Spot',
      key: 'uVj6vs-738o',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2022-02-11T14:07:53.000Z',
      id: '62068d96f48b340097c51eb0',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Rings',
      key: '9-PbLuusH44',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2022-02-10T17:01:06.000Z',
      id: '62068e0fefd3c2001cde1b88',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: '"The Real Competition Begins"',
      key: 'vxdzRz6gUD4',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2022-02-07T17:22:36.000Z',
      id: '623849dc9ee0ef0046da27bb',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: '"Red Quill or Blue Quill"',
      key: 'S8qRuGm2E_I',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2021-12-22T19:56:51.000Z',
      id: '61d223311684f7001ca74c6c',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Official Trailer',
      key: 'G5kzUpWAusI',
      site: 'YouTube',
      size: 1080,
      type: 'Trailer',
      official: true,
      published_at: '2021-12-10T01:41:15.000Z',
      id: '61b2b31b38e510008aee0361',
    },
    {
      iso_639_1: 'en',
      iso_3166_1: 'US',
      name: 'Title Announcement',
      key: 'sQuoffM1y-w',
      site: 'YouTube',
      size: 1080,
      type: 'Teaser',
      official: true,
      published_at: '2021-02-10T15:00:33.000Z',
      id: '602416bcc2b9df003ea481d4',
    },
  ],
};

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
