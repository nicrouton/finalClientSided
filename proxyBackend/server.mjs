import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const baseurl = 'https://api.themoviedb.org';
const apiKey = process.env.API_IMDB;
const port = process.env.PORT;
console.log(baseurl)
app.use(cors(
    {
        origin: ["http://localhost:5173", "http://localhost:5000"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
))

app.get('/api/movies', async(req, res) => {
    const { q } = req.query;
    const endpoint = `${baseurl}/3/movie/popular?api_key=${apiKey}`;
    console.log(endpoint);
    console.log('Before try and fetch code in proxy.');
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error`);
        }
        const data = await response.json();
        res.json(data);
    } catch(error) {
        console.error('Error fetching movies', error);
        res.status(500).json( {error: 'failed to fetch movies'});
    }
})

app.listen(port || 5000, () => {
    console.log(`server is running on ${port}`);
})