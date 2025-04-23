import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendations } from "../../redux/features/recommendations/recommendationsSlice";
import { Link } from "react-router-dom";

function Recommendations({ id, setShowVideo }) {
  const dispatch = useDispatch();
  const recommendations = useSelector((state) => state.recommendationsReducer.recommendations);

  useEffect(() => {
    dispatch(getRecommendations(id));
  }, [dispatch, id]);

  return (
    <div className="recommendations my-4">
      <h3 className="mb-3">Recommended</h3>
      {Array.isArray(recommendations) && recommendations.length > 0 ? (
        recommendations.map((movie, index) => (
          <Link
            key={index}
            to={`/movie/${movie.id}-${movie.title.replaceAll(" ", "-").toLowerCase()}`}
            className="text-decoration-none text-white"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="mb-3 d-flex align-items-center">
              <img
                src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "50px", height: "75px", borderRadius: "8px", marginRight: "10px" }}
              />
              <p className="m-0">{movie.title}</p>
            </div>
          </Link>
        ))
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
}

export default Recommendations;