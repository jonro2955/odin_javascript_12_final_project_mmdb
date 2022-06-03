import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import facebookLogo from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_12_final/odin_javascript_12_mmdb/src/images/facebook-logo.png';
import googleLogo from '/home/pc/TOP/Projects/2_Full_Stack_JavaScript/odin_javascript_12_final/odin_javascript_12_mmdb/src/images/google-logo.png';

export default function LoginPage() {
  const appContext = useContext(AppContext);

  async function signInWithFacebook() {
    var provider = new FacebookAuthProvider();
    await signInWithPopup(getAuth(), provider)
      .then((cred) => {
        console.log(
          `Logged in using Google with firebase uid ${cred.user.uid}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function signInWithGoogle() {
    var provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(), provider)
      .then((cred) => {
        console.log(
          `Logged in using Google with firebase uid ${cred.user.uid}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function logOut() {
    getAuth().signOut();
  }

  return (
    <div id='LoginPage' className='page'>
      {appContext.user ? (
        // signed in
        <div>
          <h3>
            {'You are signed in using ' +
              appContext.user.providerData[0].providerId +
              ' as ' +
              appContext.user.displayName}
          </h3>
          <button onClick={logOut}>Log Out</button>
        </div>
      ) : (
        // signed out
        <>
          <button id='googleSignInBtn' className='' onClick={signInWithGoogle}>
            <img src={googleLogo} alt='google logo' width='50' height='50' />
            Log in with Google
          </button>
          <button
            id='facebookSignInBtn'
            className=''
            onClick={signInWithFacebook}
          >
            <img src={facebookLogo} alt='google logo' width='50' height='50' />
            Log in with Facebook
          </button>
        </>
      )}
    </div>
  );
}
