import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMovieDetails } from '../../services/tmdbService';

export const loadMovieDetails = createAsyncThunk(
  'movieDetails/load',
  async (movieId, thunkApi) => {
    try {
      return await getMovieDetails(movieId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: { item: null, status: 'idle', error: null },
  reducers: {
    clearMovieDetails: (state) => {
      state.item = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMovieDetails.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadMovieDetails.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loadMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || { message: 'Unable to load this movie.' };
      });
  },
});

export const { clearMovieDetails } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
