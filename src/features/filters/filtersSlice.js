import { createSlice } from '@reduxjs/toolkit';

const initialState = { genre: '', year: '', rating: 0 };

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const { setGenre, setYear, setRating, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
