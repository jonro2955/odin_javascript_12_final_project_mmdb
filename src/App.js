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
and the database objects. It passes these along with other functions 
to all comonents below its component hierarchy using the useContext api*/
export default function App() {
  const [userLists, setUserLists] = useState();
  /*`WLIDArray` is short for 'Watch List movie IDs Array' and it is 
  for setting the `disabled` value of `Watchlist+` buttons in <MovieCard/>*/
  const [WLIDArray] = useState([]);
  const [user, setUser] = useState(() => {
    return getAuth().currentUser || undefined;
  });
  const [appContext, setAppContext] = useState({
    db,
    user,
    userLists,
    WLIDArray,
    fetchUserLists,
    createNewList,
    deleteList,
    addToList,
    removeFromList,
    listExists,
    movieIsInLocalList,
    getGenre,
  });

  // Update `user` at every mount
  useEffect(() => getAuth().onAuthStateChanged(setUser), []);

  // keep `userLists` up to date
  useEffect(() => {
    if (user === null) {
      setUserLists(null); // clear data when not logged in
      return;
    }
    if (!user) {
      return; // user still loading, do nothing yet
    }
    fetchUserLists(user); // calls setUserLists() with right refs
  }, [user]); // <-- rerun when user changes

  // update `appContext` each time `setUserLists()` runs
  useEffect(() => {
    if (userLists) {
      setAppContext({
        db,
        user,
        userLists,
        WLIDArray: () => {
          return userLists['Watch List'].map((item) => {
            return item.id;
          });
        },
        fetchUserLists,
        createNewList,
        deleteList,
        addToList,
        removeFromList,
        listExists,
        movieIsInLocalList,
        getGenre,
      });
      // console.log('setAppContext', userLists['Watch List']);
    }
  }, [userLists]);

  async function updateLists(newListObj) {
    setUserLists(newListObj);
    const collectionRef = collection(db, 'lists');
    await setDoc(doc(collectionRef, user.uid), newListObj);
  }

  // set local `userLists` to fetched firestore doc
  async function fetchUserLists() {
    const docRef = doc(db, 'lists', user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      // if no user doc, initialize one with default watch list
      const defaultDoc = {
        'Watch List': [Date.now()],
      };
      updateLists(defaultDoc);
      // console.log(
      //   `Initialized default firestore document for new user ${user.uid}`
      // );
    } else {
      // if user has a doc, set the `userLists` to it
      setUserLists(docSnap.data());
      // console.log(`Fetched existing user lists: `, docSnap.data());
    }
  }

  async function createNewList(listName) {
    if (user) {
      if (!listName) {
        // empty string key in setDoc() generates firebase errors
        return;
      }
      if (!listExists(listName)) {
        const docRef = doc(appContext.db, 'lists', user.uid);
        const docSnap = await getDoc(docRef);
        // get copy of user doc
        let tempLists = docSnap.data();
        // alter it
        tempLists[listName] = [Date.now()];
        //set everything to the altered version
        updateLists(tempLists);
      } else {
        alert('Cannot create duplicate lists.');
      }
    } else {
      alert('You must be logged in to save movies.');
    }
  }

  function deleteList(listName) {
    if (!listName) {
      return;
    }
    //First convert to array and splice it
    let tempLists = Object.entries(userLists);
    let targetIndex = tempLists.findIndex((element) => element[0] === listName);
    tempLists.splice(targetIndex, 1);
    // Convert back to object
    tempLists = Object.fromEntries(tempLists);
    //update everything
    updateLists(tempLists);
  }

  async function addToList(movieObj, listName) {
    if (user) {
      //check if userLists state has the movie
      let alreadyAdded = movieIsInLocalList(movieObj, listName);
      if (!alreadyAdded) {
        const docRef = doc(db, 'lists', user.uid);
        const docSnap = await getDoc(docRef);
        let tempLists = docSnap.data();
        tempLists[listName].push(movieObj);
        updateLists(tempLists);
      } else {
        alert(`This movie was previously added to ${listName}`);
      }
    } else {
      alert('You must be logged in to save movies.');
    }
  }

  function removeFromList(movieObj, listName) {
    if (user) {
      // alter the local copy
      let tempLists = Object.entries(userLists);
      let listIndex = tempLists.findIndex((item) => item[0] === listName);
      let list = tempLists[listIndex][1];
      list = list.filter((item) => {
        return item.id !== movieObj.id;
      });
      tempLists[listIndex][1] = list;
      tempLists = Object.fromEntries(tempLists);
      updateLists(tempLists);
    } else {
      alert('Error: you are not logged in.');
    }
  }

  // Check if `userLists` has a list with the given name
  function listExists(listName) {
    const listsArray = Object.entries(userLists);
    return listsArray.find((item) => {
      return item[0] === listName;
    });
  }

  // Check if a movie is in local userLists
  function movieIsInLocalList(movieObj, listName) {
    const movieId = movieObj.id;
    const listsArray = Object.entries(userLists);
    const targetEntry = listsArray.find((item) => {
      return item[0] === listName;
    });
    const targetList = targetEntry[1].slice(1);
    return targetList.find((movie) => {
      return movie.id === movieId;
    });
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

  // 550 is a generic movie id (Fight Club) for initialization
  // const docRefReviews = doc(db, 'Reviews', '550');
  // const docSnapReviews = await getDoc(docRefReviews);
  // if (!docSnapReviews.exists()) {
  //   let newObj={};
  //   newObj[uid] = { stars: 8, review: 'great' };
  //   const collectionRefReviews = collection(db, 'Reviews');
  //   await setDoc(doc(collectionRefReviews, '550'), {});
  // }

  return (
    <>
      {/* All children of <AppContext.Provider ... /> get the appContext 
      state as a prop through the context api*/}
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
