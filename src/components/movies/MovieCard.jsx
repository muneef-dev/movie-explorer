import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import TheatersRoundedIcon from '@mui/icons-material/TheatersRounded';
import { toggleFavorite } from '../../features/favorites/favoritesSlice';
import { formatVote, getReleaseYear } from '../../utils/formatters';
import { posterUrl } from '../../utils/tmdbImages';

const MovieCard = ({ movie, index = 0 }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    state.favorites.items.some((item) => item.id === movie.id),
  );
  const poster = posterUrl(movie.poster_path);

  return (
    <Card
      className="poster-card"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        animationDelay: `${Math.min(index, 10) * 45}ms`,
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: 10 },
      }}
    >
      <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
        <IconButton
          aria-label={isFavorite ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
          onClick={() => dispatch(toggleFavorite(movie))}
          sx={{
            position: 'absolute',
            zIndex: 2,
            right: 10,
            top: 10,
            bgcolor: 'rgba(17,16,15,.78)',
            color: isFavorite ? 'primary.main' : '#fff',
            '&:hover': { bgcolor: 'rgba(17,16,15,.95)' },
          }}
        >
          {isFavorite ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon />}
        </IconButton>
      </Tooltip>
      <CardActionArea component={RouterLink} to={`/movies/${movie.id}`}>
        <Box
          sx={{
            aspectRatio: '2 / 3',
            overflow: 'hidden',
            bgcolor: 'action.hover',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {poster ? (
            <Box
              component="img"
              src={poster}
              alt={`${movie.title} poster`}
              loading="lazy"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Stack spacing={1} sx={{ alignItems: 'center', color: 'text.secondary' }}>
              <TheatersRoundedIcon sx={{ fontSize: 48 }} />
              <Typography variant="caption">Poster unavailable</Typography>
            </Stack>
          )}
        </Box>
        <CardContent sx={{ minHeight: 118 }}>
          <Typography variant="subtitle1" fontWeight={700} noWrap title={movie.title}>
            {movie.title}
          </Typography>
          <Stack direction="row" sx={{ mt: 1.2, justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {getReleaseYear(movie.release_date)}
            </Typography>
            <Chip
              size="small"
              icon={<StarRoundedIcon />}
              label={formatVote(movie.vote_average)}
              sx={{ '& .MuiChip-icon': { color: 'primary.main' } }}
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
