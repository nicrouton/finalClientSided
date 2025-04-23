import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../redux/features/images/imagesSlice";

function Images({ id }) {
    const dispatch = useDispatch();
    const { images, loading, error } = useSelector((state) => state.imagesReducer);

    useEffect(() => {
        const numericId = id.split("-")[0];
        dispatch(getImages(numericId));
    }, [dispatch, id]);

    if (loading) return <div>Loading images...</div>;
    if (error) return <div>Error loading images</div>;
    if (!images) return null;

    return (
        <div className="container my-5">
            <h3>Images</h3>
            <div className="row">
                {images.backdrops?.slice(0, 6).map((image, index) => (
                    <div key={index} className="col-6 col-md-4 mb-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                            alt={`Backdrop ${index}`}
                            className="img-fluid rounded"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Images;