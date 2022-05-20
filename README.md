/*
TMDB: 'ee3bf23ca6ee40ece5d8b91daed50a29'

Documentation home: https://developers.themoviedb.org/3/getting-started/introduction

Image request rules: https://developers.themoviedb.org/3/getting-started/images
Image request format: https://image.tmdb.org/t/p/original/{the_poster_path}

Cast info: Cast names are not provided in movie list packets. 
But you can get cast info for specific movie ids that you obtain from the lists. 
See https://developers.themoviedb.org/3/movies/get-movie-credits

Get a list of recommended movies for a movie id: 
https://developers.themoviedb.org/3/movies/get-movie-recommendations

Using movie ids, You can also request info like reviews for a movie, 
similar movies, lists a movie belings to,
recommendations, and even post your own review into TMDB.

Get the official youtube trailer url: Get the "official Trailer" "key" from
https://developers.themoviedb.org/3/movies/get-movie-videos (make sure to access
the "official Trailer" key as there are many other keys. And put the key into
this url https://www.youtube.com/watch?v={key}.



const tmdbAPIKey = 'ee3bf23ca6ee40ece5d8b91daed50a29';

https://api.themoviedb.org/3/movie/popular?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1

let mostPopular = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
      genre_ids: [28, 878, 35, 10751, 12],
      id: 675353,
      original_language: 'en',
      original_title: 'Sonic the Hedgehog 2',
      overview:
        'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
      popularity: 10050.323,
      poster_path: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
      release_date: '2022-03-30',
      title: 'Sonic the Hedgehog 2',
      video: false,
      vote_average: 7.7,
      vote_count: 1222,
    },
  ],
  total_pages: 33530,
  total_results: 670593,
};

//https://api.themoviedb.org/3/movie/now_playing?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1
let nowPlaying = {
  dates: { maximum: '2022-05-18', minimum: '2022-03-31' },
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
      genre_ids: [28, 878, 35, 10751, 12],
      id: 675353,
      original_language: 'en',
      original_title: 'Sonic the Hedgehog 2',
      overview:
        'After settling in Green Hills, Sonic is eager to prove he has what it takes to be a true hero. His test comes when Dr. Robotnik returns, this time with a new partner, Knuckles, in search for an emerald that has the power to destroy civilizations. Sonic teams up with his own sidekick, Tails, and together they embark on a globe-trotting journey to find the emerald before it falls into the wrong hands.',
      popularity: 10050.323,
      poster_path: '/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg',
      release_date: '2022-03-30',
      title: 'Sonic the Hedgehog 2',
      video: false,
      vote_average: 7.7,
      vote_count: 1222,
    },
  ],
  total_pages: 67,
  total_results: 1324,
};

//https://api.themoviedb.org/3/movie/top_rated?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1
let topRated = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/iNh3BivHyg5sQRPP1KOkzguEX0H.jpg',
      genre_ids: [18, 80],
      id: 278,
      original_language: 'en',
      original_title: 'The Shawshank Redemption',
      overview:
        'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.',
      popularity: 63.965,
      poster_path: '/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      release_date: '1994-09-23',
      title: 'The Shawshank Redemption',
      video: false,
      vote_average: 8.7,
      vote_count: 21381,
    },
  ],
  total_pages: 498,
  total_results: 9942,
};

//https://api.themoviedb.org/3/movie/upcoming?api_key=ee3bf23ca6ee40ece5d8b91daed50a29&language=en-US&page=1
let comingSoon = {
  dates: { maximum: '2022-06-07', minimum: '2022-05-19' },
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/2n95p9isIi1LYTscTcGytlI4zYd.jpg',
      genre_ids: [18, 53, 80],
      id: 799876,
      original_language: 'en',
      original_title: 'The Outfit',
      overview:
        'Leonard is an English tailor who used to craft suits on London’s world-famous Savile Row. After a personal tragedy, he’s ended up in Chicago, operating a small tailor shop in a rough part of town where he makes beautiful clothes for the only people around who can afford them: a family of vicious gangsters.',
      popularity: 1732.509,
      poster_path: '/lZa5EB6PVJBT5mxhgZS5ftqdAm6.jpg',
      release_date: '2022-02-25',
      title: 'The Outfit',
      video: false,
      vote_average: 7,
      vote_count: 191,
    },
  ],
  total_pages: 15,
  total_results: 293,
};

let cast = {
  id: 675353,
  cast: [
    {
      adult: false,
      gender: 2,
      id: 222121,
      known_for_department: 'Acting',
      name: 'Ben Schwartz',
      original_name: 'Ben Schwartz',
      popularity: 16.204,
      profile_path: '/5vV52TSEIhe4ZZLWwv3i7nfv8we.jpg',
      cast_id: 1,
      character: 'Sonic the Hedgehog (voice)',
      credit_id: '5e4fc66735811d001952f273',
      order: 0,
    },
    {
      adult: false,
      gender: 2,
      id: 17605,
      known_for_department: 'Acting',
      name: 'Idris Elba',
      original_name: 'Idris Elba',
      popularity: 19.854,
      profile_path: '/be1bVF7qGX91a6c5WeRPs5pKXln.jpg',
      cast_id: 27,
      character: 'Knuckles the Echidna (voice)',
      credit_id: '6112d21db046050045900a8f',
      order: 1,
    },
  ],
};


### Next:

Set up HomePage card rows using the fetched data with fields:
Popular: title, year, image, cast, video, rating
comingSoon: title, releaseDate, image, cast, video
boxOffice: title, year, image, worldwide gross in $billion
topRated: title, year, image, cast, imdbRating

In App.js, fetch user's firestore data and pass it to homepage as a prop, then use that to make user lists appear in homepage.

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


