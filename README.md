# Reel Atlas — Movie Explorer

Reel Atlas is a responsive movie-discovery application built for the Movie Explorer frontend assessment. It uses live TMDb data to show trending films, search the catalog, present detailed movie information, play trailers, and maintain a browser-local favorites collection.

## Features

- Demo login with protected routes and no password persistence
- Weekly trending movies and title search
- Genre, release-year, and minimum-rating filters
- Accessible Load More pagination
- Details, cast, production facts, trailers, and recommendations
- Favorites, theme, recent searches, and last-search persistence
- Light and dark MUI themes
- Mobile-first responsive layouts and keyboard-friendly controls
- Loading skeletons, empty states, missing-data fallbacks, and retryable errors

## Technology

- React with Create React App (`react-scripts`)
- Redux Toolkit and React Redux
- Axios
- Material UI and Emotion
- React Router
- Jest and React Testing Library
- TMDb API

Create React App is deprecated for new production applications, but it is used here because it is an explicit assessment requirement.

## Prerequisites

- Node.js 20 or newer
- npm
- A TMDb account and API Read Access Token

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env`.

3. Add your TMDb API Read Access Token:

   ```env
   REACT_APP_TMDB_API_TOKEN=your_tmdb_read_access_token
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open `http://localhost:3000` and sign in with any non-empty username and password.

The login is intentionally a frontend demonstration. The password is validated for presence only and is never stored or transmitted.

## Scripts

| Command | Purpose |
|---|---|
| `npm start` | Run the local development server |
| `npm test -- --watchAll=false` | Run the full test suite once |
| `npm run build` | Create an optimized production build |

## Project Structure

```text
src/
├── app/           # Store, route map, and application root
├── components/    # Shared states, layout, and movie UI
├── features/      # Redux slices grouped by domain
├── pages/         # Route-level screens
├── services/      # Axios client and TMDb requests
├── theme/         # MUI theme factory
└── utils/         # Storage, formatting, and image helpers
```

## Data and Persistence

Redux Toolkit owns shared state. The demo session, favorites, theme, last search, and five recent searches are persisted under one `localStorage` key. Movie results and details remain session-only so stale API data does not accumulate in the browser.

Filtering is applied to the result pages already loaded from TMDb. Changing a filter does not query TMDb's Discover endpoint. This keeps search behavior predictable for the assessment while Load More expands the client-side result set.

## API Error Handling

The Axios client uses the TMDb v3 base URL, Bearer-token authentication, a ten-second timeout, and normalized messages for missing credentials, unauthorized requests, rate limits, timeouts, and unavailable services. A missing token produces an actionable message in the UI.

Any credential delivered to a browser can be inspected by a user. Use a TMDb read token, never a privileged secret, and apply origin restrictions if they are available for your account.

## Testing

The test suite covers:

- Favorite reducer behavior
- Trending/search async state and result deduplication
- Demo-login validation and password non-persistence
- Movie-card favorite interaction
- Safe persistence and invalid-data recovery

Run tests with:

```bash
npm test -- --watchAll=false
```

## Deployment

### Vercel

1. Import the repository.
2. Set `REACT_APP_TMDB_API_TOKEN` in project environment variables.
3. Use `npm run build` as the build command and `build` as the output directory.
4. Deploy. `vercel.json` keeps client-side routes working after refresh.

### Netlify

1. Import the repository.
2. Set `REACT_APP_TMDB_API_TOKEN` in environment variables.
3. Use `npm run build` as the build command and `build` as the publish directory.
4. Deploy. `public/_redirects` provides the SPA fallback.

## Attribution

This product uses the TMDb API but is not endorsed or certified by TMDb. Movie metadata and images are provided by [The Movie Database](https://www.themoviedb.org/).
