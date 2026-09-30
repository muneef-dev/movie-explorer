import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  params: { language: 'en-US' },
});

apiClient.interceptors.request.use((config) => {
  const token = process.env.REACT_APP_TMDB_API_TOKEN;

  if (!token) {
    const error = new Error('TMDb token is not configured.');
    error.code = 'TMDB_TOKEN_MISSING';
    return Promise.reject(error);
  }

  config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = 'application/json';
  return config;
});

export default apiClient;
