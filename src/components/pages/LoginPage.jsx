import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
// import facebookLogo from '../images/facebook-logo.png';
import googleLogo from '../images/google-logo.png';

export default function LoginPage() {
  const appContext = useContext(AppContext);
  let navigateTo = useNavigate();

  // async function signInWithFacebook() {
  //   var provider = new FacebookAuthProvider();
  //   await signInWithPopup(getAuth(), provider)
  //     .then((cred) => {
  //       console.log(
  //         `Logged in using Google with firebase uid ${cred.user.uid}`
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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

  async function logMeOut() {
    await getAuth()
      .signOut()
      .then(
        function () {
          console.log('Signed Out');
        },
        function (error) {
          console.error('Sign Out Error', error);
        }
      );
  }

  return (
    <div className='page '>
      <div className='loginPageContent'>
        {appContext.user ? (
          // signed in
          <div>
            <h3>
              {'You are signed in using ' +
                appContext.user.providerData[0].providerId +
                ' as ' +
                appContext.user.displayName}
            </h3>
            <div className='loginPgBtnsContainer'>
              <button
                onClick={() => {
                  navigateTo('/lists');
                }}
                className='loginPgBtn'
              >
                My Lists
              </button>
              <button
                onClick={() => {
                  logMeOut();
                }}
                className='loginPgBtn'
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          // signed out
          <>
            <div className='loginPageContent'>
              <button
                id='googleSignInBtn'
                className='loginBtn'
                onClick={signInWithGoogle}
              >
                <img
                  src={googleLogo}
                  alt='google logo'
                  width='50'
                  height='50'
                />
                <div>Log in with Google</div>
              </button>
              {/* <button
                id='facebookSignInBtn'
                className='loginBtn'
                onClick={signInWithFacebook}
              >
                <img
                  src={facebookLogo}
                  alt='google logo'
                  width='50'
                  height='50'
                />
                <div>Log in with Facebook</div>
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
