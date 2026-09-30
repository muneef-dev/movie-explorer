import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === movie.id);

      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.unshift({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path || null,
          release_date: movie.release_date || '',
          vote_average: movie.vote_average || 0,
          genre_ids: movie.genre_ids || movie.genres?.map((genre) => genre.id) || [],
          overview: movie.overview || '',
        });
      }
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const selectIsFavorite = (state, movieId) =>
  state.favorites.items.some((movie) => movie.id === Number(movieId));
export default favoritesSlice.reducer;
