import { Alert, AlertTitle, Button, Stack } from '@mui/material';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';

const ErrorState = ({ message, onRetry }) => (
  <Alert severity="error" variant="outlined" sx={{ alignItems: 'center' }}>
    <AlertTitle>We hit a snag</AlertTitle>
    <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} sx={{ alignItems: 'flex-start' }}>
      <span>{message || 'Movies are temporarily unavailable.'}</span>
      {onRetry && (
        <Button
          color="inherit"
          size="small"
          startIcon={<ReplayRoundedIcon />}
          onClick={onRetry}
        >
          Try again
        </Button>
      )}
    </Stack>
  </Alert>
);

export default ErrorState;
