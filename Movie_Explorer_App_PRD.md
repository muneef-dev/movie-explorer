# Movie Explorer App — Product Requirements Document

## 1. Document Overview

| Item | Details |
|---|---|
| Product | Movie Explorer App |
| Product type | Responsive single-page web application |
| Source requirements | `Movie_Explorer_App_Project_Requirements.md` |
| Primary data source | The Movie Database (TMDb) API |
| Target users | Movie fans who want to discover, search, and save movies |
| Delivery type | Frontend technical assessment / portfolio project |

## 2. Product Summary

Movie Explorer is a responsive React application that helps users discover trending movies, search the TMDb catalog, inspect movie details, watch trailers, and save favorites. The application includes a simple demonstration login, light and dark themes, filtering, pagination through infinite scroll or a load-more control, and local persistence.

The product must feel fast, work well on mobile and desktop, and handle loading, empty, and error states clearly.

## 3. Goals

- Let users find movies quickly by title.
- Make trending and popular movies easy to discover.
- Present useful movie information in a clear, attractive interface.
- Allow users to save favorites without requiring a backend.
- Persist the last search, favorites, theme, and demo session locally.
- Demonstrate reusable React components, Redux state management, API integration, routing, testing, and responsive design.

## 4. Non-Goals

- Production-grade authentication or password storage.
- A custom backend or database.
- Payments, subscriptions, or advertisements.
- Streaming movies inside the application.
- User-generated reviews or social networking.
- Replacing TMDb as the source of movie metadata.

## 5. Technical Requirements

Use the latest mutually compatible stable versions available when implementation begins.

| Technology | Requirement |
|---|---|
| React | Build the component-based user interface |
| Create React App | Create and configure the application as required by the assessment |
| JavaScript | Use modern ES modules and React conventions |
| Redux Toolkit | Manage shared application state |
| React Redux | Connect React components to the Redux store |
| Axios | Make TMDb API requests through a configured client |
| Material UI (MUI) | Provide components, theming, responsive layouts, and accessible interaction patterns |
| React Router | Provide client-side navigation |
| TMDb API | Supply trending, search, movie, cast, genre, image, and trailer data |
| localStorage | Persist favorites, last search, theme, and demo session |
| Jest and React Testing Library | Test components, reducers, and user flows |
| Vercel or Netlify | Host the production build |

Create React App is a stated assessment requirement and must be used even though newer production projects may choose a different build tool.

## 6. User Personas

### Casual Browser

Wants to see currently trending movies and open interesting titles without creating a real account.

### Intentional Searcher

Knows part or all of a movie title and wants accurate results, filters, and detailed information.

### Returning User

Wants previously saved favorites, the last search, and the selected theme to remain available on the same browser.

## 7. Core User Flows

### 7.1 Demo Login

1. The user opens the application.
2. The app shows the login page when no demo session exists.
3. The user enters a non-empty username and password.
4. The app stores only a safe demo-session marker and username; it must never store the password.
5. The user is redirected to the Home page.

### 7.2 Browse Trending Movies

1. The user opens Home.
2. The app requests the current trending movies from TMDb.
3. The app displays a responsive movie grid.
4. The user selects a card to open its details page.

### 7.3 Search and Filter

1. The user enters a movie title.
2. Search runs after submission or a short debounce period.
3. Matching movies appear in a responsive grid.
4. The user optionally filters by genre, release year, or rating.
5. The user loads the next result page using infinite scroll or a Load More button.

### 7.4 View and Save a Movie

1. The user opens a movie details page.
2. The app shows metadata, genres, cast, rating, overview, and trailer when available.
3. The user adds or removes the movie from Favorites.
4. The change appears immediately and persists after refresh.

## 8. Functional Requirements

### FR-01: Demo Authentication

- Provide username and password fields with validation.
- Reject empty values with inline messages.
- Treat login as a frontend demonstration only.
- Do not persist, log, or transmit the password.
- Provide logout and clear the demo session when used.
- Protect Home, Details, and Favorites routes from unauthenticated access.

### FR-02: Trending Movies

- Fetch the current daily or weekly trending movie list from TMDb.
- Show poster, title, release year, rating, and favorite state on each card.
- Show skeleton placeholders while the initial request is loading.
- Show a retry action if the request fails.

### FR-03: Movie Search

- Search TMDb by movie title.
- Trim input and prevent empty searches.
- Store the last valid search in Redux and `localStorage`.
- Restore the last search when the user returns.
- Replace stale results when a new query begins.
- Show a helpful empty state when no matches are found.

### FR-04: Filters

- Allow filtering by genre, release year, and minimum rating.
- Clearly display active filters.
- Provide a single action to clear all filters.
- Reset pagination when the query or filters change.
- If a filter cannot be applied by the selected TMDb endpoint, apply it consistently to the loaded results and explain that limitation in the README.

