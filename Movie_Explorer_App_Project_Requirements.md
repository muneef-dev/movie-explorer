# Project Story: Movie Explorer App

You have been hired by a startup to create a **Movie Explorer App**. This web application will allow users to search for movies, view details, and discover trending films. The app will fetch real-time data from the **TMDb (The Movie Database) API** to display information about movies.

## Features & Requirements

### 1. User Interface (UI)

- User Login interface with username and password.
- A search bar where users can type a movie name to get relevant results.
- Display a grid of movie posters, each showing the title, release year, and rating.
- Clicking on a movie should open a detailed view with additional information:
  - Overview
  - Genre
  - Cast
  - Trailer link
  - And other relevant movie information
- A trending movies section displaying popular movies from the API.
- Implement a light/dark mode for better user experience.

### 2. API Integration

Use the **The Movie Database (TMDb) API** to fetch:

- Trending movies
- Movie search results
- Movie details:
  - Title
  - Poster
  - Description
  - Rating
  - Genres
  - And other relevant details

TMDb API documentation:

<https://developers.themoviedb.org/3>

Additional requirements:

- Implement infinite scrolling for search results.
- Handle API errors gracefully with user-friendly messages.

### 3. State Management

- Use **React Context API** or **Redux** to manage movie data.
- Store the user's last searched movie in **local storage** for persistence.
- Allow users to save favorite movies to a list stored locally.

### 4. Extra Features (Bonus for Enthusiastic Interns! 😊)

- Allow users to filter movies by:
  - Genre
  - Year
  - Rating
- Show YouTube trailers using the **YouTube API** or an embed link from TMDb.
- Implement a **"Load More"** button instead of infinite scroll for better UX.

## Technical Guidelines & Instructions

### 1. Setup & Environment

- Create a new React app using **Create React App**.
- Use **axios** for API requests.
- Install and use **Material-UI (MUI)** for styling.

### 2. Development Process

- Break down the UI into reusable components, for example:
  - `MovieCard`
  - `SearchBar`
  - `MovieDetails`
- Implement **React Router** for navigation:
  - Home
  - Movie Details
  - Favorites
- Follow **mobile-first responsive design principles**.

### 3. Testing & Deployment

- Test the application to ensure all implemented features work correctly.
- Deploy the app using **Vercel** or **Netlify**.
- Provide a live demo link.

### 4. Deliverables

#### GitLab Repository

Provide a GitLab repository containing:

- Well-structured code
- Commented code where appropriate
- All necessary project files

#### README.md

The repository should include a `README.md` explaining:

- Project setup
- API configuration and usage
- Features implemented
- How to run the project locally
- Deployment information

#### Deployed Live Link

Provide a live link to the deployed and working application.

## Suggested Project Structure

```text
movie-explorer/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── MovieGrid.jsx
│   │   ├── MovieDetails.jsx
│   │   ├── TrendingMovies.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── MovieContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── MovieDetailsPage.jsx
│   │   └── Favorites.jsx
│   ├── services/
│   │   └── tmdbApi.js
│   ├── App.jsx
│   ├── index.js
│   └── theme.js
├── .env
├── package.json
└── README.md
```

## Expected Technologies

| Technology | Purpose |
|---|---|
| React | Frontend application |
| Create React App | Project setup |
| Axios | API requests |
| Material-UI (MUI) | UI components and styling |
| React Router | Application navigation |
| Context API / Redux | State management |
| TMDb API | Movie data |
| Local Storage | Favorites and last search persistence |
| Vercel / Netlify | Deployment |
| GitLab | Source code repository |

## Expected Application Pages

### Login

Users should be able to enter a username and password through a simple login interface.

### Home

The Home page should contain:

- Search bar
- Trending movies
- Movie grid
- Light/dark mode toggle
- Search results
- Loading and error states

### Movie Details

The Movie Details page should display:

- Movie poster
- Movie title
- Release date/year
- Rating
- Overview
- Genres
- Cast
- Trailer
- Favorite button

### Favorites

The Favorites page should display movies saved by the user locally.

## API Configuration

Create an environment file named `.env` and store the TMDb API key securely.

Example:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

Do not commit real API keys or other secrets to GitLab.

## Completion Checklist

- [ ] React application created using Create React App
- [ ] TMDb API integrated
- [ ] User login interface implemented
- [ ] Movie search implemented
- [ ] Trending movies implemented
- [ ] Movie details implemented
- [ ] Movie posters displayed in a responsive grid
- [ ] React Router implemented
- [ ] Context API or Redux implemented
- [ ] Favorites stored in local storage
- [ ] Last searched movie stored in local storage
- [ ] Infinite scrolling implemented
- [ ] API error handling implemented
- [ ] Light/dark mode implemented
- [ ] Responsive mobile-first UI implemented
- [ ] Genre/year/rating filters implemented
- [ ] Movie trailers implemented
- [ ] Optional "Load More" functionality implemented
- [ ] Application tested
- [ ] GitLab repository created
- [ ] README.md completed
- [ ] Application deployed to Vercel or Netlify
- [ ] Live demo link provided
