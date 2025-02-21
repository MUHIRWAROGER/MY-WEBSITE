document.addEventListener("DOMContentLoaded", async function () {
    const newsContainer = document.getElementById("news");
    const newsTicker = document.getElementById("news-ticker");

    try {
        const response = await fetch("http://localhost:3000/news");
        const data = await response.json();

        if (data.error) {
            console.error("Backend error:", data.error);
            newsContainer.innerHTML = `<h2>${data.error}</h2>`;
            newsTicker.innerHTML = "No latest news available";
            return;
        }

        // ✅ Display images
        newsContainer.innerHTML = "";
        data.images.forEach((imgUrl) => {
            const img = document.createElement("img");
            img.src = imgUrl;
            img.style.width = "300px";
            img.style.margin = "10px";
            newsContainer.appendChild(img);
        });

        // ✅ Fetch news headlines separately
        const responseHeadlines = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=b4716ad0586a420e8bb783d7e46d6fb5`);
        const newsData = await responseHeadlines.json();

        if (!newsData.articles || newsData.articles.length === 0) {
            newsTicker.innerHTML = "No latest news available";
            return;
        }

        // ✅ Create scrolling news ticker content
        let headlinesHTML = newsData.articles
            .map(article => `<span style="margin-right: 50px;">${article.title}</span>`)
            .join(""); // Space between items

        newsTicker.innerHTML = headlinesHTML;

    } catch (error) {
        console.error("Fetch error:", error);
        newsContainer.innerHTML = `<h2>Error fetching news</h2>`;
        newsTicker.innerHTML = "Error fetching news";
    }
});
