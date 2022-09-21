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
import { getAuth } from "firebase/auth";
import { db, getCollectionDoc, setCollectionDoc } from "./db"

export default function App() {
  const [userListsState, setUserListsState] = useState();
  const [userReviewsState, setUserReviewsState] = useState();
  /* sets the disabled attrribute of Watchlist+ button in <MovieCard/>*/
  const [watchListIdArrayState] = useState([]);
  const [user, setUser] = useState(() => {
    return getAuth().currentUser || undefined;
  });
  const [appContext, setAppContext] = useState({
    db,
    user,
    userListsState,
    userReviewsState,
    watchListIdArrayState,
    fetchUserData,
    submitNewReview,
    editPrevReview,
    createNewList,
    deleteList,
    addToList,
    removeFromList,
    listExists,
    movieIsInLocalList,
  });

  // Update user at every mount
  useEffect(() => getAuth().onAuthStateChanged(setUser), []);

  // keep userListsState up to date
  useEffect(() => {
    if (user === null) {
      setUserListsState(null); // clear state when not logged in
      return;
    }
    if (!user) {
      return; // user still loading, do nothing yet
    }
    fetchUserData(user);
  }, [user]); // rerun when user changes

  useEffect(() => {
    if (userListsState) {
      setAppContext({
        db,
        user,
        userListsState,
        userReviewsState,
        watchListIdArrayState: () => {
          return userListsState["Watch List"].map((item) => {
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
      });
    }
  }, [user, userListsState, userReviewsState]);

  /* Everytime someone logs in, run this to retrieve their stored data. If no data exists, initialize documents for the new user. */
  async function fetchUserData() {
    // userInfo doc
    const docSnap1 = await getCollectionDoc(user.uid, "1userInfo");
    if (!docSnap1.exists()) {
      const newUserDoc = {
        userName: user.displayName,
        email: user.email,
      };
      setCollectionDoc(user.uid, "1userInfo", newUserDoc);
    }
    // userLists doc
    const docSnap2 = await getCollectionDoc(user.uid, "2userLists");
    if (!docSnap2.exists()) {
      updateUserLists({
        "Watch List": [Date.now()],
      });
    } else {
      setUserListsState(docSnap2.data());
    }
    // userReviews doc
    const docSnap3 = await getCollectionDoc(user.uid, "3userReviews");
    if (docSnap3.exists()) {
      setUserReviewsState(docSnap3.data());
    }
  }

  async function addReviewToUser(reviewObj) {
    const docSnap = await getCollectionDoc(user.uid, "3userReviews");
    if (docSnap.exists()) {
      console.log("docsnap exists");
      let reviews = docSnap.data()["reviews"];
      reviews[reviewObj.movieId] = {
        movieId: reviewObj.movieId,
        stars: reviewObj.stars,
        text: reviewObj.text,
        title: reviewObj.title,
        userName: user.displayName,
        email: user.email,
      };
      setUserReviewsState(reviews);
      setCollectionDoc(user.uid, "3userReviews", { reviews });
    } else {
      console.log("docsnap does not exist");
      let reviews = {};
      reviews[reviewObj.movieId] = {
        movieId: reviewObj.movieId,
        stars: reviewObj.stars,
        text: reviewObj.text,
        title: reviewObj.title,
        userName: user.displayName,
        email: user.email,
      };
      setUserReviewsState(reviews);
      setCollectionDoc(user.uid, "3userReviews", { reviews });
    }
  }

  async function addReviewToMovie(reviewObj) {
    let movieId = reviewObj.movieId.toString();
    let reviews;
    const docSnap = await getCollectionDoc(movieId, "reviews");
    if (docSnap.exists()) {
      reviews = docSnap.data()["reviews"];
      reviews.push({
        movieId: reviewObj.movieId,
        stars: reviewObj.stars,
        text: reviewObj.text,
        title: reviewObj.title,
        userName: user.displayName,
        userId: user.uid,
        email: user.email,
      });
    } else {
      const movieInfo = {
        movieName: reviewObj.title,
      };
      setCollectionDoc(movieId, "movieInfo", movieInfo);
      reviews = [
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
    }
    setCollectionDoc(movieId, "reviews", { reviews });
  }

  async function editUserReview(prevRevObj, newRevObj) {
    const docSnap = await getCollectionDoc(user.uid, "3userReviews");
    if (docSnap.exists()) {
      let reviews = docSnap.data()["reviews"];
      reviews[prevRevObj.movieId] = {
        movieId: prevRevObj.movieId,
        stars: newRevObj.stars, // new
        text: newRevObj.text, // new
        title: prevRevObj.title,
        userName: user.displayName,
        email: user.email,
      };
      setCollectionDoc(user.uid, "3userReviews", { reviews });
      setUserReviewsState(reviews);
    }
  }

  async function editMovieReview(prevRevObj, newRevObj) {
    let movieId = prevRevObj.movieId.toString();
    const docSnap = await getCollectionDoc(movieId, "reviews");
    if (docSnap.exists()) {
      let reviews = docSnap.data()["reviews"]; 
      let targetIndex = reviews.findIndex((rev) => {
        return rev.movieId === prevRevObj.movieId;
      });
      reviews[targetIndex] = {
        movieId: prevRevObj.movieId,
        stars: newRevObj.stars, // new
        text: newRevObj.text, // new
        title: prevRevObj.title,
        userName: user.displayName,
        userId: user.uid,
        email: user.email,
      };
      setCollectionDoc(movieId, "reviews", { reviews });
    }
  }

  /* Each review exists in 2 collections */
  async function submitNewReview(reviewObj) {
    addReviewToUser(reviewObj);
    addReviewToMovie(reviewObj);
  }

  /* A edit both collections*/
  async function editPrevReview(prevRevObj, newRevObj) {
    editUserReview(prevRevObj, newRevObj);
    editMovieReview(prevRevObj, newRevObj);
  }

  async function createNewList(listName) {
    if (user) {
      if (!listName) {
        // an empty string key in setDoc() generates errors
        return;
      }
      if (!listExists(listName)) {
        const docSnap = await getCollectionDoc(user.uid, "2userLists");
        let tempLists = docSnap.data();
        tempLists[listName] = [Date.now()];
        updateUserLists(tempLists);
      } else {
        alert("Cannot create duplicate lists.");
      }
    } else {
      alert("You must be logged in to save movies.");
    }
  }

  async function deleteList(listName) {
    const docSnap = await getCollectionDoc(user.uid, "2userLists");
    let tempLists = docSnap.data();
    tempLists = Object.entries(tempLists);
    let targetIndex = tempLists.findIndex((element) => element[0] === listName);
    tempLists.splice(targetIndex, 1);
    tempLists = Object.fromEntries(tempLists);
    updateUserLists(tempLists);
  }

  async function addToList(movieObj, listName) {
    let alreadyAdded = movieIsInLocalList(movieObj, listName);
    if (!alreadyAdded) {
      const docSnap = await getCollectionDoc(user.uid, "2userLists");
      let tempLists = docSnap.data();
      tempLists[listName].push(movieObj);
      updateUserLists(tempLists);
    } else {
      alert(`This movie was previously added to ${listName}`);
    }
  }

  async function removeFromList(movieObj, listName) {
    const docSnap = await getCollectionDoc(user.uid, "2userLists");
    let tempLists = docSnap.data();
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

  function listExists(listName) {
    const listsArray = Object.entries(userListsState);
    return listsArray.find((item) => {
      return item[0] === listName;
    });
  }

  function movieIsInLocalList(movieObj, listName) {
    const movieId = movieObj.id;
    const listsArray = Object.entries(userListsState);
    const targetEntry = listsArray.find((item) => {
      return item[0] === listName;
    });
    const targetList = targetEntry[1].slice(1);
    return targetList.find((movie) => {
      return movie.id === movieId;
    });
  }

  async function updateUserLists(newListObj) {
    setCollectionDoc(user.uid, "2userLists", newListObj);
    setUserListsState(newListObj);
  }

  return (
    <>
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
