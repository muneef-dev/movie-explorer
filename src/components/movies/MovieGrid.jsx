import { Box } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: 'repeat(2, minmax(0, 1fr))',
        sm: 'repeat(3, minmax(0, 1fr))',
        md: 'repeat(4, minmax(0, 1fr))',
        lg: 'repeat(5, minmax(0, 1fr))',
      },
      gap: { xs: 1.5, sm: 2.5, lg: 3 },
    }}
  >
    {movies.map((movie, index) => (
      <MovieCard key={movie.id} movie={movie} index={index} />
    ))}
  </Box>
);

export default MovieGrid;
