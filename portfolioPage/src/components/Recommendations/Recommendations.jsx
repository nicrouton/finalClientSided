import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getRecommendations } from "../../redux/features/recommendations/recommendationsSlice";

import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import posterPlaceholder from "../../assets/images/poster.webp";

import "./Recommendations.css";

function Recommendations(props) {

    const dispatch = useDispatch()

    const language = useSelector((state) => state.navigationBarReducer.language)

    useEffect(() => {
        dispatch((getRecommendations(props.id)))
    }, [dispatch, props.id])

    const recommendations = useSelector((state) => state.recommendationsReducer.recommendations)

    const loading_recommendations = useSelector((state) => state.recommendationsReducer.loading)
    const loading_images = useSelector((state) => state.imagesReducer.loading)
    const loading_credits = useSelector((state) => state.creditsReducer.loading)
    const loading_movie = useSelector((state) => state.movieReducer.loading)

    function handleClick() {
        window.scrollTo(0, 0)
        props.setShowVideo(false)
    }

    return (
        <>
            {(!loading_recommendations && !loading_images && !loading_credits && !loading_movie) &&
                <>
                    {recommendations.length > 0 ?
                        <div className="recommendations-container">
                            <h3>{language === "en-US" ? "Recommendations" : "Tavsiyeler"}</h3>
                            <div className="row">
                                {recommendations.map((recommendation, index) => (
                                    <div key={index} className="col-6 mb-3 position-relative">
                                        <Link to={`/movie/${recommendation.id}-${recommendation.title?.replaceAll(" ", "-").toLowerCase()}`} onClick={handleClick}>
                                            <LazyLoadImage
                                                className="img"
                                                src={`https://image.tmdb.org/t/p/w250_and_h141_face/${recommendation.backdrop_path}`}
                                                alt={recommendation.title + " background image"}
                                                placeholderSrc={posterPlaceholder}
                                                effect="blur"
                                                width="100%"
                                                height="auto"
                                                style={{ color: "white", aspectRatio: 3 / 2 }}
                                            />
                                        </Link>
                                        <div className="position-absolute recommendation-title fw-bold">{recommendation.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <div className="recommendations-container">
                            <h3>{language === "en-US" ? "Recommendations" : "Tavsiyeler"}</h3>
                            <div className="text-secondary">
                                <p>{language === "en-US" ? "There are no recommendations for this movie." : "Bu film için tavsiye yok."}</p>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Recommendations