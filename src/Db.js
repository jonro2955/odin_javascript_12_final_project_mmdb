import { getFirestore, collection, setDoc, getDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

function getCollectionDoc(collectionId, docName) {
  const docRef = doc(db, collectionId, docName);
  return getDoc(docRef);
}

async function setCollectionDoc(collectionId, docName, newDoc) {
  const collectionRef = collection(db, collectionId);
  await setDoc(doc(collectionRef, docName), newDoc);
}

export { db, getCollectionDoc, setCollectionDoc };
