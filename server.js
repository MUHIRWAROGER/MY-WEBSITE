import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Serve a simple homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the News API</h1><p>Go to <a href="/news">/news</a> to see news images.</p>');
});

// Fetch news articles
app.get('/news', async (req, res) => {
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=b4716ad0586a420e8bb783d7e46d6fb5');
        const data = await response.json();

        // Extract image URLs
        const images = data.articles.map(article => article.urlToImage).filter(url => url);

        res.json({ images }); // Sends JSON with image URLs
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