### FR-05: Pagination

- Support one primary pagination pattern: Load More is preferred for predictable accessibility and control.
- Prevent duplicate requests while a page is loading.
- Append new results without removing the existing grid.
- Hide or disable Load More after the last available page.

### FR-06: Movie Details

- Display title, poster or backdrop, release date, runtime, rating, vote count, overview, and genres.
- Display the main cast with names and character names.
- Display a YouTube trailer from TMDb video results when available.
- Display production status, original language, and production companies when available.
- Use fallbacks for missing images, overview, cast, or trailer.

### FR-07: Favorites

- Allow favorite toggling from movie cards and the details page.
- Store only the metadata needed to render the Favorites page.
- Persist favorites in `localStorage`.
- Keep favorite state consistent across all pages through Redux.
- Show an empty-state message and a link back to Home when no favorites exist.

### FR-08: Theme

- Support light and dark themes using MUI theming.
- Make the theme toggle available in the main navigation.
- Persist the selected theme in `localStorage`.
- Respect the system color preference on first visit.

### FR-09: Navigation

- Provide routes for Login, Home, Movie Details, Favorites, and Not Found.
- Include a responsive navigation bar with Home, Favorites, theme toggle, username, and logout.
- Preserve a sensible browser back-button experience.

### FR-10: Error Handling

- Convert network, timeout, authorization, rate-limit, and unavailable-service failures into user-friendly messages.
- Keep technical error details out of the visible UI.
- Log useful development details only in non-production builds.
- Provide retry actions for recoverable failures.

## 9. Suggested Enhancements

These features are optional and should be added only after all core requirements pass testing.

- **Recently viewed:** Keep a small local list of recently opened movies.
- **Similar movies:** Show TMDb recommendations on the details page.
- **Surprise Me:** Open a random highly rated movie from the loaded catalog.
- **Share link:** Copy the current movie details URL to the clipboard.
- **Search suggestions:** Show recent searches before the user submits a new query.
- **Installable experience:** Add basic progressive web app metadata if time permits.

## 10. UX Requirements

- Use a mobile-first responsive layout.
- Support common breakpoints for phone, tablet, laptop, and wide desktop screens.
- Keep search and primary navigation easy to reach.
- Maintain consistent poster aspect ratios and card heights.
- Give every interactive control visible hover, focus, active, and disabled states.
- Use MUI skeletons for initial loading and progress indicators for incremental loading.
- Avoid layout shifts when images load.
- Ensure keyboard navigation works across menus, cards, dialogs, filters, and controls.
- Provide meaningful image alternative text and labels for icon-only buttons.
- Meet WCAG 2.1 AA color-contrast expectations where practical.

## 11. Redux State Design

Use Redux Toolkit rather than handwritten Redux boilerplate.

```text
store
├── auth
│   └── demo session and username
├── movies
│   └── trending, search results, pagination, loading, and errors
├── movieDetails
│   └── selected movie, credits, videos, recommendations, loading, and errors
├── favorites
│   └── locally persisted favorite movies
├── filters
│   └── genre, year, and minimum rating
└── preferences
    └── theme, last search, and optional recent searches
```

Use `createAsyncThunk` for TMDb requests. Keep temporary component state, such as an open menu or current text-field value before submission, inside the component unless multiple distant components need it.

## 12. API Requirements

### Axios Client

- Create one Axios instance with the TMDb base URL, authentication configuration, and request timeout.
- Read the API token or key from environment variables.
- Keep API calls in service modules rather than React components.
- Normalize API failures before passing them to Redux.
- Cancel or ignore stale search requests when a newer search begins.

### Required TMDb Data

- Trending movies.
- Movie search results.
- Movie details.
- Genre list.
- Movie credits.
- Movie videos.
- Similar or recommended movies for the optional enhancement.

### Environment Configuration

Use an environment file that is excluded from source control:

```env
REACT_APP_TMDB_API_TOKEN=replace_with_your_tmdb_read_access_token
```

Provide `.env.example` with the variable name and no real secret. Include the required TMDb attribution notice in the application or README.

## 13. Recommended Project Structure

