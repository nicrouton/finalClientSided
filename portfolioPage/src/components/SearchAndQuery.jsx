import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loading from "./Loading/Loading";
import ZeroMovie from "./ZeroMovie";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../assets/images/poster.webp";

import "./Movies/Movies.css";

function SearchAndQuery() {
  const { movies: searched_movies = [], loading: loading_searched_movies } =
    useSelector((state) => state.searchAndQueryReducer);

  const filtered_movies = useMemo(() => {
    return Array.isArray(searched_movies)
      ? searched_movies.filter((movie) => movie.poster_path)
      : [];
  }, [searched_movies]);

  return (
    <div className="bg container" style={{ marginTop: filtered_movies.length > 0 && "100px" }}>
      {filtered_movies.length === 0 && !loading_searched_movies && <ZeroMovie />}
      {loading_searched_movies ? (
        <Loading />
      ) : (
        <div className="movies-container">
          <div className="row">
            {filtered_movies.map((movie, index) => (
              <div key={index} className="movie col-4 col-md-3 col-xl-2">
                <Link
                  to={`/movie/${movie.id}-${movie.title?.replaceAll(" ", "-").toLowerCase()}`}
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="img">
                    <LazyLoadImage
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                      alt={movie.title + " poster image"}
                      placeholderSrc={posterPlaceholder}
                      effect="blur"
                      width="100%"
                      height="auto"
                      style={{ borderRadius: "0.5rem", aspectRatio: 3 / 5 }}
                    />
                  </div>
                </Link>

                <div
                  className="imdb-rating"
                  style={{ color: movie.vote_average === 0 ? "#ffffff99" : undefined }}
                >
                  <i className="bi bi-star-fill bs-star-icon"></i>
                  <span>
                    {movie.vote_average === 0 ? "NR" : movie.vote_average?.toFixed(1)}
                  </span>
                </div>

                <div className="title">{movie.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchAndQuery;