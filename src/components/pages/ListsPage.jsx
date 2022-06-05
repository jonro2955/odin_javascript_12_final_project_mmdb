import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import { collection, setDoc, getDoc, doc } from 'firebase/firestore';
import MovieCarousel from '../MovieCarousel';
import ListAdder from '../ListAdder';
import { ListsContext } from '../contexts/ListsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/** <ListsPage/> has many jobs to do.
 * The userLists state will be a user's lists doc object fetched from
 * firestore and converted to an array using Object.entries(Object).
 * Each array item is also an array corresponding
 * to a movie list. item[0] is the name of
 * the list, a string. item[1] is another array whose first item,
 * item[1][0], is the timestamp from when the list was created.
 * The rest of that array, itemL1[1].slice(1), are movie id numbers.
 *
 * Functions declared here are passed to children of this component
 * using the context api after being first saved into the listsContext
 * state.*/
export default function ListsPage() {
  const appContext = useContext(AppContext);
  const [creatorOn, setCreatorOn] = useState(false);
  const [listsContext, setListsContext] = useState();
  const [userLists, setUserLists] = useState();

  function toggleCreator() {
    setCreatorOn(!creatorOn);
  }

  function turnCreatorOff() {
    setCreatorOn(false);
  }

  async function createNewList(appContext, listName) {
    /*firebase will throw an error if you use setDoc with an empty string field*/
    if (!listName) {
      return;
    }
    const uid = appContext.user.uid;
    const docRef = doc(appContext.db, 'User Lists', uid);
    const docSnap = await getDoc(docRef);
    // First, create a temporary copy of the user's document object
    let tempDoc = docSnap.data();
    /* Prevent duplicate entries by checking if tempDoc[listName] exists. 
      setDoc() will overwrite items with the same name*/
    if (!tempDoc[listName]) {
      tempDoc[listName] = [Date.now()];
      const collectionRef = collection(appContext.db, 'User Lists');
      await setDoc(doc(collectionRef, uid), tempDoc);
      updateListsPage(appContext);
    }
  }

  async function deleteList(appContext, listName) {
    if (!listName) {
      return;
    }
    const uid = appContext.user.uid;
    const docRef = doc(appContext.db, 'User Lists', uid);
    const docSnap = await getDoc(docRef);
    // First, create a temporary copy of the user's document object
    let tempDoc = docSnap.data();
    //delete the property with the listName key
    delete tempDoc[listName];
    const collectionRef = collection(appContext.db, 'User Lists');
    await setDoc(doc(collectionRef, uid), tempDoc);
    updateListsPage(appContext);
  }

  async function removeFromList(appContext, movieObj, listName) {
    if (appContext.user) {
      const uid = appContext.user.uid;
      const docRef = doc(appContext.db, 'User Lists', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let tempObj = docSnap.data();
        let tempArr = tempObj[listName];
        // remove given movieObj from tempArr
        tempArr = tempArr.filter((item) => {
          return item.id !== movieObj.id;
        });
        tempObj[listName] = tempArr;
        const collectionRef = collection(appContext.db, 'User Lists');
        await setDoc(doc(collectionRef, uid), tempObj);
        updateListsPage(appContext);
      }
    } else {
      alert('Error: you are not logged in.');
    }
  }

  async function updateListsPage(appContext) {
    if (appContext.user) {
      const uid = appContext.user.uid;
      const docRef = doc(appContext.db, 'User Lists', uid);
      const docSnap = await getDoc(docRef);
      /*docSnap.data() returns a firestore doc json whose content is
      ordered randomly each time you access it*/
      if (docSnap.data()) {
        /*Sort by converting to an array and using the timestamps inside*/
        const arrayConversion = Object.entries(docSnap.data());
        arrayConversion.sort((a, b) => a[1][0] - b[1][0]);
        setUserLists(arrayConversion);
      }
    }
  }

  // Render the page and provide the context at mount or new login
  useEffect(() => {
    updateListsPage(appContext);
    setListsContext({
      toggleCreator,
      turnCreatorOff,
      createNewList,
      deleteList,
      removeFromList,
    });
  }, [appContext]);

  return (
    <ListsContext.Provider value={listsContext}>
      <div className='page'>
        {appContext.user ? (
          // signed in
          <>
            <button
              className='moviePageAddBtn'
              style={{ padding: '10px', fontSize: '1.5em' }}
              onClick={() => {
                setCreatorOn(!creatorOn);
              }}
            >
              <div>New List</div>
              <FontAwesomeIcon className='addIcon' icon={faPlus} />
            </button>

            {userLists &&
              userLists.map((list, i) => (
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
                        deleteList(appContext, list[0]);
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
                createNewList={createNewList}
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
