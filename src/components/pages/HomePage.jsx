export default function HomePage({
  mostPopularList,
  comingSoonList,
  nowPlayingList,
  topRatedList,
}) {
  return (
    <>
      <h3>Most Popular</h3>
      {/* carousel start*/}
      <div className=''>
        {mostPopularList.map((movie) => (
          <div
            className=''
            key={movie.id}
          >
            {movie.title}
          </div>
        ))}
      </div>
      {/* carousel end */}
    </>
  );
}
