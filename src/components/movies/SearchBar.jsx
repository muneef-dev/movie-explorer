import { useEffect, useState } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const searchFormSx = {
  p: { xs: 1.2, sm: 1.5 },
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 1,
  alignItems: 'flex-start',
  border: 1,
  borderColor: 'divider',
  maxWidth: 820,
};

export const searchActionsSx = {
  display: 'flex',
  gap: 1,
  width: { xs: '100%', sm: 'auto' },
  justifyContent: 'flex-end',
};

const SearchBar = ({ initialQuery = '', recentSearches = [], onSearch, onClear, loading }) => {
  const [query, setQuery] = useState(initialQuery);
  const [error, setError] = useState('');

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  const submit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError('Enter a movie title to search.');
      return;
    }
    setError('');
    onSearch(trimmedQuery);
  };

  const clear = () => {
    setQuery('');
    setError('');
    onClear();
  };

  return (
    <Paper
      component="form"
      onSubmit={submit}
      elevation={8}
      sx={searchFormSx}
    >
      <Autocomplete
        freeSolo
        fullWidth
        options={recentSearches}
        inputValue={query}
        onInputChange={(_, value) => {
          setQuery(value);
          if (value) setError('');
        }}
        onChange={(_, value) => value && setQuery(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search by title — try Dune, Parasite, or Arrival"
            error={Boolean(error)}
            helperText={error}
            size="small"
            slotProps={{
              ...params.slotProps,
              htmlInput: {
                ...params.slotProps.htmlInput,
                'aria-label': 'Search movies',
              },
              input: {
                ...params.slotProps.input,
                startAdornment: (
                  <>
                    <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment>
                    {params.slotProps.input.startAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
      <Box sx={searchActionsSx}>
        {initialQuery && (
          <Button aria-label="Clear search" color="inherit" onClick={clear} sx={{ minWidth: 44, px: 1 }}>
            <CloseRoundedIcon />
          </Button>
        )}
        <Button type="submit" variant="contained" disabled={loading} sx={{ minHeight: 40 }}>
          Search
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchBar;
