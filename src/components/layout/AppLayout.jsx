import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const AppLayout = () => (
  <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Navbar />
    <Box component="main" id="main-content" sx={{ minHeight: 'calc(100vh - 76px)' }}>
      <Outlet />
    </Box>
  </>
);

export default AppLayout;
