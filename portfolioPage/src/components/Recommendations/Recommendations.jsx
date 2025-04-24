import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getRecommendations } from "../../redux/features/recommendations/recommendationsSlice"

import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import posterPlaceholder from "../../assets/images/poster.webp"

import "./Recommendations.css"

function Recommendations({ id, setShowVideo }) {
  const dispatch = useDispatch()
  const language = useSelector((state) => state.navigationBarReducer.language)
  const recommendations = useSelector((state) => state.recommendationsReducer.recommendations)
  const loading_recommendations = useSelector((state) => state.recommendationsReducer.loading)
  const loading_images = useSelector((state) => state.imagesReducer.loading)
  const loading_credits = useSelector((state) => state.creditsReducer.loading)
  const loading_movie = useSelector((state) => state.movieReducer.loading)

  useEffect(() => {
    dispatch(getRecommendations(id))
  }, [dispatch, id])

  function handleClick() {
    window.scrollTo(0, 0)
    if (setShowVideo) setShowVideo(false)
  }

  if (loading_recommendations || loading_images || loading_credits || loading_movie) return null

  return (
    <div className="recommendations-container">
      <h3>{language === "en-US" ? "Recommendations" : "Tavsiyeler"}</h3>
      {recommendations.length > 0 ? (
        <div className="row">
          {recommendations.map((rec) => (
            <div key={rec.id} className="col-6 mb-3 position-relative">
              <Link
                to={`/movie/${rec.id}-${rec.title?.replaceAll(" ", "-").toLowerCase()}`}
                onClick={handleClick}
              >
                <LazyLoadImage
                  className="img"
                  src={`https://image.tmdb.org/t/p/w250_and_h141_face/${rec.backdrop_path}`}
                  alt={`${rec.title} background`}
                  placeholderSrc={posterPlaceholder}
                  effect="blur"
                  width="100%"
                  height="auto"
                  style={{ aspectRatio: 3 / 2 }}
                />
              </Link>
              <div className="position-absolute recommendation-title fw-bold">{rec.title}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-secondary">
          <p>
            {language === "en-US"
              ? "There are no recommendations for this movie."
              : "Bu film için tavsiye yok."}
          </p>
        </div>
      )}
    </div>
  )
}

export default Recommendations