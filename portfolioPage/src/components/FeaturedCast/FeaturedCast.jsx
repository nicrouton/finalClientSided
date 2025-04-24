import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCredits } from "../../redux/features/credits/credits";

import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import personPlaceholder from "../../assets/images/person.png";
import "./FeaturedCast.css";

function FeaturedCast({ id }) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.navigationBarReducer.language);
  const { cast } = useSelector((state) => state.creditsReducer.credits || {});
  const loadingCredits = useSelector((state) => state.creditsReducer.loading);
  const loadingMovie = useSelector((state) => state.movieReducer.loading);

  useEffect(() => {
    dispatch(getCredits(id.split("-")[0]));
  }, [dispatch, id]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 6 } },
      { breakpoint: 992, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 576, settings: { slidesToShow: 3 } },
      { breakpoint: 400, settings: { slidesToShow: 2 } },
    ],
  };

  if (!cast || cast.length < 9 || loadingCredits || loadingMovie) return null;

  return (
    <div className="container">
      <div className="featured-cast-container">
        <h3>
          {language === "en-US" ? "Featured Cast" : "Öne Çıkan Oyuncular"}{" "}
          <span style={{ color: "#ffffff99" }}>({cast.length})</span>
        </h3>
        <Slider {...settings}>
          {cast.map((person, index) => (
            <div className="cast" key={index}>
              <div className="img">
                <LazyLoadImage
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w300/${person.profile_path}`
                      : personPlaceholder
                  }
                  alt={`${person.name} image`}
                  placeholderSrc={personPlaceholder}
                  effect="blur"
                  width="100%"
                  height="auto"
                  style={{ aspectRatio: 3 / 5, color: "white" }}
                />
              </div>
              <div className="name">{person.name}</div>
              <div className="character">{person.character}</div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default FeaturedCast;