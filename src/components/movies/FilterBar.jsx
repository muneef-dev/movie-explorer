import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import FilterAltOffRoundedIcon from '@mui/icons-material/FilterAltOffRounded';
import {
  clearFilters,
  setGenre,
  setRating,
  setYear,
} from '../../features/filters/filtersSlice';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 60 }, (_, index) => currentYear + 1 - index);

const FilterBar = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const genres = useSelector((state) => state.movies.genres);
  const hasFilters = filters.genre || filters.year || filters.rating > 0;

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      gap={2}
      sx={{ py: 2.5, alignItems: { md: 'center' } }}
    >
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="genre-label">Genre</InputLabel>
        <Select
          labelId="genre-label"
          label="Genre"
          value={filters.genre}
          onChange={(event) => dispatch(setGenre(event.target.value))}
        >
          <MenuItem value="">All genres</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="year-label">Year</InputLabel>
        <Select
          labelId="year-label"
          label="Year"
          value={filters.year}
          onChange={(event) => dispatch(setYear(event.target.value))}
        >
          <MenuItem value="">Any year</MenuItem>
          {years.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
        </Select>
      </FormControl>
      <Box sx={{ minWidth: { xs: '100%', md: 220 }, px: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Minimum rating: {filters.rating || 'Any'}
        </Typography>
        <Slider
          size="small"
          value={filters.rating}
          min={0}
          max={9}
          step={1}
          marks
          valueLabelDisplay="auto"
          aria-label="Minimum rating"
          onChange={(_, value) => dispatch(setRating(value))}
        />
      </Box>
      {hasFilters && (
        <Button
          color="inherit"
          startIcon={<FilterAltOffRoundedIcon />}
          onClick={() => dispatch(clearFilters())}
        >
          Clear filters
        </Button>
      )}
    </Stack>
  );
};

export default FilterBar;
