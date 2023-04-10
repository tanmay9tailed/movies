const form = document.querySelector('form');
const input = document.querySelector('input');
const moviesContainer = document.getElementById('movies-container');

const API_KEY = 'b37ccfa1a798723fe8b54795c5927a95';
const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        if (movie.poster_path) {
            movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w185${movie.poster_path}" alt="${movie.title}">
            `;
        } else {
            movieElement.innerHTML = `
                <div class="no-image">No Image</div>
            `;
        }

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');
        movieInfo.innerHTML = `
            <h3>${movie.title}</h3>
            <p>${movie.release_date}</p>
        `;

        movieElement.appendChild(movieInfo);
        moviesContainer.appendChild(movieElement);
    });
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchTerm = input.value.trim();

    if (!searchTerm) {
        return;
    }

    moviesContainer.innerHTML = `
        <div class="spinner"></div>
    `;

    const response = await fetch(API_URL + searchTerm);
    const data = await response.json();

    if (data.total_results === 0) {
        moviesContainer.innerHTML = `
            <div class="no-results">No results found.</div>
        `;
    } else {
        displayMovies(data.results);
    }
});