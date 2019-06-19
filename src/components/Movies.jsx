import React, { useEffect, lazy, Suspense } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useSpring, animated } from "react-spring";
const Movie = lazy(() => import("./Movie"));
const Spinner = () => (
  <div className="spinner-border text-primary mx-auto" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);
const Movies = () => {
  const [Style, set] = useSpring(() => ({
    opacity: 0,
    transform: "scale(1.1)"
  }));
  const movies = useStoreState(state => state.movies);
  const fetchMovies = useStoreActions(actions => actions.fetchMovies);
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);
  return (
    <Suspense fallback={Spinner}>
      {movies.length === 0 ? (
        <div>Results Not Found</div>
      ) : (
        <animated.div
          style={Style}
          onLoad={() => set({ opacity: 1, transform: "scale(1)" })}
          className="movies"
        >
          {movies.map(movie => {
            const {
              id,
              title,
              vote_average,
              poster_path,
              overview,
              release_date
            } = movie;
            return (
              <Movie
                key={id}
                id={id}
                title={title}
                vote_average={vote_average}
                poster_path={poster_path}
                overview={overview}
                release_date={release_date}
              />
            );
          })}
        </animated.div>
      )}
    </Suspense>
  );
};
export default Movies;
