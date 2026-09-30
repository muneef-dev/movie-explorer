import { Button, Paper, Stack, Typography } from '@mui/material';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import { Link as RouterLink } from 'react-router-dom';

const EmptyState = ({
  title = 'Nothing on this reel yet',
  message = 'Try a different search or reset your filters.',
  actionLabel,
  actionTo,
  onAction,
}) => (
  <Paper
    variant="outlined"
    sx={{ py: 7, px: 3, textAlign: 'center', borderStyle: 'dashed' }}
  >
    <Stack spacing={1.5} sx={{ alignItems: 'center' }}>
      <MovieFilterOutlinedIcon color="primary" sx={{ fontSize: 48 }} />
      <Typography variant="h5">{title}</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 480 }}>
        {message}
      </Typography>
      {actionLabel && (
        <Button
          variant="contained"
          component={actionTo ? RouterLink : 'button'}
          to={actionTo}
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Stack>
  </Paper>
);

export default EmptyState;
