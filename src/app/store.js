import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import filtersReducer from '../features/filters/filtersSlice';
import movieDetailsReducer from '../features/movieDetails/movieDetailsSlice';
import moviesReducer from '../features/movies/moviesSlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import { loadPersistedState, savePersistedState } from '../utils/storage';

export const createAppStore = (preloadedState = loadPersistedState()) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      favorites: favoritesReducer,
      filters: filtersReducer,
      movieDetails: movieDetailsReducer,
      movies: moviesReducer,
      preferences: preferencesReducer,
    },
    preloadedState,
  });

  store.subscribe(() => savePersistedState(store.getState()));
  return store;
};

const store = createAppStore();
export default store;
