# Movie Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the responsive Movie Explorer assessment defined in `Movie_Explorer_App_PRD.md` with live TMDb data, demo authentication, search, filtering, details, favorites, theme persistence, tests, and deployment documentation.

**Architecture:** Use a Create React App single-page application organized by feature. Redux Toolkit owns shared domain state, Axios service modules isolate TMDb access, React Router defines the page shell, and MUI supplies accessible components and theming. Browser storage persists only the demo session, preferences, searches, and favorite metadata.

**Tech Stack:** React, Create React App, JavaScript, Redux Toolkit, React Redux, Axios, Material UI, React Router, Jest, React Testing Library, TMDb API

---

### Task 1: Scaffold and Configure the Application

**Files:**
- Create: `package.json`
- Create: `public/index.html`
- Create: `src/index.js`
- Create: `.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: Scaffold Create React App**

Run: `npx create-react-app@latest .`

Expected: CRA creates `package.json`, `public`, and `src` without removing the requirements documents.

- [ ] **Step 2: Install application dependencies**

Run: `npm install @reduxjs/toolkit react-redux axios @mui/material @mui/icons-material @emotion/react @emotion/styled react-router-dom`

Expected: dependencies are recorded in `package.json` and npm exits successfully.

- [ ] **Step 3: Add environment contract**

```env
REACT_APP_TMDB_API_TOKEN=replace_with_your_tmdb_read_access_token
```

- [ ] **Step 4: Verify baseline**

Run: `npm test -- --watchAll=false`

Expected: the CRA starter test passes before replacement.

### Task 2: Build Storage, Theme, and Redux Foundation

**Files:**
- Create: `src/app/store.js`
- Create: `src/utils/storage.js`
- Create: `src/theme/createAppTheme.js`
- Create: `src/features/auth/authSlice.js`
- Create: `src/features/favorites/favoritesSlice.js`
- Create: `src/features/filters/filtersSlice.js`
- Create: `src/features/preferences/preferencesSlice.js`
- Test: `src/features/favorites/favoritesSlice.test.js`

- [ ] **Step 1: Write reducer tests**

Test that adding the same movie twice is idempotent, removing a movie deletes it by TMDb ID, changing the theme stores `light` or `dark`, and logout clears only the demo session.

- [ ] **Step 2: Run reducer tests and confirm failure**

Run: `npm test -- --watchAll=false favoritesSlice.test.js`

Expected: FAIL because the slices do not exist.

- [ ] **Step 3: Implement store and slices**

Use `configureStore`, pure reducers, validated storage reads, and a store subscription that persists `auth`, `favorites`, and `preferences` without storing passwords.

- [ ] **Step 4: Run reducer tests**

Run: `npm test -- --watchAll=false favoritesSlice.test.js`

Expected: PASS.

### Task 3: Implement the TMDb Data Layer

**Files:**
- Create: `src/services/apiClient.js`
- Create: `src/services/tmdbService.js`
- Create: `src/utils/formatters.js`
- Create: `src/utils/tmdbImages.js`
- Create: `src/features/movies/moviesSlice.js`
- Create: `src/features/movieDetails/movieDetailsSlice.js`
- Test: `src/services/tmdbService.test.js`

- [ ] **Step 1: Write service tests with mocked Axios**

Cover trending, search pagination, details with appended credits/videos/recommendations, genre loading, and normalized errors.

- [ ] **Step 2: Run service tests and confirm failure**

Run: `npm test -- --watchAll=false tmdbService.test.js`

Expected: FAIL because the service does not exist.

- [ ] **Step 3: Implement the Axios client and services**

Configure `https://api.themoviedb.org/3`, Bearer authentication from `REACT_APP_TMDB_API_TOKEN`, a 10-second timeout, English language defaults, and a consistent `{ message, status }` error shape.

- [ ] **Step 4: Implement async Redux state**

Use `createAsyncThunk` for genres, trending, search pages, and movie details. Track `idle`, `loading`, `succeeded`, and `failed`, discard stale search responses by request ID, deduplicate appended movie IDs, and reset pagination when the query changes.

- [ ] **Step 5: Run data-layer tests**

Run: `npm test -- --watchAll=false tmdbService.test.js`

Expected: PASS.

### Task 4: Create the Application Shell and Authentication

**Files:**
- Create: `src/app/App.jsx`
- Create: `src/app/AppRoutes.jsx`
- Create: `src/components/common/ProtectedRoute.jsx`
- Create: `src/components/layout/AppLayout.jsx`
- Create: `src/components/layout/Navbar.jsx`
- Create: `src/pages/LoginPage.jsx`
- Create: `src/pages/NotFoundPage.jsx`
- Test: `src/pages/LoginPage.test.jsx`

