import MovieCarousel from '../MovieCarousel';

export default function HomePage({
  mostPopularList,
  comingSoonList,
  nowPlayingList,
  topRatedList,
}) {
  
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  
  return (
    <div id='HomePage' className='page'>
      <h1>Most Popular</h1>
      <MovieCarousel movieList={mostPopularList} id='mostPopularList' />
      <h1>Coming Soon</h1>
      <MovieCarousel movieList={comingSoonList} id='comingSoonList' />
      <h1>Now Playing</h1>
      <MovieCarousel movieList={nowPlayingList} id='nowPlayingList' />
      <h1>Top Rated</h1>
      <MovieCarousel movieList={topRatedList} id='topRatedList' />
    </div>
  );
}
