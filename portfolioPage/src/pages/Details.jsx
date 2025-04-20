import { useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Movie from "../components/Movie/Movie";
import Video from "../components/Video/Video";
import FeaturedCast from "../components/FeaturedCast/FeaturedCast";
import Images from "../components/Images/Images";
import Footer from "../components/Footer/Footer";
import Recommendations from "../components/Recommendations/Recommendations";
import { addReview, postRating } from "../redux/features/movie/movieSlice";

function Details() {

    const params = useParams()
    const [showVideo, setShowVideo] = useState(false)
    // const [showRatePopup, setShowRatePopup] = useState(false)
    const [showReviewPopup, setShowReviewPopup] = useState(false)
    const [ratingValue, setRatingValue] = useState("")
    const [reviewText, setReviewText] = useState("")
    const videoRef = useRef(null)
    const dispatch = useDispatch()


    function videoClick() {
        videoRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const recommendations = useSelector((state) => state.recommendationsReducer.recommendations)
    const loading_movie = useSelector((state) => state.movieReducer.loading)
    const movie_reviews = useSelector((state) => state.movieReducer.reviews)


    // const handleRateSubmit = (e) => {
    //     e.preventDefault()
    //     // if (ratingValue && !isNaN(ratingValue) && ratingValue >= 0.5 && ratingValue <= 10) {
    //     //     dispatch(rateMovie({ movieId: params.id, rating: parseFloat(ratingValue) }))
    //     //     setShowRatePopup(false)
    //     //     setRatingValue("")
    //     // }
    //     console.log("Rating submitted:", ratingValue);
    //     setShowRatePopup(false);

    // }

    const handleReviewSubmit = (e) => {
        e.preventDefault()
        const movieId = params.id.split('-')[0];
        if(reviewText.trim()) {
            dispatch(addReview({ movieId: params.id, review: reviewText, rating: parseFloat(ratingValue) }));
            dispatch(postRating({ id: movieId, rating: parseFloat(ratingValue) }));
            setShowReviewPopup(false);
            setReviewText("")
            setRatingValue("")
        }
        console.log("Review submitted:", reviewText);
        console.log("Rating submitted:", ratingValue);
        console.log("Movie ID:", movieId);
        
    }


    return (
        <>
            <Movie videoClick={videoClick} id={params.id} showVideo={showVideo} setShowVideo={setShowVideo} />

            <Video ref={videoRef} id={params.id} showVideo={showVideo} setShowVideo={setShowVideo} />
            <FeaturedCast id={params.id} />
            <div className="container">
                <div className="row">


                    {/* <div className="col-12 mb-4">
                        <button
                            className="btn btn-danger me-2"
                            onClick={() => setShowRatePopup(true)}
                        >
                            Rate Movie
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => setShowReviewPopup(true)}
                        >
                            Review
                        </button>
                    </div> */}
                
                
                    {
                        recommendations.length > 0 ?
                            <div className="col-12 col-lg-8 mb-lg-4">
                                <Images id={params.id} />
                            </div>
                            :
                            <div className="col-12 col-lg-8 mb-4">
                                <Images id={params.id} />
                            </div>
                    }

                    <div className="col-12 col-lg-4">
                        <Recommendations id={params.id} setShowVideo={setShowVideo} />
                    </div>
                </div>
            </div>

            <div style={{ margin: "60px" }}>
                <h3 className="my-4">Reviews</h3>
                <div className="d-flex">
                    {/* <button
                        className="btn btn-danger me-4"
                        onClick={() => setShowRatePopup(true)}
                    >
                        Rate Movie
                    </button> */}
                    <button
                        className="btn btn-warning"
                        onClick={() => setShowReviewPopup(true)}
                    >
                        Review
                    </button>
                </div>
                <hr />
                {
                    movie_reviews.length > 0 ? (
                        movie_reviews.map((review, index) => (
                            <div key={index} className="my-4 text-white">
                                <div className="d-flex align-items-center mb-2 gap-2">
                                    <img src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`} alt="user-image" style={{height:"40px", width:"40px", borderRadius:"20px"}}/>
                                    <h5 style={{color:"gray", fontSize:"18px"}}>{review.author}</h5>
                                </div>
                                <p style={{fontSize:"14px"}}>{review.content}</p>
                                <hr />
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )
                }
            </div>
            {!loading_movie && <Footer />}




            {/* Rate Movie Popup */}
            {/* {showRatePopup && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">Rate Movie</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowRatePopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleRateSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Rating (0.5 - 10)</label>
                                        <input
                                            type="number"
                                            className="form-control bg-white text-black"
                                            value={ratingValue}
                                            onChange={(e) => setRatingValue(e.target.value)}
                                            step="0.1"
                                            min="0.5"
                                            max="10"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger">Submit Rating</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}

            {/* Review Popup */}
            {showReviewPopup && (
                <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header">
                                <h5 className="modal-title">Write a Review</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowReviewPopup(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Review</label>
                                        <textarea
                                            className="form-control bg-white text-black"
                                            value={reviewText}
                                            onChange={(e) => setReviewText(e.target.value)}
                                            rows="4"
                                            required
                                        ></textarea>
                                    </div>

                                    {/*  */}
                                    <div className="mb-3">
                                        <label className="form-label">Rating (0.5 - 10)</label>
                                        <input
                                            type="number"
                                            className="form-control bg-white text-black"
                                            value={ratingValue}
                                            onChange={(e) => setRatingValue(e.target.value)}
                                            step="0.1"
                                            min="0.5"
                                            max="10"
                                            required
                                        />
                                    </div>
                                    {/*  */}

                                    
                                    <button type="submit" className="btn btn-warning">Submit Review</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Details