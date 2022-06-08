import { AppContext } from './contexts/AppContext';
import { useContext, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MovieRater({ movieObject }) {
  const appContext = useContext(AppContext);
  const [raterOn, setRaterOn] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const [starRating, setStarRating] = useState(0);
  const [hover, setHover] = useState(0);

  /*Detect if clicked on outside of element*/
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setRaterOn(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  function closeRater() {
    document.querySelector('.reviewTextArea').value = '';
    setStarRating(0);
    setHover(0);
    setRaterOn(false);
  }

  function submitReview(e) {
    e.preventDefault();
    let reviewText = document.querySelector('.reviewTextArea').value;
    let reviewObj = {
      movieId: movieObject.id,
      stars: starRating,
      text: reviewText,
    };
    appContext.submitMovieReview(reviewObj);
    closeRater();
  }

  return (
    <div ref={wrapperRef}>
      <button
        disabled={appContext.user ? false : true}
        className='moviePageAddBtn'
        onClick={() => {
          setRaterOn(!raterOn);
        }}
      >
        <div>
          Rate
          <div>
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </button>

      {raterOn && (
        <div className='popupAdder'>
          <form className='reviewForm' onSubmit={submitReview}>
            <div>{`Choose a star rating: ${starRating}`}</div>
            {/*  https://w3collective.com/react-star-rating-component/ */}
            <div className='starRating'>
              {[...Array(10)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type='button'
                    key={index}
                    className={`starButton ${
                      index <= (hover || starRating) ? 'starOn' : 'starOff'
                    }`}
                    onMouseEnter={() => {
                      setHover(index);
                      setStarRating(index);
                    }}
                    onMouseLeave={() => setHover(starRating)}
                  >
                    <span className='star'>&#9733;</span>
                  </button>
                );
              })}
            </div>
            <textarea
              className='reviewTextArea'
              type='text'
              placeholder='Write a review'
            ></textarea>
            <div>
              <button className='submitReviewBtn' type='submit'>
                Submit
              </button>
            </div>
          </form>
          <button
            className='closeBtn'
            style={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={() => {
              closeRater();
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
