import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import ErrorState from '../components/common/ErrorState';
import MovieGrid from '../components/movies/MovieGrid';
import TrailerDialog from '../components/movies/TrailerDialog';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import {
  clearMovieDetails,
  loadMovieDetails,
} from '../features/movieDetails/movieDetailsSlice';
import { formatDate, formatRuntime, formatVote } from '../utils/formatters';
import { backdropUrl, posterUrl, profileUrl } from '../utils/tmdbImages';

export const movieMetadataLayout = {
  direction: { xs: 'column', sm: 'row' },
  sx: {
    my: 3,
    color: 'rgba(255,248,236,.78)',
    flexWrap: { xs: 'nowrap', sm: 'wrap' },
    alignItems: { xs: 'flex-start', sm: 'center' },
    columnGap: 2.5,
    rowGap: { xs: 1, sm: 2.5 },
  },
};

export const movieTitleSx = {
  fontSize: { xs: 'clamp(2.35rem, 12vw, 3.2rem)', sm: '4.6rem', md: '6.2rem' },
  lineHeight: 0.9,
  overflowWrap: 'anywhere',
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { item: movie, status, error } = useSelector((state) => state.movieDetails);
  const isFavorite = useSelector((state) =>
    state.favorites.items.some((item) => item.id === Number(movieId)),
  );

  useEffect(() => {
    dispatch(loadMovieDetails(movieId));
    return () => dispatch(clearMovieDetails());
  }, [dispatch, movieId]);

  const trailer = useMemo(() => {
    const videos = movie?.videos?.results || [];
    return (
      videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official) ||
      videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer')
    );
  }, [movie]);

  if (status === 'loading' || status === 'idle') {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Skeleton width={140} height={44} />
        <Skeleton variant="rounded" height={520} sx={{ mt: 2 }} />
      </Container>
    );
  }

  if (status === 'failed') {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <ErrorState message={error?.message} onRetry={() => dispatch(loadMovieDetails(movieId))} />
      </Container>
    );
  }

  if (!movie) return null;

  const cast = movie.credits?.cast?.slice(0, 8) || [];
  const recommendations = movie.recommendations?.results?.slice(0, 5) || [];
  const backdrop = backdropUrl(movie.backdrop_path);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 680, md: 620 },
          display: 'flex',
          alignItems: 'flex-end',
          color: '#fff8ec',
          backgroundColor: '#171412',
          backgroundImage: backdrop
            ? `linear-gradient(90deg, rgba(17,16,15,.98) 8%, rgba(17,16,15,.72) 55%, rgba(17,16,15,.45)), linear-gradient(0deg, #11100f 0%, transparent 45%), url(${backdrop})`
            : 'linear-gradient(135deg, #11100f, #33291d)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 5, md: 7 } }}>
          <Button color="inherit" startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate(-1)} sx={{ mb: 4 }}>
            Back
          </Button>
          <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 4, md: 6 }} sx={{ alignItems: { md: 'flex-end' } }}>
            <Paper sx={{ width: { xs: 180, sm: 230, md: 280 }, overflow: 'hidden', flexShrink: 0, bgcolor: '#28231f' }}>
              {movie.poster_path ? (
                <Box component="img" src={posterUrl(movie.poster_path, 'w780')} alt={`${movie.title} poster`} sx={{ width: '100%' }} />
              ) : (
                <Box sx={{ aspectRatio: '2 / 3', display: 'grid', placeItems: 'center' }}><TheatersRoundedIcon sx={{ fontSize: 72 }} /></Box>
              )}
            </Paper>
            <Box sx={{ maxWidth: 850, minWidth: 0 }}>
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
                {movie.genres?.map((genre) => <Chip key={genre.id} label={genre.name} variant="outlined" sx={{ color: 'inherit', borderColor: 'rgba(255,255,255,.3)' }} />)}
              </Stack>
              <Typography variant="h1" sx={movieTitleSx}>
                {movie.title}
              </Typography>
              {movie.tagline && <Typography variant="h6" sx={{ mt: 2, color: 'primary.main', fontStyle: 'italic' }}>{movie.tagline}</Typography>}
              <Stack {...movieMetadataLayout}>
                <Stack direction="row" gap={0.5} sx={{ alignItems: 'center' }}><StarRoundedIcon color="primary" /> {formatVote(movie.vote_average)} / 10</Stack>
                <span>{formatDate(movie.release_date)}</span>
                <span>{formatRuntime(movie.runtime)}</span>
                <span>{movie.original_language?.toUpperCase()}</span>
              </Stack>
              <Typography sx={{ maxWidth: 780, color: 'rgba(255,248,236,.82)', fontSize: { md: '1.1rem' }, lineHeight: 1.75 }}>
                {movie.overview || 'No overview is available for this film.'}
              </Typography>
              <Stack direction="row" gap={1.5} sx={{ mt: 4 }}>
                {trailer && (
                  <Button variant="contained" size="large" startIcon={<PlayArrowRoundedIcon />} onClick={() => setTrailerOpen(true)}>
                    Watch trailer
                  </Button>
                )}
                <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
                  <IconButton
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={() => dispatch(toggleFavorite(movie))}
                    sx={{ color: isFavorite ? 'primary.main' : 'inherit', border: 1, borderColor: 'rgba(255,255,255,.35)' }}
                  >
                    {isFavorite ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 9 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 320px' }, gap: 6 }}>
          <Box>
            <Typography variant="overline" color="primary.main" fontWeight={700}>Top billing</Typography>
            <Typography variant="h3" sx={{ mb: 3 }}>Cast</Typography>
            {cast.length ? (
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 2 }}>
                {cast.map((person) => (
                  <Paper key={person.credit_id} variant="outlined" sx={{ overflow: 'hidden' }}>
                    <Box sx={{ aspectRatio: '1 / 1.18', bgcolor: 'action.hover', overflow: 'hidden' }}>
                      {person.profile_path ? (
                        <Box component="img" src={profileUrl(person.profile_path)} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}><TheatersRoundedIcon color="disabled" /></Box>}
                    </Box>
                    <Box sx={{ p: 1.5 }}>
                      <Typography variant="body2" fontWeight={700}>{person.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{person.character || 'Role unavailable'}</Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            ) : <Typography color="text.secondary">Cast information is unavailable.</Typography>}
          </Box>
          <Paper variant="outlined" sx={{ p: 3, alignSelf: 'start' }}>
            <Typography variant="h5">Production notes</Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2.2}>
              <Box><Typography variant="caption" color="text.secondary">Status</Typography><Typography>{movie.status || 'Unavailable'}</Typography></Box>
              <Box><Typography variant="caption" color="text.secondary">Original title</Typography><Typography>{movie.original_title || movie.title}</Typography></Box>
              <Box><Typography variant="caption" color="text.secondary">Production</Typography><Typography>{movie.production_companies?.map((company) => company.name).join(', ') || 'Unavailable'}</Typography></Box>
              <Box><Typography variant="caption" color="text.secondary">Votes</Typography><Typography>{movie.vote_count?.toLocaleString() || '0'}</Typography></Box>
            </Stack>
          </Paper>
        </Box>

        {recommendations.length > 0 && (
          <Box sx={{ mt: 9 }}>
            <Typography variant="overline" color="primary.main" fontWeight={700}>Keep exploring</Typography>
            <Typography variant="h3" sx={{ mb: 3 }}>Similar coordinates</Typography>
            <MovieGrid movies={recommendations} />
          </Box>
        )}
      </Container>

      <TrailerDialog open={trailerOpen} onClose={() => setTrailerOpen(false)} trailer={trailer} title={movie.title} />
    </>
  );
};

export default MovieDetailsPage;
