import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LocalFireDepartmentRoundedIcon from '@mui/icons-material/LocalFireDepartmentRounded';
import SearchBar from '../components/movies/SearchBar';
import FilterBar from '../components/movies/FilterBar';
import MovieGrid from '../components/movies/MovieGrid';
import LoadingGrid from '../components/common/LoadingGrid';
import EmptyState from '../components/common/EmptyState';
import ErrorState from '../components/common/ErrorState';
import { clearFilters } from '../features/filters/filtersSlice';
import { loadGenres, loadMovies } from '../features/movies/moviesSlice';
import { clearLastSearch, setLastSearch } from '../features/preferences/preferencesSlice';

export const getRetryPage = ({ items, page }) =>
  items.length ? page + 1 : Math.max(page, 1);

const HomePage = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const filters = useSelector((state) => state.filters);
  const preferences = useSelector((state) => state.preferences);

  useEffect(() => {
    if (movies.genresStatus === 'idle') dispatch(loadGenres());
    if (movies.status === 'idle') {
      dispatch(
        loadMovies({
          mode: preferences.lastSearch ? 'search' : 'trending',
          query: preferences.lastSearch,
          page: 1,
        }),
      );
    }
  }, [dispatch, movies.genresStatus, movies.status, preferences.lastSearch]);

  const filteredMovies = useMemo(
    () =>
      movies.items.filter((movie) => {
        const matchesGenre = !filters.genre || movie.genre_ids?.includes(Number(filters.genre));
        const matchesYear = !filters.year || movie.release_date?.startsWith(String(filters.year));
        const matchesRating = !filters.rating || movie.vote_average >= filters.rating;
        return matchesGenre && matchesYear && matchesRating;
      }),
    [movies.items, filters],
  );

  const handleSearch = (query) => {
    dispatch(clearFilters());
    dispatch(setLastSearch(query));
    dispatch(loadMovies({ mode: 'search', query, page: 1 }));
  };

  const handleClearSearch = () => {
    dispatch(clearFilters());
    dispatch(clearLastSearch());
    dispatch(loadMovies({ mode: 'trending', page: 1 }));
  };

  const retry = () =>
    dispatch(
      loadMovies({
        mode: movies.mode,
        query: movies.query,
        page: getRetryPage(movies),
      }),
    );

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Stack direction={{ xs: 'column', lg: 'row' }} gap={{ xs: 4, lg: 8 }} sx={{ alignItems: { lg: 'flex-end' } }}>
            <Box sx={{ maxWidth: 690 }}>
              <Chip
                icon={<LocalFireDepartmentRoundedIcon />}
                label="Curated from this week's pulse"
                color="primary"
                variant="outlined"
                sx={{ mb: 2.5 }}
              />
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', sm: '4.5rem', md: '6rem' }, lineHeight: .9 }}>
                Cinema, mapped
                <Box component="span" sx={{ color: 'primary.main' }}> for you.</Box>
              </Typography>
            </Box>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Typography color="text.secondary" sx={{ mb: 2, maxWidth: 720 }}>
                Trace the films people are talking about, or search the archive for an old favorite.
              </Typography>
              <SearchBar
                initialQuery={preferences.lastSearch}
                recentSearches={preferences.recentSearches}
                onSearch={handleSearch}
                onClear={handleClearSearch}
                loading={movies.status === 'loading'}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} gap={1} sx={{ justifyContent: 'space-between', alignItems: { sm: 'flex-end' } }}>
          <Box>
            <Typography variant="overline" color="primary.main" fontWeight={700}>
              {movies.mode === 'search' ? 'Search results' : 'Trending now'}
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              {movies.mode === 'search' ? `Films matching “${movies.query}”` : 'The weekly watchlist'}
            </Typography>
          </Box>
          {movies.status === 'succeeded' && (
            <Typography color="text.secondary">
              {filteredMovies.length} of {movies.items.length} loaded titles
            </Typography>
          )}
        </Stack>
        <FilterBar />
        <Divider sx={{ mb: 3 }} />

        {movies.status === 'loading' && movies.page <= 1 && <LoadingGrid />}
        {movies.status === 'failed' && <ErrorState message={movies.error?.message} onRetry={retry} />}
        {movies.status === 'succeeded' && filteredMovies.length === 0 && (
          <EmptyState
            title={movies.items.length ? 'No films match those filters' : 'No films found'}
            message={movies.items.length ? 'Clear a filter to widen the selection.' : 'Try another movie title.'}
            actionLabel={movies.items.length ? 'Clear filters' : 'Show trending'}
            onAction={movies.items.length ? () => dispatch(clearFilters()) : handleClearSearch}
          />
        )}
        {filteredMovies.length > 0 && <MovieGrid movies={filteredMovies} />}

        {movies.items.length > 0 && movies.page < movies.totalPages && (
          <Stack sx={{ mt: 5, alignItems: 'center' }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<AddRoundedIcon />}
              disabled={movies.status === 'loading'}
              onClick={() =>
                dispatch(loadMovies({ mode: movies.mode, query: movies.query, page: movies.page + 1 }))
              }
            >
              {movies.status === 'loading' ? 'Loading the next reel…' : 'Load more films'}
            </Button>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default HomePage;
