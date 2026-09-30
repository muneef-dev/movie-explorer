import { configureStore } from '@reduxjs/toolkit';
import reducer, { loadMovies } from './moviesSlice';
import { getTrendingMovies, searchMovies } from '../../services/tmdbService';

jest.mock('../../services/tmdbService', () => ({
  getTrendingMovies: jest.fn(),
  searchMovies: jest.fn(),
  getGenres: jest.fn(),
}));

const createStore = () => configureStore({ reducer: { movies: reducer } });

describe('moviesSlice', () => {
  beforeEach(() => jest.clearAllMocks());

  it('loads trending movies', async () => {
    getTrendingMovies.mockResolvedValue({
      page: 1,
      total_pages: 3,
      results: [{ id: 1, title: 'Arrival' }],
    });
    const store = createStore();

    await store.dispatch(loadMovies({ mode: 'trending', page: 1 }));

    expect(getTrendingMovies).toHaveBeenCalledWith(1);
    expect(store.getState().movies).toMatchObject({
      status: 'succeeded',
      page: 1,
      totalPages: 3,
      mode: 'trending',
    });
    expect(store.getState().movies.items).toEqual([{ id: 1, title: 'Arrival' }]);
  });

  it('appends unique search results', async () => {
    searchMovies
      .mockResolvedValueOnce({ page: 1, total_pages: 2, results: [{ id: 1 }, { id: 2 }] })
      .mockResolvedValueOnce({ page: 2, total_pages: 2, results: [{ id: 2 }, { id: 3 }] });
    const store = createStore();

    await store.dispatch(loadMovies({ mode: 'search', query: 'moon', page: 1 }));
    await store.dispatch(loadMovies({ mode: 'search', query: 'moon', page: 2 }));

    expect(store.getState().movies.items.map((movie) => movie.id)).toEqual([1, 2, 3]);
  });

  it('stores a user-friendly rejected value', async () => {
    searchMovies.mockRejectedValue({ status: 429, message: 'Please wait.' });
    const store = createStore();

    await store.dispatch(loadMovies({ mode: 'search', query: 'heat', page: 1 }));

    expect(store.getState().movies.status).toBe('failed');
    expect(store.getState().movies.error).toEqual({ status: 429, message: 'Please wait.' });
  });
});
