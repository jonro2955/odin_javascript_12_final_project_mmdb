import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import ActorPage from './components/pages/ActorPage';
import PosterPage from './components/pages/PosterPage';
import LoginPage from './components/pages/LoginPage';
import ListsPage from './components/pages/ListsPage';
import { AppContext } from './components/contexts/AppContext';
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

/* <App/> is the root component which contains the firebase user object
and the database object. It passes these along with the function 
addToList() to all comonents below its component hierarchy through 
the useContext api*/
export default function App() {
  const [user, setUser] = useState();
  const [appContext, setAppContext] = useState({
    addToList,
    getGenre,
    user,
    db,
  });

  getAuth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      let uid = getAuth().currentUser.uid;
      initDefaultUserList(uid);
    } else {
      setUser(null);
    }
  });

  /**initDefaultUserList(uid): This is called on each auth state change.
   * If firestore's "User Lists" collection doesn't have a document with
   * an id matching the logged in user's id, one is created.
   * We'll make the new document contain an object with a key called
   * 'Watch List', and a value of an empty array. This is the default
   * movie list that every user starts out with. */
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

  /* addToList(movieObj, listName): Adds a movie object to the list
  with the given list name. The movieObj input must be a TMDB API 
  movie details object containing things like a movie's title, id, 
  release_date, etc. The listName input must be a string that matches 
  one of the existing list names in the user's firestore document*/
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

  // This is just a utility function for the addToList() function
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

  function getGenre(idNum) {
    const genreList = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      { id: 35, name: 'Comedy' },
      { id: 80, name: 'Crime' },
      { id: 99, name: 'Documentary' },
      { id: 18, name: 'Drama' },
      { id: 10751, name: 'Family' },
      { id: 14, name: 'Fantasy' },
      { id: 36, name: 'History' },
      { id: 27, name: 'Horror' },
      { id: 10402, name: 'Music' },
      { id: 9648, name: 'Mystery' },
      { id: 10749, name: 'Romance' },
      { id: 878, name: 'Science Fiction' },
      { id: 10770, name: 'TV Movie' },
      { id: 53, name: 'Thriller' },
      { id: 10752, name: 'War' },
      { id: 37, name: 'Western' },
    ];
    const target = genreList.find((obj) => {
      return obj.id === idNum;
    });
    return target.name;
  }

  useEffect(() => {
    setAppContext({
      addToList,
      getGenre,
      user,
      db,
    });
  }, [user]);

  return (
    <>
      {/* All children of <AppContext.Provider ... /> get their props 
      from the Context API. See setAppContext() calls in here*/}
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
