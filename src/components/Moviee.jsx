import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
const Moviee = props => {
  const [Style, set] = useSpring(() => ({
    opacity: 0,
    transform: "scale(1.1)"
  }));
  //console.log(typeof +props.match.params.id);
  const [moviee, setMoviee] = useState({});
  const [cast, setCast] = useState([]);
  const FetchCast = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${
        props.match.params.id
      }/casts?api_key=8faffe2b11317eeda1282b4016cb1e06`
    );
    const casts = await data.json();
    setCast(casts.cast);
  };
  const FetchMovieDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${
        props.match.params.id
      }?api_key=8faffe2b11317eeda1282b4016cb1e06`
    );
    const movie = await data.json();
    setMoviee(movie);
  };
  useEffect(() => {
    FetchMovieDetails();
    FetchCast();
    //eslint-disable-next-line
  }, []);
  const {
    backdrop_path,
    original_title: title,
    overview,
    vote_average,
    release_date,
    genres
  } = moviee;
  return (
    <animated.div
      style={Style}
      className="container py-5"
      onLoad={() => set({ opacity: 1, transform: "scale(1)" })}
    >
      <div className="card">
        <img
          style={{ objectFit: "cover", height: "500px" }}
          src={
            backdrop_path
              ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
              : "https://via.placeholder.com/500"
          }
          alt={title}
        />
        <div className="card-body">
          <h4 className="card-title text-danger">{title}</h4>
          <p className="card-text">{overview}</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-primary text-capitalize">
            average vote: {vote_average}
          </li>
          <li className="list-group-item text-primary text-capitalize">
            release date: {release_date}
          </li>
          <li className="list-group-item text-primary text-capitalize">
            genres:{" "}
            {genres &&
              genres.map(genre => (
                <span
                  style={{ marginLeft: "5px" }}
                  key={genre.id}
                  className="badge badge-warning rounded"
                >
                  {genre.name}
                </span>
              ))}
          </li>
        </ul>
        <h2 style={{ textAlign: "center" }}>Cast</h2>
        <ul className="cast">
          {cast &&
            cast.map(({ id, name, profile_path: image }) => {
              return (
                <li key={id} className=" text-secondary text-capitalize">
                  <img
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover"
                    }}
                    className="rounded img-thumbnail"
                    src={
                      image
                        ? `https://image.tmdb.org/t/p/w500/${image}`
                        : "https://image.flaticon.com/icons/png/512/63/63699.png"
                    }
                    alt={name}
                  />
                  <h3>{name}</h3>
                </li>
              );
            })}
        </ul>
        <Link className="list-group-item text-success text-capitalize" to="/">
          Back To Movies
        </Link>
      </div>
    </animated.div>
  );
};
export default Moviee;

/*
adult: false
backdrop_path: "/phxiKFDvPeQj4AbkvJLmuZEieDU.jpg"
belongs_to_collection: null
budget: 200000000
genres: [{id: 878, name: "Science Fiction"}, {id: 28, name: "Action"}]
homepage: "http://darkphoenix.com"
id: 320288
imdb_id: "tt6565702"
original_language: "en"
original_title: "Dark Phoenix"
overview: "The X-Men face their most formidable and powerful foe when one of their own, Jean Grey, starts to spiral out of control. During a rescue mission in outer space, Jean is nearly killed when she's hit by a mysterious cosmic force. Once she returns home, this force not only makes her infinitely more powerful, but far more unstable. The X-Men must now band together to save her soul and battle aliens that want to use Grey's new abilities to rule the galaxy."
popularity: 261.976
poster_path: "/kZv92eTc0Gg3mKxqjjDAM73z9cy.jpg"
production_companies:  [
{id: 431, logo_path: null, name: "The Donners' Company", origin_country: "US"}
,{id: 25, logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png", name: "20th Century Fox", origin_country: "US"}
,{id: 28788, logo_path: null, name: "Genre Films", origin_country: "US"}
,{id: 9168, logo_path: "/hQNXrYIuyLRxMSBuGHk0GX7CCBS.png", name: "Bad Hat Harry Productions", origin_country: "US"}
,{id: 7505, logo_path: "/837VMM4wOkODc1idNxGT0KQJlej.png", name: "Marvel Entertainment", origin_country: "US"}, {id: 112049, logo_path: null, name: "Kinberg Genre", origin_country: ""}]
production_countries: [{iso_3166_1: "US", name: "United States of America"}]
release_date: "2019-06-05"
revenue: 0
runtime: 114
spoken_languages: (2) [{…}, {…}]
status: "Released"
tagline: "The phoenix will rise"
title: "Dark Phoenix"
video: false
vote_average: 6.2
vote_count: 737

*/
// Finding Crew & Casts
//"https://api.themoviedb.org/3/movie/532321/casts?api_key=8faffe2b11317eeda1282b4016cb1e06"
