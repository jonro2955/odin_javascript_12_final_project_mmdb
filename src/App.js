import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import ActorPage from './components/pages/ActorPage';
import PosterPage from './components/pages/PosterPage';
import LoginPage from './components/pages/LoginPage';
import ListsPage from './components/pages/ListsPage';
import { AppContext } from './components/AppContext';
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
  const [user, setUser] = useState();
  const [appContext, setAppContext] = useState({
    addToList,
    movieIsInList,
    user,
    db,
  });

  useEffect(() => {
    setAppContext({
      addToList,
      movieIsInList,
      user,
      db,
    });
  }, [user]);

  getAuth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
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
        'Watch List': [Date.now()],
      });
      console.log(`Initialized default firestore document for new user ${uid}`);
    }
  }

  /* addToList(movieObj, listName): 
  movieObj must be a TMDB API movie details object containing things like  
  a movie's title, id, release_date, etc.
  listName must be a string that matches one of the existing list names in 
  the user's firestore document*/
  async function addToList(movieObj, listName) {
    if (user) {
      const uid = user.uid;
      const docRef = doc(db, 'User Lists', uid);
      const docSnap = await getDoc(docRef);
      /* Checking if(docSnap.exists()) isn't neccessary since a doc will 
      always be set up for a new user at onAuthStateChanged(), but it is 
      done here just to note the method for future reference.*/
      if (docSnap.exists()) {
        let tempListsObj = docSnap.data();
        // Prevent duplicates
        let alreadyThere = await movieIsInList(
          movieObj,
          tempListsObj,
          listName
        );
        if (!alreadyThere) {
          tempListsObj[listName].push(movieObj);
          const collectionRef = collection(db, 'User Lists');
          await setDoc(doc(collectionRef, uid), tempListsObj);
        } else {
          // alert('This movie was previously added.');
        }
      }
    } else {
      alert('You must be logged in to save movies.');
    }
  }

  async function movieIsInList(movieObj, tempListsObj, listName) {
    const movieId = movieObj.id;
    const listsArray = Object.entries(tempListsObj);
    const targetEntry = listsArray.find((item) => {
      return item[0] === listName;
    });
    const targetList = targetEntry[1].slice(1);
    let found = targetList.find((movie) => {
      return movie.id === movieId;
    });
    if (found) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {/* All children of <AppContext.Provider ... /> get their props 
      from the Context API. See how appContext is set in this file*/}
      <AppContext.Provider value={appContext}>
        <HashRouter basename='/'>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/movie/:movieId' element={<MoviePage />} />
            <Route path='/poster/:path' element={<PosterPage />} />
            <Route path='/actor/:actorId' element={<ActorPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/lists' element={<ListsPage />} />
          </Routes>
        </HashRouter>
      </AppContext.Provider>
    </>
  );
}
