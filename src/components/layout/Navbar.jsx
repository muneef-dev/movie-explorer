import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { logout } from '../../features/auth/authSlice';
import { toggleTheme } from '../../features/preferences/preferencesSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const username = useSelector((state) => state.auth.username);
  const themeMode = useSelector((state) => state.preferences.theme);
  const favoriteCount = useSelector((state) => state.favorites.items.length);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const navItems = [
    { label: 'Discover', to: '/', icon: <HomeRoundedIcon /> },
    {
      label: `Favorites${favoriteCount ? ` (${favoriteCount})` : ''}`,
      to: '/favorites',
      icon: <FavoriteRoundedIcon />,
    },
  ];

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ backdropFilter: 'blur(18px)', borderBottom: 1, borderColor: 'divider' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 66, md: 76 } }}>
          <Stack
            component={RouterLink}
            to="/"
            direction="row"
            spacing={1.2}
            sx={{ textDecoration: 'none', color: 'text.primary', mr: 'auto', alignItems: 'center' }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                display: 'grid',
                placeItems: 'center',
                borderRadius: '50% 50% 45% 55%',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontFamily: 'serif',
                fontWeight: 900,
              }}
            >
              R
            </Box>
            <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif' }}>
              Reel Atlas
            </Typography>
          </Stack>

          <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button key={item.to} component={RouterLink} to={item.to} color="inherit">
                {item.label}
              </Button>
            ))}
            <Tooltip title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}>
              <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
                {themeMode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </IconButton>
            </Tooltip>
            <Divider flexItem orientation="vertical" sx={{ mx: 1 }} />
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 14 }}>
              {username.slice(0, 1).toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ px: 0.5 }}>{username}</Typography>
            <Tooltip title="Log out">
              <IconButton onClick={handleLogout} color="inherit"><LogoutRoundedIcon /></IconButton>
            </Tooltip>
          </Stack>

          <IconButton
            aria-label="Open navigation"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: 'none' } }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, p: 2 }} role="navigation">
          <Stack direction="row" spacing={1.5} sx={{ p: 1, mb: 1, alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>{username.slice(0, 1).toUpperCase()}</Avatar>
            <Box>
              <Typography fontWeight={700}>{username}</Typography>
              <Typography variant="caption" color="text.secondary">Movie explorer</Typography>
            </Box>
          </Stack>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItemButton
                key={item.to}
                component={RouterLink}
                to={item.to}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => dispatch(toggleTheme())}>
              <ListItemIcon>
                {themeMode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
              </ListItemIcon>
              <ListItemText primary={`Use ${themeMode === 'dark' ? 'light' : 'dark'} theme`} />
            </ListItemButton>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutRoundedIcon /></ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
