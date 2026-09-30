const STORAGE_KEY = 'reel-atlas-state';

export const loadPersistedState = () => {
  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY);
    if (!rawState) return undefined;

    const parsedState = JSON.parse(rawState);
    return {
      auth: {
        isAuthenticated: Boolean(parsedState.auth?.isAuthenticated),
        username: parsedState.auth?.username || '',
      },
      favorites: {
        items: Array.isArray(parsedState.favorites?.items)
          ? parsedState.favorites.items
          : [],
      },
      preferences: {
        theme: ['light', 'dark'].includes(parsedState.preferences?.theme)
          ? parsedState.preferences.theme
          : getPreferredTheme(),
        lastSearch: parsedState.preferences?.lastSearch || '',
        recentSearches: Array.isArray(parsedState.preferences?.recentSearches)
          ? parsedState.preferences.recentSearches.slice(0, 5)
          : [],
      },
    };
  } catch {
    return undefined;
  }
};

export const savePersistedState = (state) => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        auth: state.auth,
        favorites: state.favorites,
        preferences: state.preferences,
      }),
    );
  } catch {
    return false;
  }

  return true;
};

export const getPreferredTheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