```text
movie-explorer/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── AppRoutes.jsx
│   │   └── store.js
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorState.jsx
│   │   │   ├── LoadingGrid.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   └── Navbar.jsx
│   │   └── movies/
│   │       ├── FilterBar.jsx
│   │       ├── MovieCard.jsx
│   │       ├── MovieGrid.jsx
│   │       ├── SearchBar.jsx
│   │       └── TrailerDialog.jsx
│   ├── features/
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   ├── favorites/
│   │   │   └── favoritesSlice.js
│   │   ├── filters/
│   │   │   └── filtersSlice.js
│   │   ├── movieDetails/
│   │   │   └── movieDetailsSlice.js
│   │   ├── movies/
│   │   │   └── moviesSlice.js
│   │   └── preferences/
│   │       └── preferencesSlice.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useMovieSearch.js
│   ├── pages/
│   │   ├── FavoritesPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MovieDetailsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   ├── apiClient.js
│   │   └── tmdbService.js
│   ├── theme/
│   │   └── createAppTheme.js
│   ├── utils/
│   │   ├── formatters.js
│   │   ├── storage.js
│   │   └── tmdbImages.js
│   ├── index.js
│   └── setupTests.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

This feature-based structure keeps Redux logic near its domain while preserving shared components, services, hooks, and utilities.

## 14. Acceptance Criteria

The MVP is accepted when all of the following are true:

- A user can complete the demo login and log out.
- Protected routes redirect unauthenticated users to Login.
- Home displays live trending data from TMDb.
- Search returns matching movies and restores the last search after refresh.
- Genre, year, and rating filters behave consistently.
- Additional result pages can be loaded without duplicates.
- Selecting a movie opens a dedicated details route.
- Details include metadata, cast, genres, overview, and a trailer or fallback.
- Favorites can be added and removed from cards and details.
- Favorites remain after a browser refresh.
- Light and dark themes work and remain selected after refresh.
- Loading, empty, missing-data, and API-error states are visibly handled.
- The UI works at mobile, tablet, and desktop sizes.
- No real credentials or TMDb secrets are committed.
- Automated tests cover critical reducers, components, and user flows.
- A production build completes successfully and the deployed routes work after direct navigation or refresh.

## 15. Testing Strategy

### Unit Tests

- Redux reducers and selectors.
- Storage helpers and data formatters.
- API error normalization.

### Component Tests

- Login validation.
- Search submission.
- Movie card rendering and favorite toggling.
- Filter changes and clearing.
- Loading, empty, and error states.

### Integration Tests

- Search request to rendered results using mocked API responses.
- Details request to complete details view.
- Favorite persistence through Redux and `localStorage`.
- Protected-route redirect and logout.

### Manual Checks

- Responsive behavior across common viewport sizes.
- Keyboard-only navigation.
- Light and dark mode readability.
- Direct navigation to deployed routes.
- Missing posters, trailers, cast, and overview fallbacks.

## 16. Performance and Quality Requirements

- Lazy-load route-level pages where useful.
- Lazy-load poster and backdrop images.
- Debounce type-ahead requests if search runs before submission.
- Avoid repeated details requests during the same session when cached data is available.
- Keep secrets outside the client repository; acknowledge that any browser-delivered TMDb credential is visible to users and restrict it according to TMDb guidance.
- Use reusable components without creating unnecessary abstraction.
- Keep linting warnings and browser console errors at zero for normal flows.

## 17. Delivery Phases

### Phase 1: Foundation

- Create React App setup.
- MUI theme and responsive layout.
- React Router and demo authentication.
- Redux Toolkit store.
- Axios TMDb client.

### Phase 2: Core Movie Experience

- Trending movies.
- Search and pagination.
- Movie details, cast, and trailer.
- Loading, empty, and error states.

### Phase 3: Personalization

- Favorites and persistence.
- Last search and theme persistence.
- Genre, year, and rating filters.

### Phase 4: Quality and Delivery

- Automated tests.
- Accessibility and responsive review.
- README and `.env.example`.
- Vercel or Netlify deployment.
- Optional enhancements after MVP acceptance.

## 18. Success Measures

For this assessment, success is measured by product completeness and engineering quality rather than business growth:

- All MVP acceptance criteria pass.
- Core flows complete without uncaught errors.
- Search and page navigation provide clear feedback.
- The interface is usable at 320 px width and on desktop screens.
- Critical Redux logic and user flows have automated test coverage.
- A reviewer can configure and run the project by following the README.

## 19. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| TMDb request or rate-limit failure | Show retryable errors, prevent duplicate requests, and avoid unnecessary calls |
| Missing movie metadata | Provide clear text and image fallbacks |
| Client-exposed API credential | Use the TMDb read token, environment configuration, and allowed-origin restrictions where available |
| Inconsistent local data | Validate stored values and fall back to safe defaults |
| Filters conflict with search behavior | Define filtering rules clearly and reset pagination after changes |
| Overbuilding an assessment project | Complete core acceptance criteria before optional enhancements |

## 20. Deliverables

- Complete source code in the requested repository.
- `README.md` with setup, environment, features, scripts, testing, and deployment instructions.
- `.env.example` without real credentials.
- Automated test suite.
- Deployed Vercel or Netlify URL.
- Clear attribution to TMDb.

## 21. Definition of Done

The project is done when the production build is deployed, all MVP acceptance criteria have been verified, required tests pass, the repository contains no secrets, and a new developer can run the application using only the README instructions.
