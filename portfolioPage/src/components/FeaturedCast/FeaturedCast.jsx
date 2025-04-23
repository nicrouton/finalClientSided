import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCredits } from "../../redux/features/credits/credits";

function FeaturedCast({ id }) {
  const dispatch = useDispatch();
  const credits = useSelector((state) => state.creditsReducer.credits);

  useEffect(() => {
    const numericId = id.split("-")[0]; // Extract only the number
    dispatch(getCredits(numericId));
  }, [dispatch, id]);

  if (!credits) {
    return <div>Loading credits...</div>;
  }

  return (
    <div className="container my-5">
      <h3 className="text-white">Featured Cast</h3>
      <div className="row">
        {credits.cast?.slice(0, 6).map((actor, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-2 text-center">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={actor.name}
              className="img-fluid rounded"
            />
            <p style={{ marginTop: "5px", fontSize: "14px", color: "white" }}>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCast;
