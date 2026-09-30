export const getReleaseYear = (date) => (date ? date.slice(0, 4) : 'TBA');

export const formatRuntime = (minutes) => {
  if (!minutes) return 'Runtime unavailable';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;
};

export const formatDate = (date) => {
  if (!date) return 'Release date unavailable';
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
};

export const formatVote = (vote) =>
  Number.isFinite(vote) ? vote.toFixed(1) : 'N/A';

export const normalizeError = (error) => {
  if (error?.code === 'TMDB_TOKEN_MISSING') {
    return {
      status: 401,
      message: 'Add your TMDb read access token to .env to load movies.',
    };
  }

  const status = error?.response?.status || 0;
  const messages = {
    401: 'The TMDb token is missing or invalid.',
    404: 'That movie could not be found.',
    429: 'TMDb is receiving too many requests. Please wait a moment.',
  };

  return {
    status,
    message:
      messages[status] ||
      (error?.code === 'ECONNABORTED'
        ? 'The request took too long. Please try again.'
        : 'Movies are temporarily unavailable. Please try again.'),
  };
};
