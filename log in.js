// Fetch news data
fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=b4716ad0586a420e8bb783d7e46d6fb5')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);  // Log the data to check the structure
        const newsContainer = document.getElementById('news');
        if (data.articles && data.articles.length) {
            newsContainer.innerHTML = data.articles.map(article => `<p>${article.title}</p>`).join('');
        } else {
            newsContainer.innerHTML = '<p>No news articles found.</p>';
        }
    })
    .catch(error => console.log('Error fetching news:', error));
