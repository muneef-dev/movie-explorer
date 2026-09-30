import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getGenres as getGenresRequest,
  getTrendingMovies,
  searchMovies,
} from '../../services/tmdbService';

export const loadGenres = createAsyncThunk('movies/loadGenres', async (_, thunkApi) => {
  try {
    const data = await getGenresRequest();
    return data.genres;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const loadMovies = createAsyncThunk(
  'movies/loadMovies',
  async ({ mode = 'trending', query = '', page = 1 }, thunkApi) => {
    try {
      const data =
        mode === 'search'
          ? await searchMovies(query, page)
          : await getTrendingMovies(page);
      return { ...data, mode, query };
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    genres: [],
    mode: 'trending',
    query: '',
    page: 0,
    totalPages: 1,
    status: 'idle',
    genresStatus: 'idle',
    error: null,
    currentRequestId: null,
  },
  reducers: {
    resetMovies: (state) => {
      state.items = [];
      state.page = 0;
      state.totalPages = 1;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadGenres.pending, (state) => {
        state.genresStatus = 'loading';
      })
      .addCase(loadGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
        state.genresStatus = 'succeeded';
      })
      .addCase(loadGenres.rejected, (state) => {
        state.genresStatus = 'failed';
      })
      .addCase(loadMovies.pending, (state, action) => {
        state.status = 'loading';
        state.error = null;
        state.currentRequestId = action.meta.requestId;
        if (action.meta.arg.page === 1) state.items = [];
      })
      .addCase(loadMovies.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;

        const incoming = action.payload.results || [];
        const existingIds = new Set(state.items.map((movie) => movie.id));
        state.items =
          action.payload.page === 1
            ? incoming
            : [...state.items, ...incoming.filter((movie) => !existingIds.has(movie.id))];
        state.mode = action.payload.mode;
        state.query = action.payload.query;
        state.page = action.payload.page;
        state.totalPages = Math.min(action.payload.total_pages || 1, 500);
        state.status = 'succeeded';
        state.currentRequestId = null;
      })
      .addCase(loadMovies.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.status = 'failed';
        state.error = action.payload || { message: 'Unable to load movies.' };
        state.currentRequestId = null;
      });
  },
});

export const { resetMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
