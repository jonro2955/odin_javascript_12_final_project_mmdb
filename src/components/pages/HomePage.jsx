export default function HomePage({
  mostPopularList,
  comingSoonList,
  nowPlayingList,
  topRatedList,
}) {
  return (
    <div>
      <h3>Most Popular</h3>

      {/* carousel start*/}
      <div className='py-4 px-2 flex h-112 overflow-x-auto overflow-y-hidden'>
        {mostPopularList.map((movie) => (
          <div
            className=' mx-2 shadow-xl bg-secondary rounded-md border border-primary'
            key={movie.id}
          >
            {movie.title}
          </div>
        ))}
      </div>
      {/* carousel end */}

      {/* https://codepen.io/tag/carousel
      http://jsfiddle.net/vfmfmaxo/
      https://css-tricks.com/custom-scrollbars-in-webkit/
      https://css-tricks.com/how-to-make-an-unobtrusive-scroll-to-top-button/  
      */}
      <div className='outer-box'>
        <div className='inner-box inner-box-1'>
          <div>1</div>
          <div>2</div>
        </div>
        <div className='inner-box inner-box-2'>2</div>
        <div className='inner-box inner-box-3'>3</div>
        <div className='inner-box inner-box-4'>4</div>
        <div className='inner-box inner-box-4'>5</div>
        <div className='inner-box inner-box-4'>6</div>
        <div className='inner-box inner-box-4'>7</div>
        <div className='inner-box inner-box-4'>8</div>
        <div className='inner-box inner-box-4'>9</div>
        <div className='inner-box inner-box-4'>10</div>
        <div className='inner-box inner-box-4'>11</div>
      </div>

      {/* End */}
    </div>
  );
}
