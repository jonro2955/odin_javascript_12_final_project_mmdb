import { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { getDoc, doc } from 'firebase/firestore';

/* This renders the add button and the popup selection of the available 
list names to add to. 
The movie prop must be a TMDB API movie details object containing things 
like a movie's title, id, release_date, etc.*/
export default function Adder({ movie }) {
  const appContext = useContext(AppContext);
  const [menuOn, setMenuOn] = useState(false);
  const [listNamesArray, setListNamesArray] = useState();
  const [inactiveNamesArray, setInactiveNamesArray] = useState([]);

  function toggleMenu() {
    setMenuOn(!menuOn);
  }

  /*The listNamesArray state will hold an array of the user's list names
  strings. Whenever this component mounts or someone logs in and changes 
  appContext, fetch the user doc and set the listNamesArray*/
  useEffect(() => {
    if (appContext.user) {
      (async () => {
        const uid = appContext.user.uid;
        const docRef = doc(appContext.db, 'User Lists', uid);
        const docSnap = await getDoc(docRef);
        /*Sort by converting to array and using the timestamps inside*/
        const arrayConversion = Object.entries(docSnap.data());
        arrayConversion.sort((a, b) => a[1][0] - b[1][0]);
        let returnArray = [];
        /* If movieArray contains a movie object with a property id
          that matches movie.id, push item[0] into a special array for
          all such cases*/
        let inactives = [];
        arrayConversion.forEach((item) => {
          returnArray.push(item[0]);
          let alreadyContains = item[1].slice(1).find((obj) => {
            return obj.id === movie.id;
          });
          if (alreadyContains) {
            inactives.push(item[0]);
          }
        });
        setInactiveNamesArray(inactives);
        setListNamesArray(returnArray);
      })();
    }
  }, [appContext]);

  return (
    <div>
      <button
        onClick={() => {
          toggleMenu();
        }}
      >
        Add To List
      </button>
      {listNamesArray && menuOn && (
        <div className='popupListMenu'>
          {listNamesArray.map((name) => {
            let inactiveStatus = false;
            console.log(name);
            if (inactiveNamesArray.includes(name)) {
              inactiveStatus = true;
            }
            return (
              <button
                key={name}
                disabled={inactiveStatus}
                onClick={() => {
                  appContext.addToList(movie, name);
                  setMenuOn(false);
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
