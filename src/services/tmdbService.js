import apiClient from './apiClient';
import { normalizeError } from '../utils/formatters';

const request = async (path, params = {}) => {
  try {
    const response = await apiClient.get(path, { params });
    return response.data;
  } catch (error) {
    throw normalizeError(error);
  }
};

export const getTrendingMovies = (page = 1) =>
  request('/trending/movie/week', { page });

export const searchMovies = (query, page = 1) =>
  request('/search/movie', { query, page, include_adult: false });

export const getGenres = () => request('/genre/movie/list');

export const getMovieDetails = (movieId) =>
  request(`/movie/${movieId}`, {
    append_to_response: 'credits,videos,recommendations',
  });
