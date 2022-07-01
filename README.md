# odin_javascript_12_mmdb

[Live Site](https://mmdb-97518.web.app)

This app showcases my skills in developing responsive, interactive and visually engaging web application using HTML, CSS and ReactJS.

MMDB is a movie entertainment database where users can look up, review, and save custom movie lists from approximately 775,600 titles. These are features which are typical of video streaming sites. The movie information was obtained by consuming the [TMDB API](https://www.developers.themoviedb.org). 

A significant portion of the development effort was placed on implementing back end features for logged in users. These include the ability to submit or edit movie reviews and saving custom movie lists using the Firebase SDK. Each review submission affects the total combined score calculated with data obtained from the TMDB api. Each movie review submitted is made public to all visitors to that particular movie page.

A key lesson leraned from this exercise is the importance of planning out robust back end data structures to facilitate all desired features including those that haven't yet been realized. For this particular case, separate data collections were required for each authenticated user to enable review editing, as well as for each reviewed movie so that all reviews for that particular movie can be displayed on its page. 

<hr/>

### Focus Areas

- React Context API.
- Firebase SDK for user authentication and database operations.
- Requesting and upacking JSON data from themoviedb.org API.
- Responsive CSS for proper look and feel across all devices.
- User interface design and wireframing.

### Tools 

- React: router, context API.
- Firebase: authentication, database, hosting.
- Google and Facebook developer tools, authentication tokens.
- Vanilla CSS.



### Acknowledgements

[The Odin Project](https://www.theodinproject.com/)

### License

[ISC](https://opensource.org/licenses/ISC)
