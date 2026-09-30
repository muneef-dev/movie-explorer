import { loadPersistedState, savePersistedState } from './storage';

describe('storage helpers', () => {
  beforeEach(() => window.localStorage.clear());

  it('persists only the allowed state slices', () => {
    savePersistedState({
      auth: { isAuthenticated: true, username: 'Maya' },
      favorites: { items: [{ id: 1, title: 'Moon' }] },
      preferences: { theme: 'dark', lastSearch: 'Moon', recentSearches: ['Moon'] },
      movies: { items: [{ id: 99 }] },
    });

    const saved = JSON.parse(window.localStorage.getItem('reel-atlas-state'));
    expect(saved.movies).toBeUndefined();
    expect(loadPersistedState().auth.username).toBe('Maya');
  });

  it('ignores invalid stored JSON', () => {
    window.localStorage.setItem('reel-atlas-state', '{broken');
    expect(loadPersistedState()).toBeUndefined();
  });
});
