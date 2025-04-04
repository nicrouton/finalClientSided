import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const baseurl = process.env.ENDPOINT;
const apiKey = process.env.IMDB_API;
const port = process.env.PORT;
console.log(baseurl)
app.use(cors(
    {
        origin: ['http://localhost:5000', "https://api.themoviedb.org"],
        methods: ["GET", "POST"],
        allowedHeaders: ["Constent-Type", "Authorization"]
    }
))

app.get('/api/articles', async(req, res) => {
    const { q } = req.query;
    const endpoint = `${baseurl}?q=`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error`);
        }
        const data = await response.json();
        res.json(data);
    } catch(error) {
        console.error('Error fetching articles', error);
        res.status(500).json( {error: 'failed to fetch articles'});
    }
})

app.listen(port || 5000, () => {
    console.log(`server is running on ${port}`);
})