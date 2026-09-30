import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import favoritesReducer from '../../features/favorites/favoritesSlice';
import MovieCard from './MovieCard';

const movie = {
  id: 12,
  title: 'The Quiet Orbit',
  poster_path: null,
  release_date: '2024-01-01',
  vote_average: 7.8,
  genre_ids: [878],
};

describe('MovieCard', () => {
  it('renders metadata and toggles favorite state', async () => {
    const user = userEvent.setup();
    const store = configureStore({ reducer: { favorites: favoritesReducer } });
    render(
      <Provider store={store}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <MovieCard movie={movie} />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('The Quiet Orbit')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /add the quiet orbit to favorites/i }));
    expect(store.getState().favorites.items).toHaveLength(1);
  });
});
