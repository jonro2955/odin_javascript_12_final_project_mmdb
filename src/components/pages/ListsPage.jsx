import { useState, useContext, useEffect } from 'react';
import { MyContext } from '../MyContext';
import { collection, setDoc, getDoc, doc } from 'firebase/firestore';
import MovieCarousel from '../MovieCarousel';

export default function ListsPage() {
  const contextProps = useContext(MyContext);
  const [creatorOn, setCreatorOn] = useState(false);
  const [userLists, setUserLists] = useState();

  /* I could have declared this function in App.js and passed it here using 
  useContext, but since it will only be used in this page, it is declared here. */
  async function createNewList(props, listName) {
    /*firebase will throw error if you use setDoc with a doc 
    with a field having an empty string*/
    if (!listName) {
      return;
    }
    const uid = props.user.uid;
    const docRef = doc(props.db, 'User Lists', uid);
    const docSnap = await getDoc(docRef);
    // First, create a temporary copy of the user's document
    let tempDoc = docSnap.data();
    // console.log(tempDoc);
    /* Prevent duplicate entries by checking if tempDoc[listName] exists. 
      setDoc() will overwrite items with the same name*/
    if (tempDoc[listName]) {
      alert(
        `Save unsuccessful. List '${listName}' already
          exists. Cannot create duplicate lists.`
      );
    } else {
      tempDoc[listName] = [Date.now()];
      const collectionRef = collection(props.db, 'User Lists');
      await setDoc(doc(collectionRef, uid), tempDoc);
      updateUserLists(contextProps);
    }
  }

  async function deleteList(props, listName) {
    if (!listName) {
      return;
    }
    const uid = props.user.uid;
    const docRef = doc(props.db, 'User Lists', uid);
    const docSnap = await getDoc(docRef);
    // First, create a temporary copy of the user's document
    let tempDoc = docSnap.data();
    delete tempDoc[listName];
    console.log(tempDoc);
    const collectionRef = collection(props.db, 'User Lists');
    await setDoc(doc(collectionRef, uid), tempDoc);
    updateUserLists(contextProps);
  }

  async function updateUserLists(contextProps) {
    if (contextProps.user) {
      const uid = contextProps.user.uid;
      const docRef = doc(contextProps.db, 'User Lists', uid);
      const docSnap = await getDoc(docRef);
      /*docSnap.data() returns the user's firestore json document in random order. 
        Object.entries(...) converts it into an array of sub arrays whose 
        first item is the key string and the second item is the value. In this 
        case, the value is also an array whose first item is the timestamp at 
        the time that list was created. We sort it by the timestamp and set it 
        as userLists*/
      if (docSnap.data()) {
        const arrayConvert = Object.entries(docSnap.data());
        arrayConvert.sort((a, b) => a[1][0] - b[1][0]);
        setUserLists(arrayConvert);
      }
    }
  }

  // Get user lists from firestore and store it as a state
  useEffect(() => {
    updateUserLists(contextProps);
  }, [contextProps]);

  return (
    <div className='page'>
      {contextProps.user ? (
        // signed in
        <>
          <button
            id='addListBtn'
            onClick={() => {
              setCreatorOn(!creatorOn);
              console.log(userLists);
            }}
          >
            Create New List
          </button>

          {userLists &&
            userLists.map((list, i) => (
              <div key={i}>
                {/* list[0] is each lists' key string because the lists object was
                converted from json to an array using Object.entries() which makes 
                the key string the first item and the value the second item in its sub arrays*/}
                <h1>{list[0]}</h1>
                {/* Place a delete button only for lists other than 'Watch List' */}
                {list[0] != 'Watch List' && (
                  <button
                    onClick={() => {
                      // delete the firestore list with name of list[0] in this scope
                      // then updateUserLists(contextProps);
                      deleteList(contextProps, list[0]);
                      // updateUserLists(contextProps);
                    }}
                  >
                    Delete
                  </button>
                )}
                <MovieCarousel id={list[0]} movieList={list[1].slice(1)} />
              </div>
            ))}

          {/* creator popup start*/}
          {creatorOn && (
            <div className='listCreator'>
              <h3>Create New List</h3>
              <form
                id='listCreatorForm'
                onSubmit={() => {
                  createNewList(
                    contextProps,
                    document.getElementById('listCreatorInput').value
                  );
                  document.getElementById('listCreatorInput').value = '';
                  setCreatorOn(!creatorOn);
                }}
              >
                <label htmlFor='listCreatorInput'>List Name: </label>
                <input id='listCreatorInput' type='text' autoFocus={true} />
                <button type='submit'>Create</button>
              </form>
              <button
                onClick={() => {
                  setCreatorOn(!creatorOn);
                }}
              >
                Cancel
              </button>
            </div>
          )}
          {/* creator popup end */}
        </>
      ) : (
        // signed out
        <>
          <div>Please log in</div>
        </>
      )}
    </div>
  );
}
