import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import MovieCarousel from '../MovieCarousel';
import ListAdder from '../ListAdder';
import { ListsContext } from '../contexts/ListsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/** <ListsPage/> has many jobs to do.
 * `userListsArr` will be set to Object.entries(appContext.userLists)
 * Each array `item` is an array corresponding
 * to a list. item[0] is the name of
 * the list, string. item[1] is another array whose first item,
 * item[1][0], is the timestamp from when the list was created.
 * The rest of the array, itemL1[1].slice(1), are movie id numbers.
 */
export default function ListsPage() {
  const appContext = useContext(AppContext);
  const [creatorOn, setCreatorOn] = useState(false);
  const [userListsArr, setUserListsArr] = useState();
  const [listsContext] = useState({
    toggleCreator,
    turnCreatorOff,
  });

  function toggleCreator() {
    setCreatorOn(!creatorOn);
  }

  function turnCreatorOff() {
    setCreatorOn(false);
  }

  useEffect(() => {
    if (appContext.userLists) {
      let arrayConversion = Object.entries(appContext.userLists);
      // sort by timestamps
      arrayConversion.sort((a, b) => a[1][0] - b[1][0]);
      setUserListsArr(arrayConversion);
    }
  }, [appContext]);

  return (
    <ListsContext.Provider value={listsContext}>
      <div className='page'>
        {appContext.user ? (
          // signed in
          <>
            <button
              className='addListBtn'
              onClick={() => {
                setCreatorOn(!creatorOn);
              }}
            >
              <div>New List</div>
              <FontAwesomeIcon className='addIcon' icon={faPlus} />
            </button>

            {userListsArr &&
              userListsArr.map((list, i) => (
                <div key={i}>
                  {/* list[0] is each lists' key string because the list object was
                converted from json to an array using Object.entries()*/}
                  <h1>
                    {list[0] === 'Watch List' ? `Your ${list[0]}` : list[0]}
                  </h1>
                  {/* Place a delete button for lists other than 'Watch List' */}
                  {list[0] !== 'Watch List' && (
                    <button
                      className='deleteListBtn'
                      onClick={() => {
                        appContext.deleteList(list[0]);
                      }}
                    >
                      Delete list
                    </button>
                  )}
                  {/* list[1] is an array whose first item is a timestamp, so
                we have to slice the first item out. Then we reverse the array 
                to show the latest adds first.*/}
                  <MovieCarousel
                    id={list[0]}
                    movieList={list[1].slice(1).reverse()}
                    listName={list[0]}
                    deletable={true}
                  />
                </div>
              ))}

            {creatorOn && (
              <ListAdder
                createNewList={appContext.createNewList}
                toggleCreator={toggleCreator}
                turnCreatorOff={turnCreatorOff}
              />
            )}
          </>
        ) : (
          // signed out
          <>
            <h1
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              You must be logged in to create and edit custom lists.
            </h1>
          </>
        )}
      </div>
    </ListsContext.Provider>
  );
}
