import React, { useContext, useEffect, useState, useRef } from 'react';
import { AppContext } from '../contexts/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/* The MovieAdder component renders the add button and a popup menu of the 
available list names when that add button is clicked. 
The movieObject prop must be a TMDB API movie details object containing things 
like a movie's title, id, release_date, etc.*/
export default function MovieAdder({ movieObject }) {
  const appContext = useContext(AppContext);
  const [adderOn, setAdderOn] = useState(false);
  const [inactiveNamesArray, setInactiveNamesArray] = useState([]);
  const [listNamesArray, setListNamesArray] = useState();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  /*Detect if clicked outside of element to close it*/
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          //close it
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

  /*Get user's list names from appContext*/
  useEffect(() => {
    if (appContext.userListsState) {
      const arrayConversion = Object.entries(appContext.userListsState);
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
    }
  }, [appContext]);

  function toggleMenu() {
    setAdderOn(!adderOn);
  }

  return (
    <div ref={wrapperRef}>
      <button
        disabled={appContext.user ? false : true}
        className='moviePageAddBtn'
        onClick={() => {
          toggleMenu();
        }}
      >
        <div>Add</div>
        <FontAwesomeIcon className='addIcon' icon={faPlus} />
      </button>

      {listNamesArray && adderOn && (
        <div className='popupAdder'>
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
                  setAdderOn(false);
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
