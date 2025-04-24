import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/features/movies/moviesSlice";
import { Link } from "react-router-dom";

import Loading from "../Loading/Loading";
import ExtraInformations from "../ExtraInformations";
import ZeroMovie from "../ZeroMovie";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../../assets/images/poster.webp";

import "./Movies.css";
import * as Functions from "../../localStorage/localStorage";

function Movies() {
    const dispatch = useDispatch();

    const which_movies = useSelector((state) => state.navigationBarReducer.which_movies);
    let movies = useSelector((state) => state.moviesReducer.movies);

    const [prevWhichMovies, setPrevWhichMovies] = useState(Functions.fetchWhichMovies());

    useEffect(() => {
        if (prevWhichMovies !== which_movies || movies.length === 0) {
            dispatch(getMovies({ endpoint: which_movies }));
            setPrevWhichMovies(which_movies);
        }
    }, [dispatch, which_movies, prevWhichMovies, movies.length]);

    const loading_movies = useSelector((state) => state.moviesReducer.loading);
    const sorted_by = useSelector((state) => state.navigationBarReducer.sorted_by);
    const input = useSelector((state) => state.navigationBarReducer.input);

    movies = movies
        .filter(movie => movie.poster_path)
        .sort((a, b) => {
            if (sorted_by === "descending") {
                return b.vote_average - a.vote_average;
            } else if (sorted_by === "ascending") {
                return a.vote_average - b.vote_average;
            }
            return 0;
        });

    // Helper function for headline
    const getHeading = () => {
        if (which_movies === "top_rated") return "Top Rated Movies";
        if (which_movies === "popular") return "Popular Movies";
        if (which_movies === "upcoming") return "Upcoming Movies";
        if (which_movies === "now_playing") return "Now Playing Movies";
        return "";
    };

    return (
        <div className="bg position-relative">
            <div className="container position-relative">
                {(input.length > 0 && movies.length === 0) && <ZeroMovie />}
                {loading_movies ? (
                    <Loading />
                ) : (
                    <>
                        {getHeading() && movies.length !== 0 && (
                            <h3 className="which-movies">{getHeading()}</h3>
                        )}

                        {(input === "" && movies.length > 0) && <ExtraInformations />}

                        <div className="movies-container">
                            <div className="row">
                                {movies.map((movie, index) => (
                                    <div key={index} className="movie col-4 col-md-3 col-xl-2">
                                        <Link to={`movie/${movie.id}-${movie.title?.replaceAll(" ", "-").toLowerCase()}`} onClick={() => window.scrollTo(0, 0)}>
                                            <div className="img">
                                                <LazyLoadImage
                                                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                                                    alt={`${movie.title} poster image`}
                                                    placeholderSrc={posterPlaceholder}
                                                    effect="blur"
                                                    width="100%"
                                                    height="auto"
                                                    style={{ color: "white", borderRadius: "0.5rem", aspectRatio: 3 / 5 }}
                                                />
                                            </div>
                                        </Link>

                                        {movie.vote_average === 0 ? (
                                            <div className="imdb-rating" style={{ color: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <span style={{ fontSize: "12px" }}>⭐ Rating:</span>
                                                <span>NR</span>
                                            </div>
                                        ) : (
                                            <div className="imdb-rating" style={{ color: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <span style={{ fontSize: "12px" }}>⭐ Rating:</span>
                                                <span>{movie.vote_average.toFixed(1)}</span>
                                            </div>
                                        )}
                                        <div className="title" style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0px" }}>
                                            <p style={{ fontWeight: "bold", fontSize: "15px" }}>{movie.title}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Movies;