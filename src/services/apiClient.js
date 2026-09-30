import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 10000,
  params: { language: 'en-US' },
});

const isApiKey = (credential) => /^[a-f0-9]{32}$/i.test(credential);

apiClient.interceptors.request.use((config) => {
  const credential = process.env.REACT_APP_TMDB_API_TOKEN?.trim();

  if (!credential) {
    const error = new Error('TMDb token is not configured.');
    error.code = 'TMDB_TOKEN_MISSING';
    return Promise.reject(error);
  }

  if (isApiKey(credential)) {
    config.params = { ...config.params, api_key: credential };
  } else {
    config.headers.Authorization = `Bearer ${credential}`;
  }

  config.headers.Accept = 'application/json';
  return config;
});

export default apiClient;
