import { useContext, useEffect, useState } from 'react';
import { AppContext } from './contexts/AppContext';
import { getDoc, doc } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/* The Adder component renders the add button and the popup menu of the 
available list names. 
The movieObject prop must be a TMDB API movie details object containing things 
like a movie's title, id, release_date, etc.*/
export default function Adder({ movieObject }) {
  const appContext = useContext(AppContext);
  const [menuOn, setMenuOn] = useState(false);
  const [listNamesArray, setListNamesArray] = useState();
  const [inactiveNamesArray, setInactiveNamesArray] = useState([]);

  /*The listNamesArray state will hold an array of the user's list name
  strings. Whenever this component mounts or someone logs in and changes 
  appContext, fetch the user doc and update the listNamesArray*/
  useEffect(() => {
    if (appContext.user) {
      (async () => {
        const uid = appContext.user.uid;
        const docRef = doc(appContext.db, 'User Lists', uid);
        const docSnap = await getDoc(docRef);
        /*Sort by timestamps. It is the second array's first item*/
        const arrayConversion = Object.entries(docSnap.data());
        arrayConversion.sort((a, b) => a[1][0] - b[1][0]);
        let returnArray = [];
        let inactives = [];
        arrayConversion.forEach((item) => {
          returnArray.push(item[0]);
          /* 'inactives' is an array of listNames that have this movieObject already*/
          let alreadyContains = item[1].slice(1).find((obj) => {
            return obj.id === movieObject.id;
          });
          if (alreadyContains) {
            inactives.push(item[0]);
          }
        });
        setInactiveNamesArray(inactives);
        setListNamesArray(returnArray);
      })();
    }
  }, [appContext, movieObject]);

  function toggleMenu() {
    setMenuOn(!menuOn);
  }

  return (
    <div>
      <button
        className='mainAddBtn'
        onClick={() => {
          if (appContext.user) {
            toggleMenu();
          } else {
            alert('You must be logged in to add movies.');
          }
        }}
      >
        <div>Add to list</div>
        <FontAwesomeIcon className='addIcon' icon={faPlus} />
      </button>
      {listNamesArray && menuOn && (
        <div className='popupListMenu'>
          <h3>Choose a list</h3>
          {listNamesArray.map((listName) => {
            let disabledStatus = inactiveNamesArray.includes(listName)
              ? true
              : false;
            return (
              <button
                className='popupListBtn'
                disabled={disabledStatus}
                key={listName}
                onClick={() => {
                  //add movie to list and make list inactive for this movie
                  appContext.addToList(movieObject, listName);
                  let inactivesCopy = inactiveNamesArray;
                  inactivesCopy.push(listName);
                  setInactiveNamesArray(inactivesCopy);
                  setMenuOn(false);
                }}
              >
                {listName}
              </button>
            );
          })}
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
