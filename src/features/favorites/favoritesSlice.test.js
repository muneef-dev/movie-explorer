import reducer, { clearFavorites, toggleFavorite } from './favoritesSlice';

const movie = {
  id: 101,
  title: 'Test Film',
  poster_path: '/poster.jpg',
  release_date: '2026-05-01',
  vote_average: 8.4,
  genre_ids: [18],
};

describe('favoritesSlice', () => {
  it('adds and removes a movie without creating duplicates', () => {
    const added = reducer(undefined, toggleFavorite(movie));
    expect(added.items).toHaveLength(1);
    expect(added.items[0]).toMatchObject(movie);

    const removed = reducer(added, toggleFavorite(movie));
    expect(removed.items).toEqual([]);
  });

  it('clears the collection', () => {
    const state = { items: [movie] };
    expect(reducer(state, clearFavorites()).items).toEqual([]);
  });
});
