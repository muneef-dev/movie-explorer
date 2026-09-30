import { createSlice } from '@reduxjs/toolkit';
import { getPreferredTheme } from '../../utils/storage';

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    theme: getPreferredTheme(),
    lastSearch: '',
    recentSearches: [],
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setLastSearch: (state, action) => {
      const query = action.payload.trim();
      state.lastSearch = query;
      if (query) {
        state.recentSearches = [
          query,
          ...state.recentSearches.filter(
            (item) => item.toLowerCase() !== query.toLowerCase(),
          ),
        ].slice(0, 5);
      }
    },
    clearLastSearch: (state) => {
      state.lastSearch = '';
    },
  },
});

export const { toggleTheme, setLastSearch, clearLastSearch } =
  preferencesSlice.actions;
export default preferencesSlice.reducer;
