import { Box, Card, Skeleton } from '@mui/material';

const LoadingGrid = ({ count = 10 }) => (
  <Box
    aria-label="Loading movies"
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
      gap: { xs: 2, md: 3 },
    }}
  >
    {Array.from({ length: count }, (_, index) => (
      <Card key={index} sx={{ overflow: 'hidden' }}>
        <Skeleton variant="rectangular" sx={{ aspectRatio: '2 / 3', height: 'auto' }} />
        <Box sx={{ p: 2 }}>
          <Skeleton width="85%" />
          <Skeleton width="45%" />
        </Box>
      </Card>
    ))}
  </Box>
);

export default LoadingGrid;
