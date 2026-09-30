import apiClient from './apiClient';

const applyRequestInterceptor = (config = {}) => {
  const interceptor = apiClient.interceptors.request.handlers[0].fulfilled;
  return interceptor({ headers: {}, params: {}, ...config });
};

describe('TMDb API client authentication', () => {
  const originalToken = process.env.REACT_APP_TMDB_API_TOKEN;

  afterEach(() => {
    process.env.REACT_APP_TMDB_API_TOKEN = originalToken;
  });

  it('sends a TMDb v3 API key as a query parameter', async () => {
    process.env.REACT_APP_TMDB_API_TOKEN = '1234567890abcdef1234567890abcdef';

    const config = await applyRequestInterceptor({ params: { page: 2 } });

    expect(config.params).toEqual({
      page: 2,
      api_key: '1234567890abcdef1234567890abcdef',
    });
    expect(config.headers.Authorization).toBeUndefined();
  });

  it('sends an API Read Access Token as a Bearer header', async () => {
    process.env.REACT_APP_TMDB_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.read-access-token';

    const config = await applyRequestInterceptor();

    expect(config.headers.Authorization).toBe(
      'Bearer eyJhbGciOiJIUzI1NiJ9.read-access-token'
    );
    expect(config.params.api_key).toBeUndefined();
  });

  it('rejects requests when no credential is configured', async () => {
    process.env.REACT_APP_TMDB_API_TOKEN = '';

    await expect(applyRequestInterceptor()).rejects.toMatchObject({
      code: 'TMDB_TOKEN_MISSING',
      message: 'TMDb token is not configured.',
    });
  });
});