- [ ] **Step 1: Write authentication flow tests**

Verify empty inputs show validation, valid inputs dispatch login without storing the password, protected routes redirect to `/login`, and logout returns to Login.

- [ ] **Step 2: Run authentication tests and confirm failure**

Run: `npm test -- --watchAll=false LoginPage.test.jsx`

Expected: FAIL because routes and Login do not exist.

- [ ] **Step 3: Implement the cinematic application shell**

Use an editorial cinema aesthetic with warm amber accents, deep ink surfaces, sharp poster framing, Playfair Display headings, Source Sans 3 body text, strong focus states, a skip link, and restrained reveal transitions that respect reduced-motion preferences.

- [ ] **Step 4: Implement demo authentication**

Validate non-empty credentials, store only `{ username, isAuthenticated: true }`, redirect signed-in users to Home, and provide logout from the responsive navigation.

- [ ] **Step 5: Run authentication tests**

Run: `npm test -- --watchAll=false LoginPage.test.jsx`

Expected: PASS.

### Task 5: Build Trending, Search, Filters, and Favorites

**Files:**
- Create: `src/pages/HomePage.jsx`
- Create: `src/pages/FavoritesPage.jsx`
- Create: `src/components/movies/SearchBar.jsx`
- Create: `src/components/movies/FilterBar.jsx`
- Create: `src/components/movies/MovieCard.jsx`
- Create: `src/components/movies/MovieGrid.jsx`
- Create: `src/components/common/LoadingGrid.jsx`
- Create: `src/components/common/EmptyState.jsx`
- Create: `src/components/common/ErrorState.jsx`
- Test: `src/pages/HomePage.test.jsx`

- [ ] **Step 1: Write Home behavior tests**

Verify trending loads initially, search trims input, the last search is restored, filters update visible results, Load More requests the next page once, retry repeats a failed request, and favorite toggles update Redux.

- [ ] **Step 2: Run Home tests and confirm failure**

Run: `npm test -- --watchAll=false HomePage.test.jsx`

Expected: FAIL because Home components do not exist.

- [ ] **Step 3: Implement reusable movie discovery components**

Render accessible poster cards with image fallbacks, release year, rating, favorite action, responsive columns, MUI skeletons, explicit empty/error states, active filter chips, and a disabled loading state on Load More.

- [ ] **Step 4: Implement Favorites**

Render persisted favorite movies through the same grid and show an empty state linking to Home.

- [ ] **Step 5: Run discovery tests**

Run: `npm test -- --watchAll=false HomePage.test.jsx`

Expected: PASS.

### Task 6: Build Movie Details and Trailer Experience

**Files:**
- Create: `src/pages/MovieDetailsPage.jsx`
- Create: `src/components/movies/TrailerDialog.jsx`
- Test: `src/pages/MovieDetailsPage.test.jsx`

- [ ] **Step 1: Write details-page tests**

Verify metadata, genres, cast, trailer, missing-data fallbacks, similar movies, favorite toggling, loading skeletons, failure retry, and browser back navigation.

- [ ] **Step 2: Run details tests and confirm failure**

Run: `npm test -- --watchAll=false MovieDetailsPage.test.jsx`

Expected: FAIL because the details page does not exist.

- [ ] **Step 3: Implement details presentation**

Create a backdrop-led header, poster overlap, compact metadata rail, cast list, production facts, accessible YouTube dialog, similar-movie row, and resilient fallbacks for every optional field.

- [ ] **Step 4: Run details tests**

Run: `npm test -- --watchAll=false MovieDetailsPage.test.jsx`

Expected: PASS.

### Task 7: Complete Quality, Documentation, and Production Checks

**Files:**
- Modify: `README.md`
- Modify: `public/manifest.json`
- Create: `src/App.test.jsx`

- [ ] **Step 1: Add critical integration tests**

Test application routing, initial session restoration, theme persistence, direct details navigation, not-found rendering, and the full login-to-search-to-favorite flow with mocked TMDb responses.

- [ ] **Step 2: Document setup and delivery**

Document prerequisites, `npm install`, `.env` creation, `npm start`, `npm test -- --watchAll=false`, `npm run build`, feature behavior, demo-auth limitations, filter limitations, TMDb attribution, and Vercel/Netlify deployment.

- [ ] **Step 3: Run the full test suite**

Run: `npm test -- --watchAll=false`

Expected: all tests pass with no unhandled promise rejections.

- [ ] **Step 4: Build production assets**

Run: `npm run build`

Expected: CRA reports a successful optimized production build.

- [ ] **Step 5: Review implementation against the PRD**

Confirm every acceptance criterion in `Movie_Explorer_App_PRD.md` is either implemented or explicitly identified as an optional enhancement.
