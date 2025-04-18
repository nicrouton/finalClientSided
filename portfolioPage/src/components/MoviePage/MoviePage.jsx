import React, { useEffect, useState } from 'react';
import styles from './MoviePage.module.css'

const MoviePage = () => {
    const [movies, setMovies] = useState([]);
    const addItem = () => {
        setMovies([movies, {imgSource}])
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiResponse = await fetch(`http://localhost:5000/api/movies?type=popular`);
                const data = await apiResponse.json();
                setMovies(data.results);
                console.log(data.results[0].poster_path);
            }  catch (error) {
                console.log("Error fetching movies", error);
            }
        }

        fetchMovies();
    }, []);

    return(
        <div className={styles.movieInfo}>
            <div id={styles.movieImage}>
                <img id='poster' src={`https://image.tmdb.org/t/p/original${movies[0]?.poster_path}`} width={500}></img>
            </div>
            <div id={styles.movieDetails}>
                <h2 id='movieTitle'>{movies[0]?.title}</h2>
                <p id='description'>{movies[0]?.overview}</p>
                <h5 id='reviewList'>Review List:</h5>
            </div>
        </div>
    )
}

export default MoviePage;