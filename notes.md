### ToDo:

Logged in users can add reviews to a movie: on movie page, make the ratings into a button. On click, if logged in, it opens a form with a star selector (1-10) and text input, else, alert to log in.
We'll start a new firestore collection called "Reviews".
On submitting the review, a review object like {stars: '7.5', review: 'I liked it'} goes into the "Reviews" collection > doc id: movie id > reviews: array[review objects...]. The movie page, on mount will read all review objects for that movie and display it. The review section will also update itself after someone submits a review.

Replace imdb actor link with tmdb one

### Firebase url:

https://mmdb-97518.web.app

### CLI commands

npm run deploy && npm run git '<m>'

package.js scripts setup:

```
"scripts": {
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject",
"git": "git add -A && git commit -m",
"postgit": "git push origin main",
"predeploy": "npm run build",
"deploy": "firebase deploy"
}
```

The following cli commands:
npm run build && firebase deploy && git add -A && git commit -m <msg> && git push origin main

can be reduced to:
npm run deploy && npm run git '<m>'

### TMDB API Documentation

https://developers.themoviedb.org/3/getting-started/introduction

### How to set up Firebase backend for this app:

1. Sign in to firebase.google.com and create a new project. Do not enable analytics for this project.
2. Click the web tag icon </> to register a web app in the new project, and check the box ‘Also set up Firebase Hosting for this app’
3. Now firebase will show you your project's unique config object that looks like below. Paste it somewhere in your in your CRA project's root component like App.js or in a separate file called firebaseConfig.js and use it by exporting/importing it. The firebase webpage will then show a list of steps to do next, but ignore these for now. We’ll complete them in a different order as we go through the steps below:
   const config = {
   apiKey: 'AIzaSyCpi0KMk3uxJQOZCpQdXGrwIWRLtYj8uNI',
   authDomain: 'friendlychat-76d8e.firebaseapp.com',
   projectId: 'friendlychat-76d8e',
   storageBucket: 'friendlychat-76d8e.appspot.com',
   messagingSenderId: '638858031859',
   appId: '1:638858031859:web:bccf0ab7669ed7946a7d86',
   };
4. Configure the authentication providers: In the Build section at the left panel of Firebase console, click Authentication, then click the Sign-in method tab. Enable the sign-in providers you want to use for your site.
5. a) To configure fb auth, go to https://developers.facebook.com/ and go to my apps > create app > (create an app with the same name as your project). In the new app's settings, copy the app id and secret. In your firebase project dashboard, go to authentication > sign-in method > facebook and paste the fb app id and secret where it asks for those values. On that same page, copy the OAuth redirect URI (i.e. It looks like this: https://mmdb-5e9fd.firebaseapp.com/__/auth/handler) and go to your FB Developers dashboard, goto Facebook Login > settings > and paste the URI into the field labeled: 'Valid OAuth Redirect URIs' and save.
6. Enable Firestore database to save JSON data collections for each user: In the Build section at the left panel, click Firestore Database. Click Create. Select "Start in test mode" so we can freely write to the database during development. Select your region.
7. Install the Firebase command-line interface:
   npm -g install firebase-tools
8. Verify firebase cli has been installed by checking the version is 4.1.0 or later, and log into firebase from your cli
   firebase --version
   firebase login
9. Initialize firebase: run 'firebase init' or ‘firebase init hosting’ or ‘firebase init firestore’. The latter will try to insert a copy of the online firestore rules file in your local directory and a firestore.indexes.json, which is required to sync your local project with firestore. Just press enter/yes to both queries.
10. Hosting: Firebase will want access to the hosting configuration from your local directory. To allow this, sync your local app with Firebase hosting by running the below command. This will prompt you to select your Project ID and give your project an alias. An alias is useful when you have multiple environments like production, staging, etc. Just use a general alias of 'default' in this case. Follow remaining instructions on the command line. Note that you want the root folder to be the "build" folder that is created by webpack after running"npm run build", and for CRA project, you want to firebase to host a single page application that only loads the index.html file.
    firebase use --add
11. Install Firebase SDK locally: Run the below command and then use webpack to import, only the required SDK functions into individual js files for speed.
    npm install firebase
12. Initialize Firebase at the root component of your app such as in App.js:
    import { initializeApp } from 'firebase/app';
    const firebaseConfig = {
    apiKey: 'AIzaSyCpi0KMk3uxJQOZCpQdXGrwIWRLtYj8uNI',
    authDomain: 'friendlychat-76d8e.firebaseapp.com',
    projectId: 'friendlychat-76d8e',
    storageBucket: 'friendlychat-76d8e.appspot.com',
    messagingSenderId: '638858031859',
    appId: '1:638858031859:web:bccf0ab7669ed7946a7d86',
    };
    initializeApp(firebaseConfig);

### How to set use the Context API in React

Let's say you want to pass props from App.js to any of its descendent components. Then create a file called AppContext.js somewhere in your /src with the following 2 line of code (only):

```
import { createContext } from 'react';
export const AppContext = createContext('initialDummyValue');
```

(make a separate folder for this file if you plan to have more than one context)

Next, in App.js, at the top, import the previous file:
import { AppContext } from './components/contexts/AppContext';
Declare whatever data and functions you want to pass from App.js, group them all into an object, and assign that object to a state:

```
const useState[myAppContext, setMyAppContext] = useState();
function propX(){
  //function contents
}
const propY = 'hello';
setMyAppContext({propX, propY});
```

Still in App.js, use the imported AppContext.Provider tag with a 'value' attribute equal to the above myAppContext state. Then any component that is rendered inside of this tag and any of their descendents will all have access to {propX, propY}.
<AppContext.Provider value={myAppContext}>...</AppContext.Provider>
You'll typically wrap <AppContext.Provider> around the entire react-router-dom Router tree to allow every page component access myAppContext. Or you can wrap it around only certain things.

For a descendent component to use the context, import:

```
import { AppContext } from './contexts/AppContext';
import {useContext } from 'react';
```

Then in the main export function or elsewhere write:

```
const myAppContext = useContext(AppContext);
```

and now you can use propX function from App.js as `myAppContext.propX()`
