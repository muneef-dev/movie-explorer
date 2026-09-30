import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { login } from '../features/auth/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!values.username.trim()) nextErrors.username = 'Enter your username.';
    if (!values.password) nextErrors.password = 'Enter your password.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    dispatch(login(values.username));
    navigate(location.state?.from || '/', { replace: true });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', py: 4, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Paper
          elevation={16}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.15fr .85fr' },
            overflow: 'hidden',
            minHeight: { md: 650 },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              p: { xs: 4, md: 7 },
              minHeight: { xs: 340, md: 'auto' },
              color: '#fff8ec',
              bgcolor: '#171412',
              backgroundImage:
                'linear-gradient(115deg, rgba(23,20,18,.93), rgba(23,20,18,.4)), url(https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="overline" sx={{ letterSpacing: '.22em', color: 'primary.main' }}>
              Your personal cinema index
            </Typography>
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '5.2rem' }, lineHeight: .92 }}>
                Find your next
                <Box component="span" sx={{ display: 'block', color: 'primary.main', fontStyle: 'italic' }}>
                  great watch.
                </Box>
              </Typography>
              <Typography sx={{ mt: 3, maxWidth: 500, color: 'rgba(255,248,236,.75)', fontSize: '1.05rem' }}>
                Search the world of film, follow what is trending, and build a shelf of personal favorites.
              </Typography>
            </Box>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 4, sm: 6, md: 7 }, display: 'flex', alignItems: 'center' }}>
            <Stack spacing={3} sx={{ width: '100%' }}>
              <Box>
                <Typography variant="overline" color="primary.main" fontWeight={700}>Demo access</Typography>
                <Typography variant="h3" sx={{ mt: .5 }}>Welcome to Reel Atlas</Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Use any username and password. Credentials are never sent or stored.
                </Typography>
              </Box>
              <Divider />
              <TextField
                label="Username"
                autoComplete="username"
                value={values.username}
                error={Boolean(errors.username)}
                helperText={errors.username}
                onChange={(event) => setValues({ ...values, username: event.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><PersonOutlineRoundedIcon /></InputAdornment>,
                  },
                }}
              />
              <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                value={values.password}
                error={Boolean(errors.password)}
                helperText={errors.password}
                onChange={(event) => setValues({ ...values, password: event.target.value })}
                slotProps={{
                  input: {
                    startAdornment: <InputAdornment position="start"><LockOutlinedIcon /></InputAdornment>,
                  },
                }}
              />
              <Button type="submit" variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />}>
                Enter the archive
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                This is a frontend demonstration, not production authentication.
              </Typography>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
