### Next:

Make list creator and movie adder dsappear when clicking outside

When you click outside of the search input box or the search results window, toggle the search result window off.

show notification when a movie or list is successfully added/created. If a duplicate entry is not added, notify.


Get search up. Search api request: `https://api.themoviedb.org/3/search/movie?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&query=${search}` Replace ${search} with the search input string. Render the resulting data onto

User can add a rating to TMDB

Attribute flaticons and API providers

Add director's name and info on the movie page

Incorporate typescript or declare types with proptypes

styled components

Higher-order Components

https://www.theodinproject.com/lessons/node-path-javascript-advanced-concepts

Complete readme thoroughly

Save notes in a separate file and gitignore it

mobile view styling

### CLI commands

npm run deploy && npm run git <msg>
===
npm run build && firebase deploy && git add -A && git commit -m <msg> && git push origin main

https://mmdb-97518.web.app

### TMDB API

TMDB API Documentation home: https://developers.themoviedb.org/3/getting-started/introduction

My TMDB API Key = ee3bf23ca6ee40ece5d8b91daed50a29

Sonic movie id: 675353

Movie list request format: https://api.themoviedb.org/3/movie/{list_name}?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1

Movie details: https://api.themoviedb.org/3/movie/{movie_id}?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US

Movie poster image: https://image.tmdb.org/t/p/original/{the_poster_path}

Cast: https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US

Recommended movies: https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1

Using the movie ID, You can also request: reviews for a movie,
similar movies, lists the movie belings to, and even post your own review of it into TMDB.

To embed the official trailer onto a page, use the movie ID to get the "official Trailer" "key" from
https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US
Then, access the "official Trailer" key from the resulting json object (there can be many keys) and put the key into: https://www.youtube.com/watch?v={key}.
Then, use the youtube url as the src attribute inside of an <iframe> tag.

### react-router-dom

npm install react-router-dom

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
