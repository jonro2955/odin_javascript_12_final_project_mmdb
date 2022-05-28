import Navbar from './components/Navbar';
import HomePage from './components/pages/HomePage';
import MoviePage from './components/pages/MoviePage';
import ActorPage from './components/pages/ActorPage';
import PosterPage from './components/pages/PosterPage';
import LoginPage from './components/pages/LoginPage';
import ListsPage from './components/pages/ListsPage';
import { MyContext } from './components/MyContext';
import { useState } from 'react';
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
   * id equal to the logged in user's id, and if not found, creates one.
   * The newly created document will be a simple object with one property called
   * watchList, with a starting value of [] (an empty array). This is the default
   * movie list that every user starts out with. This array will later hold movie ids
   * that the user will choose.
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

  // Passed to other components using context API
  async function addToWatchList(e) {
    if (user) {
      const clickedMovieId = e.target.getAttribute('data-movieid');
      const uid = user.uid;
      const docRef = doc(db, 'User Lists', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let tempArray = docSnap.data()['Watch List'];
        tempArray.push(clickedMovieId);
        const collectionRef = collection(db, 'User Lists');
        await setDoc(doc(collectionRef, uid), {
          'Watch List': tempArray,
        });
      }
    } else {
      alert('You must be logged in to save movies.');
    }
  }

  return (
    <>
      <MyContext.addToWatchList.Provider value={addToWatchList}>
        <HashRouter basename='/'>
          <Navbar user={user} />
          <Routes>
            <Route path='/' element={<HomePage user={user} />} />
            <Route path='/movie/:movieId' element={<MoviePage user={user} />} />
            <Route path='/poster/:movieId' element={<PosterPage />} />
            <Route path='/actor/:actorId' element={<ActorPage />} />
            <Route path='/login' element={<LoginPage user={user} />} />
            <Route path='/lists' element={<ListsPage user={user} />} />
          </Routes>
        </HashRouter>
      </MyContext.addToWatchList.Provider>
    </>
  );
}
