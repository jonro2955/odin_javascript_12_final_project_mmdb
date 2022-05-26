TMDB API Documentation home: https://developers.themoviedb.org/3/getting-started/introduction

List request format: https://api.themoviedb.org/3/movie/{list_name}?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1

Movie details: https://api.themoviedb.org/3/movie/{movie_id}?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US

Movie poster image: https://image.tmdb.org/t/p/original/{the_poster_path}

Cast: https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US

Recommended movies for a movie: https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1

Using the movie ID, You can also request: reviews for a movie,
similar movies, lists the movie belings to, and even post your own review of it into TMDB.

To get the official trailer youtube url, use the movie ID to get the "official Trailer" "key" from
https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US
Then access the "official Trailer" key from the resulting json object and put the key into: https://www.youtube.com/watch?v={key}

const tmdbAPIKey = 'ee3bf23ca6ee40ece5d8b91daed50a29';




### Next:

On movie page, display all cast in a new ActorCard, and put them in a carousel. Rename Card to MovieCard. 

In App.js, fetch user's firestore data and pass it to homepage as a prop, then use that to make user lists appear in homepage.

Change Profile link to Login. When user loggs in, make it appear as Profile.

Allow user to toggle homepage user lists on or off in account settings page. Also Make it so that in the settings you can make move sub list divs up and down to change their order. This can probably be done through using js to change css grid props, and then save and load these props into and from firestore.

Make sure to attribute flaticons and API providers

### react-router-dom

npm install react-router-dom

### How to set up Firebase backend for this app:

1. Sign in to firebase.google.com and create a new project.
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
5. Enable Firestore database to save JSON data collections for each user: In the Build section at the left panel, click Firestore Database. Click Create. Select "Start in test mode" so we can freely write to the database during development. Select your region.
6. Install the Firebase command-line interface:
   npm -g install firebase-tools
7. Verify firebase cli has been installed by checking the version is 4.1.0 or later, and log into firebase from your cli
   firebase --version
   firebase login
8. Initialize firebase: run 'firebase init' or ‘firebase init hosting’ or ‘firebase init firestore’. The latter will try to insert a copy of the online firestore rules file in your local directory and a firestore.indexes.json, which is required to sync your local project with firestore. Just press enter/yes to both queries.
9. Hosting: Firebase will want access to the hosting configuration from your local directory. To allow this, sync your local app with Firebase hosting by running the below command. This will prompt you to select your Project ID and give your project an alias. An alias is useful when you have multiple environments like production, staging, etc. Just use a general alias of 'default' in this case. Follow remaining instructions on the command line.
   firebase use --add
10. Install Firebase SDK locally: Run the below command and then use webpack to import, only the required SDK functions into individual js files for speed.
    npm install firebase
11. Initialize Firebase at the root component of your app such as in App.js:
    import { initializeApp } from 'firebase/app';
    const config = {
    apiKey: 'AIzaSyCpi0KMk3uxJQOZCpQdXGrwIWRLtYj8uNI',
    authDomain: 'friendlychat-76d8e.firebaseapp.com',
    projectId: 'friendlychat-76d8e',
    storageBucket: 'friendlychat-76d8e.appspot.com',
    messagingSenderId: '638858031859',
    appId: '1:638858031859:web:bccf0ab7669ed7946a7d86',
    };
    initializeApp(config);

### To deploy your site to Firebase hosting:

1. Run 'npm run build' to update the contents of the /build output folder with webpack-bundled code containing the recent changes.
2. Run 'firebase deploy' to replace the currently hosted files in firebase with the new /build folder files. Hosted site url: https://mmdb-5e9fd.web.app/
