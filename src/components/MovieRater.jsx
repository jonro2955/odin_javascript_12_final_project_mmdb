import { AppContext } from './contexts/AppContext';
import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function MovieRater({ movieObject }) {
  const appContext = useContext(AppContext);
  const [adderOn, setAdderOn] = useState(false);
  const [RequestToken, setRequestToken] = useState();

  function toggleMenu() {
    setAdderOn(!adderOn);
  }

  return (
    <div>
      <button
        className='moviePageAddBtn'
        onClick={() => {
          if (appContext.user) {
            toggleMenu();
          } else {
            alert('You must be logged in to add movies.');
          }
        }}
      >
        <div>Rate</div>
        <FontAwesomeIcon className='addIcon' icon={faStar} />
      </button>
      {adderOn && (
        <div className='popupListMenu'>
          <h3>This feature is coming soon</h3>
          <div>
            It will allow you to enter a rating from 1 to 10 for this
            movie into the global database at https://www.themoviedb.org/.
          </div>
          <button
            style={{ position: 'absolute', top: '5px', right: '5px' }}
            onClick={() => {
              toggleMenu();
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
