import React, { useEffect, useState } from 'react';
import styles from './MovieList.module.css';

const MovieList = () => {
    const baseUrl = 'https://api.themoviedb.org';
    const endpointUrl = `${baseUrl}/api/`
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
                console.log("Testing the fetch in MovieList: \n");
                console.log(data.results);
                console.log(data.results[0].poster_path);
            } catch (error) {
                console.log("Error fetching movies", error);
            }
        }

        fetchMovies();
    }, []);

    return(
        <div>
            <h1>Movie Lists</h1>
            <div id='popularList'>
                <ul>
                    {movies.map((movie) => (
                    <li key={movie.id}>{movie.title} {console.log(movie.poster_path)}
                        <img 
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}></img>
                        {console.log(movie.poster_path)}
                    </li>
                    )
                )}
                </ul>
            </div>
            <div classname={styles.moviePage}>
                <img id='poster'></img><p>image stand in</p>
                <h2 id='movieTitle'>Movie Title</h2>
                <p id='description'>Description goes here</p>
                <h5 id='reviewList'>Review List:</h5>
            </div>
            <div id='scienceFicList'>
            </div>
        </div>
    )
}
export default MovieList;