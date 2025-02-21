import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;
const API_KEY = 'b4716ad0586a420e8bb783d7e46d6fb5';

// ✅ Enable CORS
app.use(cors());

app.get('/', (req, res) => {  
    res.send('<h1>Go to <a href="/news">/news</a> to see images</h1>');
});

app.get('/news', async (req, res) => {
    try {
        // Fetch data from the news API
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            return res.status(404).json({ error: "No news articles found" });
        }

        // Extract image URLs
        const images = data.articles
            .map(article => article.urlToImage)
            .filter(url => url !== null && url !== ""); 

        if (images.length === 0) {
            return res.status(404).json({ error: "No images available" });
        }

        // Send JSON response instead of HTML (so frontend can use it)
        res.json({ images });
    } catch (error) {
        console.error("Error fetching news:", error.message);
        res.status(500).json({ error: "Failed to fetch news" });
    }
});

// ✅ Start the server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));