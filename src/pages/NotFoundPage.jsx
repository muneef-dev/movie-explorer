import { Button, Container, Stack, Typography } from '@mui/material';
import ExploreOffRoundedIcon from '@mui/icons-material/ExploreOffRounded';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => (
  <Container maxWidth="sm" sx={{ py: 12 }}>
    <Stack spacing={2} sx={{ alignItems: 'center', textAlign: 'center' }}>
      <ExploreOffRoundedIcon color="primary" sx={{ fontSize: 72 }} />
      <Typography variant="overline" color="primary.main">404 — off the map</Typography>
      <Typography variant="h2">This reel does not exist.</Typography>
      <Typography color="text.secondary">The page may have moved, or the link may be incomplete.</Typography>
      <Button variant="contained" component={RouterLink} to="/">Return to discovery</Button>
    </Stack>
  </Container>
);

export default NotFoundPage;
