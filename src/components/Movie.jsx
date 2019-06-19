import React from "react";
import { Link } from "react-router-dom";
const Movie = ({
  title,
  id,
  vote_average,
  poster_path,
  overview,
  release_date
}) => {
  // console.log(id);
  return (
    <div className="card">
      <img
        style={{ objectFit: "cover" }}
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt={title}
      />
      <div className="card-body">
        <h4 className="card-title text-danger">{title}</h4>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item text-success text-capitalize">
          average vote: {vote_average}
        </li>
        <li className="list-group-item text-success text-capitalize">
          release date: {release_date}
        </li>
        <Link
          className="list-group-item text-success text-capitalize"
          to={`/${id}`}
        >
          View Full Details
        </Link>
      </ul>
    </div>
  );
};

export default Movie;
