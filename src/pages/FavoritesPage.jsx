import { useSelector } from 'react-redux';
import { Container, Stack, Typography } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MovieGrid from '../components/movies/MovieGrid';
import EmptyState from '../components/common/EmptyState';

const FavoritesPage = () => {
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 5, md: 8 } }}>
      <Stack direction="row" gap={1.5} sx={{ mb: 1, alignItems: 'center' }}>
        <FavoriteRoundedIcon color="primary" />
        <Typography variant="overline" color="primary.main" fontWeight={700}>Your collection</Typography>
      </Stack>
      <Typography variant="h2" sx={{ fontSize: { xs: '2.8rem', md: '4.5rem' }, mb: 1 }}>
        Films worth returning to
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 5, maxWidth: 650 }}>
        Your favorites live in this browser, ready whenever you return.
      </Typography>
      {favorites.length ? (
        <MovieGrid movies={favorites} />
      ) : (
        <EmptyState
          title="Your shelf is waiting"
          message="Tap the heart on any movie to build a personal watchlist."
          actionLabel="Discover movies"
          actionTo="/"
        />
      )}
    </Container>
  );
};

export default FavoritesPage;
