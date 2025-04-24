import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { getMovieAndReviews } from "../../redux/features/movie/movieSlice";
import { getVideo } from "../../redux/features/video/videoSlice";

import Loading from "../Loading/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../../assets/images/poster.webp";

import "./Movie.css";

function Movie({ id, showVideo, setShowVideo, videoClick }) {
  const dispatch = useDispatch();
  const movieId = id.split("-")[0];

  const movie = useSelector((state) => state.movieReducer.movie);
  const loading = useSelector((state) => state.movieReducer.loading);
  const credits = useSelector((state) => state.creditsReducer.credits);
  const crew = useMemo(() => credits?.crew || [], [credits]);

  useEffect(() => {
    dispatch(getMovieAndReviews({ id: movieId, language: "en-US" }));
    if (showVideo) dispatch(getVideo({ id: movieId, language: "en-US" }));
  }, [dispatch, movieId, showVideo]);

  useEffect(() => {
    if (!loading && movie?.title) {
      document.title = `${movie.title} | WatchClub`;
    }
    return () => {
      document.title = "WatchClub | Homepage";
    };
  }, [loading, movie]);

  const formatRuntime = (runtime) => {
    if (!runtime || isNaN(runtime)) return "N/A";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const director = crew.find((c) => c.job === "Director");
  const novelist = crew.find((c) => c.job === "Novel");

  if (loading || !movie.title) return <Loading />;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={movie.overview || `Learn more about ${movie.title}`}
        />
        <style>{`
          .movie-container::before {
            background-image: url("https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop_path}");
          }
        `}</style>
      </Helmet>

      <div className="movie-container">
        <div className="react-bs-container container px-md-3">
          <div className="flex-item">
            <div className="img">
              <LazyLoadImage
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={`${movie.title} poster`}
                placeholderSrc={posterPlaceholder}
                effect="blur"
                width="100%"
                height="100%"
                style={{ borderRadius: "0.5rem" }}
              />
            </div>
          </div>

          <div className="flex-item second">
            <div className="title-and-release-date-container">
              <span className="title">{movie.title}</span>
              <span className="release-date">
                ({movie.release_date?.slice(0, 4)})
              </span>
            </div>

            <div className="genres-and-runtime">
              {movie.genres?.length > 0 && (
                <>
                  <span>• </span>
                  {movie.genres.map((genre, index) => (
                    <span key={genre.id}>
                      {genre.name}
                      {index < movie.genres.length - 1 && ", "}
                    </span>
                  ))}
                </>
              )}
              {movie.runtime > 0 && (
                <span className="runtime"> • {formatRuntime(movie.runtime)}</span>
              )}
            </div>

            <div className="rating-and-video-container">
              <span className="imdb-rating">
                <i className="bi bi-star-fill bs-star-icon"></i>
                <span>
                  {movie.vote_average && movie.vote_average > 0
                    ? movie.vote_average.toFixed(1)
                    : "NR"}
                </span>
              </span>

              <span className="watch-video" onClick={() => {
                setShowVideo(true);
                videoClick();
              }}>
                ▶ Play Video
              </span>
            </div>

            {movie.tagline && (
              <div className="tagline">
                <p>{movie.tagline}</p>
              </div>
            )}

            <div className="summary">
              <p>Overview</p>
            </div>
            <div className="overview">
              <p>{movie.overview || "We don't have an overview translated in English."}</p>
            </div>

            <div className="d-flex gap-2 gap-md-4 flex-wrap mt-3">
              {director && (
                <div>
                  <div className="top">Director</div>
                  <div className="bottom">{director.name}</div>
                </div>
              )}
              {novelist && (
                <div>
                  <div className="top">Novel</div>
                  <div className="bottom">{novelist.name}</div>
                </div>
              )}
              {movie.budget > 0 && (
                <div>
                  <div className="top">Budget</div>
                  <div className="bottom">
                    ${movie.budget.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              )}
              {movie.revenue > 0 && (
                <div>
                  <div className="top">Revenue</div>
                  <div className="bottom">
                    ${movie.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;