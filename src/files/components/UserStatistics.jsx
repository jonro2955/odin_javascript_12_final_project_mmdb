import { AppContext } from "../contexts/AppContext";
import React, { useEffect, useState, useContext } from "react";
import { getFirestore, collection, setDoc, getDoc, doc } from "firebase/firestore";

export default function UserStatistics() {
  const appContext = useContext(AppContext);
  const [userGenres, setUserGenres] = useState();

  useEffect(() => {
    if (appContext.user) {
      (async function getUserGenres() {
        const docRef = doc(appContext.db, appContext.user.uid, "genres");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let genreStatsArray = docSnap.data()["genres"];
          setUserGenres(
            genreStatsArray.sort((a, b) => {
              return b.occurance - a.occurance;
            })
          );
        } else {
          setUserGenres([]);
        }
      })();
    }
  }, [appContext.user]);

  return (
    userGenres && (
      <>
        <h3>Your favourite genres:</h3>
        {userGenres.map((genre, i) => (
          <div key={i}>
            <span>{`${genre.name}: `}</span>
            <span>Viewed {genre.occurance} times.</span>
          </div>
        ))}
      </>
    )
  );
}
