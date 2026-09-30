const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const posterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const backdropUrl = (path, size = 'original') =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

export const profileUrl = (path) =>
  path ? `${IMAGE_BASE_URL}/w185${path}` : null;
