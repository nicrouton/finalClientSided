import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../redux/features/images/imagesSlice";

import Carousel from "react-bootstrap/Carousel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import posterPlaceholder from "../../assets/images/poster.webp";

import "./Images.css";

function Images({ id }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const numericId = id.split("-")[0];
    dispatch(getImages(numericId));
  }, [dispatch, id]);

  const { images, loading } = useSelector((state) => state.imagesReducer);
  const loading_credits = useSelector((state) => state.creditsReducer.loading);
  const loading_movie = useSelector((state) => state.movieReducer.loading);

  const file_paths = images?.backdrops?.map(img => img.file_path) || [];

  return (
    <>
      {(!loading && !loading_credits && !loading_movie) && (
        <>
          {file_paths.length > 0 ? (
            <div className="images-container">
              <h3>
                Backgrounds{" "}
                <span style={{ color: "#ffffff99" }}>({file_paths.length})</span>
              </h3>
              <Carousel
                fade
                indicators={false}
                controls={true}
                pause={false}               
                interval={3000}             
                slide={true}
              >
                {file_paths.map((path, index) => (
                  <Carousel.Item key={index}>
                    <div className="img">
                      <LazyLoadImage
                        src={`https://image.tmdb.org/t/p/original/${path}`}
                        alt={`Slide ${index + 1}`}
                        placeholderSrc={posterPlaceholder}
                        effect="blur"
                        width="100%"
                        height="auto"
                        style={{ color: "white", aspectRatio: 3 / 2 }}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          ) : (
            <div className="images-container">
              <h3>Backgrounds</h3>
              <p className="text-secondary">There are no background images for this movie.</p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Images;