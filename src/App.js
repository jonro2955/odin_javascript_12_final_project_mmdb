import Navbar from "./files/components/Navbar";
import HomePage from "./files/pages/HomePage";
import MoviePage from "./files/pages/MoviePage";
import ActorPage from "./files/pages/ActorPage";
import PosterPage from "./files/pages/PosterPage";
import LoginPage from "./files/pages/LoginPage";
import ListsPage from "./files/pages/ListsPage";

import { AppContext } from "./files/contexts/AppContext";
import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, setDoc, getDoc, doc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDmnDmYKukf4pvEC6QecqF4cSlUmSNeijY",
  authDomain: "mmdb-97518.firebaseapp.com",
  projectId: "mmdb-97518",
  storageBucket: "mmdb-97518.appspot.com",
  messagingSenderId: "456054498165",
  appId: "1:456054498165:web:f31e82fd20ce940728293c",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* <App/> is the root component which contains the firebase user object
and the database objects. It passes these along with other functions 
to all comonents below its component hierarchy using the useContext api*/
export default function App() {
  const [userLists, setUserLists] = useState();
  const [userReviews, setUserReviews] = useState();
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
    userReviews,
    WLIDArray,
    fetchUserData,
    submitNewReview,
    editPrevReview,
    createNewList,
    deleteList,
    addToList,
    removeFromList,
    listExists,
    movieIsInLocalList,
    getGenre,
  });

  // getAuth().onAuthStateChanged((usr) => {
  //   setUser(usr);
  // });

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
    // if user is defined, fetch user's lists
    fetchUserData(user);
  }, [user]); // <-- rerun when user changes

  // update `appContext` each time `setUserLists()` runs
  useEffect(() => {
    if (userLists) {
      setAppContext({
        db,
        user,
        userLists,
        userReviews,
        WLIDArray: () => {
          return userLists["Watch List"].map((item) => {
            return item.id;
          });
        },
        fetchUserData,
        submitNewReview,
        editPrevReview,
        createNewList,
        deleteList,
        addToList,
        removeFromList,
        listExists,
        movieIsInLocalList,
        getGenre,
      });
    }
    //user must be in dedendency list for proper log-out behaviour
  }, [user, userLists, userReviews]);

  // fetch user's firestore 'lists' doc
  async function fetchUserData() {
    // user lists
    const docRef1 = doc(db, user.uid, "lists");
    const docSnap1 = await getDoc(docRef1);
    if (!docSnap1.exists()) {
      // if no doc, initialize one with default watch list
      const defaultDoc = {
        "Watch List": [Date.now()],
      };
      updateUserLists(defaultDoc);
      // console.log(`Initialized default watch list for new user ${user.uid}`);
    } else {
      setUserLists(docSnap1.data());
      // console.log(`Fetch user lists doc: `, docSnap1.data());
    }
    //user reviews
    const docRef2 = doc(db, user.uid, "reviews");
    const docSnap2 = await getDoc(docRef2);
    if (docSnap2.exists()) {
      setUserReviews(docSnap2.data());
      // console.log(`Fetch user reviews doc: `, docSnap2.data());
    }
  }

  /*  Each review for a movie exists in 2 collections: one for user 
  and another for movie. 
  This is to make reviews viewable to non logged in users*/
  async function submitNewReview(reviewObj) {
    addReviewToUser(reviewObj);
    addReviewToMovie(reviewObj);
  }

  // add review to user collection's `reviews` doc
  async function addReviewToUser(reviewObj) {
    const docRef = doc(db, user.uid, "reviews");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let coll = docSnap.data()["coll"];
      coll[reviewObj.movieId] = {
        movieId: reviewObj.movieId,
        stars: reviewObj.stars,
        text: reviewObj.text,
        title: reviewObj.title,
        userName: user.displayName,
        email: user.email,
      };
      const collectionRef = collection(db, user.uid);
      await setDoc(doc(collectionRef, "reviews"), { coll });
      setUserReviews(coll);
    } else {
      let coll = {};
      coll[reviewObj.movieId] = {
        movieId: reviewObj.movieId,
        stars: reviewObj.stars,
        text: reviewObj.text,
        title: reviewObj.title,
        userName: user.displayName,
        email: user.email,
      };
      const collectionRef = collection(db, user.uid);
      await setDoc(doc(collectionRef, "reviews"), { coll });
      setUserReviews(coll);
    }
  }

  // Add review to a separate collection for each reviewed movie
  async function addReviewToMovie(reviewObj) {
    let collName = reviewObj.movieId.toString();
    const docRef = doc(db, collName, "reviews");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // add review to existing doc array
      let coll = docSnap.data()["coll"];
      coll.push({
        movieId: reviewObj.movieId,
        stars: reviewObj.stars,
        text: reviewObj.text,
        title: reviewObj.title,
        userName: user.displayName,
        userId: user.uid,
        email: user.email,
      });
      const collectionRef = collection(db, collName);
      await setDoc(doc(collectionRef, "reviews"), { coll });
    } else {
      // create new doc as an array
      let coll = [
        {
          movieId: reviewObj.movieId,
          stars: reviewObj.stars,
          text: reviewObj.text,
          title: reviewObj.title,
          userName: user.displayName,
          userId: user.uid,
          email: user.email,
        },
      ];
      const collectionRef = collection(db, collName);
      await setDoc(doc(collectionRef, "reviews"), { coll });
    }
  }

  /* Like submitNewReview(), editing a review must be done in 
  2 different collections: the user collection and the movie one*/
  async function editPrevReview(prevRevObj, newRevObj) {
    // console.log("call editPrevReview(prevRevObj, newRevObj)", prevRevObj, newRevObj);
    editUserReview(prevRevObj, newRevObj);
    editMovieReview(prevRevObj, newRevObj);
  }

  async function editUserReview(prevRevObj, newRevObj){
    const docRef = doc(db, user.uid, "reviews");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let coll = docSnap.data()["coll"];
      coll[prevRevObj.movieId] = {
        movieId: prevRevObj.movieId,
        stars: newRevObj.stars, // new
        text: newRevObj.text, // new
        title: prevRevObj.title,
        userName: user.displayName,
        email: user.email,
      };
      const collectionRef = collection(db, user.uid);
      await setDoc(doc(collectionRef, "reviews"), { coll });
      setUserReviews(coll);
    }
  }

  async function editMovieReview(prevRevObj, newRevObj){
    let collName = prevRevObj.movieId.toString();
    const docRef = doc(db, collName, "reviews");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let coll = docSnap.data()["coll"]; // array of review objects
      let targetIndex = coll.findIndex(rev=>{
        return rev.movieId === prevRevObj.movieId;
      })
      coll[targetIndex]={
        movieId: prevRevObj.movieId,
        stars: newRevObj.stars, // new
        text: newRevObj.text, // new
        title: prevRevObj.title,
        userName: user.displayName,
        userId: user.uid,
        email: user.email,
      };
      const collectionRef = collection(db, collName);
      await setDoc(doc(collectionRef, "reviews"), { coll });
    }
  }

  //update both firestore doc and local state
  async function updateUserLists(newListObj) {
    const collectionRef = collection(db, user.uid);
    await setDoc(doc(collectionRef, "lists"), newListObj);
    setUserLists(newListObj);
  }

  async function createNewList(listName) {
    if (user) {
      if (!listName) {
        // an empty string key in setDoc() generates errors
        return;
      }
      if (!listExists(listName)) {
        const docRef = doc(db, user.uid, "lists");
        const docSnap = await getDoc(docRef);
        // get copy of user doc
        let tempLists = docSnap.data();
        // alter it
        tempLists[listName] = [Date.now()];
        //set everything to the altered version
        updateUserLists(tempLists);
      } else {
        alert("Cannot create duplicate lists.");
      }
    } else {
      alert("You must be logged in to save movies.");
    }
  }

  async function deleteList(listName) {
    const docRef = doc(appContext.db, user.uid, "lists");
    const docSnap = await getDoc(docRef);
    // get copy of user doc
    let tempLists = docSnap.data();
    // alter it
    tempLists = Object.entries(tempLists);
    let targetIndex = tempLists.findIndex((element) => element[0] === listName);
    tempLists.splice(targetIndex, 1);
    // Convert back to object
    tempLists = Object.fromEntries(tempLists);
    //update everything
    updateUserLists(tempLists);
  }

  async function addToList(movieObj, listName) {
    let alreadyAdded = movieIsInLocalList(movieObj, listName);
    if (!alreadyAdded) {
      const docRef = doc(db, user.uid, "lists");
      const docSnap = await getDoc(docRef);
      let tempLists = docSnap.data();
      tempLists[listName].push(movieObj);
      updateUserLists(tempLists);
    } else {
      alert(`This movie was previously added to ${listName}`);
    }
  }

  async function removeFromList(movieObj, listName) {
    const docRef = doc(db, user.uid, "lists");
    const docSnap = await getDoc(docRef);
    // get copy of user doc
    let tempLists = docSnap.data();
    // alter it
    tempLists = Object.entries(tempLists);
    let listIndex = tempLists.findIndex((item) => item[0] === listName);
    let list = tempLists[listIndex][1];
    console.log(list);
    list = list.filter((item) => {
      return item.id !== movieObj.id;
    });
    tempLists[listIndex][1] = list;
    tempLists = Object.fromEntries(tempLists);
    updateUserLists(tempLists);
  }

  // Check if local `userLists` has a list with the given name
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
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 10770, name: "TV Movie" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ];
    const target = genreList.find((obj) => {
      return obj.id === idNum;
    });
    return target.name;
  }

  return (
    <>
      {/* All children of <AppContext.Provider ... /> get the appContext state as a prop through the context api*/}
      <AppContext.Provider value={appContext}>
        <HashRouter basename="/">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/poster/:path" element={<PosterPage />} />
            <Route path="/actor/:actorId" element={<ActorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/lists" element={<ListsPage />} />
          </Routes>
        </HashRouter>
      </AppContext.Provider>
    </>
  );
}
