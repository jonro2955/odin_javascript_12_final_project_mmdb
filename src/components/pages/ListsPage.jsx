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
    /*firebase will throw an error if you try to a set a 
      doc with a field having an empty string*/
    if (!listName) {
      return;
    }
    const uid = props.user.uid;
    const docRef = doc(props.db, 'User Lists', uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    /* No need to check if(docSnap.exists()), since everytime someone logs 
      in, App.js will make sure to set up a doc for that user*/
    // First, create a copy of the user's document
    let tempDoc = docSnap.data();
    /* Prevent duplicate entries by checking if tempDoc[listName] exists. 
      setDoc() will overwrite items with the same name*/
    if (tempDoc[listName]) {
      alert(
        `Save unsuccessful. List '${listName}' 
          exists. Cannot create duplicate lists.`
      );
    } else {
      tempDoc[listName] = [];
      const collectionRef = collection(props.db, 'User Lists');
      await setDoc(doc(collectionRef, uid), tempDoc);
      alert(`List '${listName}' successfully created.`);
      updateUserLists(contextProps);
    }
  }

  async function updateUserLists(contextProps) {
    if (contextProps.user) {
      const uid = contextProps.user.uid;
      const docRef = doc(contextProps.db, 'User Lists', uid);
      const docSnap = await getDoc(docRef);
      /*docSnap.data() returns the user's firestore json document. 
        Object.entries(..object) converts an object 
        into an array of sub arrays whose first item is the key string
        and the second item is the value paired to that key. In this case,
        the second item is also an array of movie ids*/
      setUserLists(Object.entries(docSnap.data()));
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
          <h1>Lists</h1>
          <button
            id='addListBtn'
            onClick={() => {
              setCreatorOn(!creatorOn);
              console.log(userLists);
            }}
          >
            +
          </button>

          {userLists &&
            userLists.map((list, i) => (
              <div key={i}>
                <h1>{list[0]}</h1>
                <MovieCarousel id={list[0]} movieList={list[1]} />
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
                  document.getElementById('listCreatorInput').focus();
                }}
              >
                <label htmlFor='listCreatorInput'>List Name: </label>
                <input id='listCreatorInput' type='text' />
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
