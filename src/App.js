import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import ActorPage from './components/pages/ActorPage';
import PosterPage from './components/pages/PosterPage';
import LoginPage from './components/pages/LoginPage';
import ListsPage from './components/pages/ListsPage';
import { MyContext } from './components/MyContext';
import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmnDmYKukf4pvEC6QecqF4cSlUmSNeijY',
  authDomain: 'mmdb-97518.firebaseapp.com',
  projectId: 'mmdb-97518',
  storageBucket: 'mmdb-97518.appspot.com',
  messagingSenderId: '456054498165',
  appId: '1:456054498165:web:f31e82fd20ce940728293c',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [contextProps, setContextProps] = useState({
    addToList,
    user,
    // app,
    db,
  });

  useEffect(() => {
    setContextProps({
      addToList,
      user,
      // app,
      db,
    });
  }, [user]);

  //reset user anytime auth state chages
  getAuth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      //get logged in user data at any time by calling console.log(getAuth().currentUser);
      let uid = getAuth().currentUser.uid;
      initDefaultUserList(uid);
    } else {
      setUser(null);
    }
  });

  /**initDefaultUserList(uid): A function to be called each time user logs in.
   * It checks our firestore's "User Lists" collection for a document with an
   * id matching the logged in user's id, and if not found, creates one.
   * The newly created document will be a simple object with one key called
   * 'Watch List', with a starting value of an empty array. This is the default
   * list that every user starts out with. The array will later hold movie ids
   * that the user can add using addToList(movieObj, listName).
   * */
  async function initDefaultUserList(uid) {
    const docRef = doc(db, 'User Lists', uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const collectionRef = collection(db, 'User Lists');
      await setDoc(doc(collectionRef, uid), {
        'Watch List': [],
      });
      console.log(`Initialized default firestore document for new user ${uid}`);
    } 
  }

  /* addToList(movieObj, listName) will be passed to other components
  using the context API. 
  The receiver will then attach it to some clickable element with a 
  'data-movieid' attribute which is going to be a movieId. Then when
  that element is clicked, this function will access the movie id
  through the event object and add it to firestore. A list name must 
  be given as a string input by the calling component*/
  async function addToList(movieObj, listName) {
    if (user) {
      // const clickedMovieId = movieObj.target.getAttribute('data-movieid');
      const uid = user.uid;
      const docRef = doc(db, 'User Lists', uid);
      const docSnap = await getDoc(docRef);
      /* Checking if(docSnap.exists()) isn't neccessary since a doc will 
      always be set up for a new user at onAuthStateChanged(), but it is 
      done here for practice and security.*/
      if (docSnap.exists()) {
        let tempDoc = docSnap.data();
        tempDoc[listName].push(movieObj);
        const collectionRef = collection(db, 'User Lists');
        await setDoc(doc(collectionRef, uid), tempDoc);
        alert('Movie successfully added to list.');
      }
    } else {
      alert('You must be logged in to save movies.');
    }
  }

  return (
    <>
      {/* All children of <MyContext.Provider ... /> get their 
      props from the Context API. See MyContext.js */}
      <MyContext.Provider value={contextProps}>
        <HashRouter basename='/'>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/movie/:movieId' element={<MoviePage />} />
            <Route path='/poster/:movieId' element={<PosterPage />} />
            <Route path='/actor/:actorId' element={<ActorPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/lists' element={<ListsPage />} />
          </Routes>
        </HashRouter>
      </MyContext.Provider>
    </>
  );
}
