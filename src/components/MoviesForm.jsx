import React, { useState, useEffect } from "react";
import { useStoreActions } from "easy-peasy";
const MoviesForm = () => {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("john wick");
  const SetMovies = useStoreActions(actions => actions.setMovies);
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  const searchMovies = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&page=1&language=en-US&api_key=8faffe2b11317eeda1282b4016cb1e06`
    );
    const res = await data.json();
    SetMovies(res.results);
  };
  useEffect(() => {
    searchMovies();
    // eslint-disable-next-line
  }, [query]);
  return (
    <form onSubmit={handleSubmit} className="sticky-search">
      <div className="form-group d-flex shadowing rounded">
        <input
          className="form-control"
          type="text"
          placeholder="Search Your Fav Movies"
          onChange={handleChange}
          value={search}
        />
        <button type="submit" className="btn btn-info">
          Search
        </button>
      </div>
    </form>
  );
};
export default MoviesForm;
