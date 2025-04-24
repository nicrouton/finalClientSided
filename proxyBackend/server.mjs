import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const baseurl = 'https://api.themoviedb.org';
const apiKey = process.env.API_IMDB;

// CORS Setup
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


// Movie Details
app.get('/api/movie/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const response = await axios.get(`${baseurl}/3/movie/${movieId}`, {
      params: { api_key: apiKey, language: 'en-US' }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

// Movie Reviews
app.get('/api/movie/:movieId/reviews', async (req, res) => {
  const { movieId } = req.params;
  const { language } = req.query;
  try {
    const response = await axios.get(`${baseurl}/3/movie/${movieId}/reviews`, {
      params: { api_key: apiKey, language: language || 'en-US' }
    });
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

//Credits
app.get('/api/credits/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const response = await axios.get(`${baseurl}/3/movie/${movieId}/credits`, {
      params: { api_key: apiKey }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching credits:', error.message);
    res.status(500).json({ error: 'Failed to fetch credits' });
  }
});

// Images
app.get('/api/images/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const response = await axios.get(`${baseurl}/3/movie/${movieId}/images`, {
      params: { api_key: apiKey }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

//   Recommendations
app.get('/api/recommendations/:movieId', async (req, res) => {
  const { movieId } = req.params;
  try {
    const response = await axios.get(`${baseurl}/3/movie/${movieId}/recommendations`, {
      params: { api_key: apiKey }
    });
    const filtered = response.data.results.filter(r => r.backdrop_path !== null);
    res.json(filtered.length >= 8 ? filtered.slice(0, 8) : filtered);
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

//   Search
app.get('/api/search', async (req, res) => {
  const input = req.query.query;
  if (!input) return res.status(400).json({ error: "Query parameter 'query' is required" });

  try {
    const response = await axios.get(`${baseurl}/3/search/movie`, {
      params: { api_key: apiKey, query: input }
    });
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

//   Movies (Popular, Now Playing, etc.)
app.get('/api/movies', async (req, res) => {
  const { endpoint } = req.query;
  try {
    let movies = [];
    const total_pages = (endpoint === "upcoming" || endpoint === "now_playing") ? 5 : 15;

    for (let page = 1; page <= total_pages; page++) {
      const response = await axios.get(`${baseurl}/3/movie/${endpoint}`, {
        params: { api_key: apiKey, page }
      });
      movies = [...movies, ...response.data.results];
    }

    const uniqueMovies = [...new Map(movies.map(item => [item.title, item])).values()];
    res.json(uniqueMovies);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

//   Videos (Trailer, Teaser, etc.)
app.get('/api/video/:id', async (req, res) => {
  const { id } = req.params;
  const { language } = req.query;

  try {
    let response = await axios.get(`${baseurl}/3/movie/${id}/videos`, {
      params: { api_key: apiKey, language }
    });

    if (response.data.results.length === 0) {
      response = await axios.get(`${baseurl}/3/movie/${id}/videos`, {
        params: { api_key: apiKey, language: 'en-US' }
      });
    }

    const videoTypes = ["Trailer", "Teaser", "Featurette", "Clip", "Behind the Scenes"];
    for (let type of videoTypes) {
      const match = response.data.results.find(v => v.type === type && v.key);
      if (match) {
        return res.json({ type: match.type, key: match.key });
      }
    }

    res.json(null);
  } catch (error) {
    console.error('Error fetching video:', error.message);
    res.status(500).json({ error: 'Failed to fetch video' });
  }
});

app.use(bodyParser.json());

app.post('/api/movie/:id/rating', async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    const response = await axios.post(
      `${baseurl}/3/movie/${id}/rating`,
      { value },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error posting rating:', error.message);
    res.status(500).json({ error: 'Failed to post rating' });
  }
});

// Server Listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});