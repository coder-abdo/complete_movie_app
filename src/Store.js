import { thunk, action } from "easy-peasy";
const Store = {
  movies: [],
  fetchMovies: thunk(async actions => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?%20%E2%86%B5%20sort_by=popularity.desc?&api_key=8faffe2b11317eeda1282b4016cb1e06"
    );
    const movies = await data.json();
    actions.setMovies(movies.results);
  }),
  setMovies: action((state, movies) => {
    state.movies = movies;
  })
};
export default Store;
