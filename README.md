# MovieSearch

A simple client-side movie search application built with **HTML, CSS, and JavaScript**. It uses the **OMDb API** to search for movies, display movie information, and maintain a personal favourites list in the browser.

## Features

- Search movies by title.
- Optionally filter searches by release year.
- Display movie poster, title, type, and year.
- Fetch additional movie details on demand:
  - IMDb rating
  - Plot
  - Actors
- Add movies to a favourites list.
- Prevent duplicate favourites.
- Remove movies from favourites.
- Persist searches and favourites using browser `localStorage`.
- Fallback image handling when a movie poster is unavailable or fails to load.
- Separate favourites page.

## Tech Stack

- **HTML5** — page structure
- **CSS3** — styling and layout
- **JavaScript (ES Modules)** — application logic and API requests
- **OMDb API** — movie data
- **localStorage** — client-side persistence
- **Font Awesome** — favourites/bookmark icon

## Project Structure

```text
MovieSearch/
├── index.html          # Main movie search page
├── favourites.html     # Favourites page
├── script.js           # Search and movie display logic
├── addToFav.js         # Favourites management and detailed movie information
├── style.css           # Application styling
├── error.jpeg          # Fallback image for unavailable posters
└── .gitignore          # Git ignore rules
```

## Getting Started

### 1. Clone or download the project

```bash
git clone <your-repository-url>
cd MovieSearch
```

### 2. Configure the OMDb API key

The application requires an OMDb API key.

Get a key from the OMDb API website:

https://www.omdbapi.com/apikey.aspx

Then replace the `API_KEY` value in both:

- `script.js`
- `addToFav.js`

For example:

```javascript
const API_KEY = "YOUR_OMDB_API_KEY";
```

> **Security note:** This project is a frontend-only application, so the API key is visible to users in the browser. For a production application, API requests should be routed through a backend/serverless function so the key is not exposed publicly.

### 3. Run the application

Because the project uses JavaScript modules (`type="module"`), serve it through a local web server rather than opening `index.html` directly with `file://`.

For example, with VS Code, install/use **Live Server** and open `index.html`.

Alternatively, if Python is installed:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## How It Works

### Movie Search

When the user enters a movie title and optionally a year, `script.js` sends a request to the OMDb API using the search endpoint.

The returned movies are stored in `localStorage` and rendered on the page.

### More Information

Clicking **Click to view more** sends another OMDb request using the movie's IMDb ID. The application then displays the IMDb rating, plot, and actors.

### Favourites

Clicking **Add to Favorites** retrieves the movie's full information and stores it in `localStorage` under the `fav` key.

The favourites page reads that stored data and displays the saved movies.

### Local Storage

The application uses these localStorage keys:

| Key | Purpose |
|---|---|
| `movie` | Stores the latest search results |
| `input` | Stores the last movie title entered |
| `year` | Stores the last year entered |
| `fav` | Stores favourite movies |

## API

This project uses the **OMDb API**:

```text
https://www.omdbapi.com/
```

Typical requests include:

```text
?apikey=YOUR_API_KEY&s=movie-title
```

and:

```text
?apikey=YOUR_API_KEY&i=imdb-id
```

## Limitations

- The project depends on the OMDb API being available.
- API usage is subject to OMDb API limits and the selected API plan.
- Favourites are stored only in the current browser's local storage.
- Favourites are not synchronized between devices or users.
- The API key is exposed in frontend JavaScript.
- There is no user authentication or backend database.

## Future Improvements

- Move API requests to a backend to protect the API key.
- Add loading indicators and better error messages.
- Add pagination for search results.
- Add movie genre, director, runtime, and ratings.
- Add sorting and filtering options.
- Improve responsive/mobile styling.
- Add a dedicated movie-details page.
- Add user authentication and cloud-synced favourites.
- Add automated tests.

## License

This project is provided for learning and personal project use. Check the OMDb API terms and the terms of any third-party assets/services before deploying publicly.
