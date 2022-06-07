import { AppContext } from './contexts/AppContext';
import { useContext, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MovieRater({ movieObject }) {
  const appContext = useContext(AppContext);
  const [adderOn, setAdderOn] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  /*Detect if clicked on outside of element*/
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setAdderOn(false);
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

  return (
    <div ref={wrapperRef}>
      <button
        className='moviePageAddBtn'
        onClick={() => {
          setAdderOn(!adderOn);
        }}
      >
        <div>
          Rate
          <div>
            <FontAwesomeIcon icon={faStar} />
          </div>
        </div>
      </button>
      {adderOn && (
        <div className='popupAdder'>
          <form className='reviewForm'>
            <ul class='list-inline rating-list'>
              <li>
                <i class='fa fa-star' title='Rate 10'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 9'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 8'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 7'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 6'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 5'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 4'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 3'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 2'></i>
              </li>
              <li>
                <i class='fa fa-star' title='Rate 1'></i>
              </li>
            </ul>
            <input
              className='reviewInput'
              type='text'
              placeholder='Write a review'
            ></input>
          </form>
          <button
            className='closeBtn'
            style={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={() => {
              setAdderOn(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
