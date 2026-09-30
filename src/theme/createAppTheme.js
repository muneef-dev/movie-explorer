import { alpha, createTheme } from '@mui/material/styles';

export const createAppTheme = (mode) => {
  const isDark = mode === 'dark';
  const ink = isDark ? '#f8f0e4' : '#171412';
  const paper = isDark ? '#11100f' : '#f6f0e7';
  const surface = isDark ? '#1c1917' : '#fffaf2';
  const accent = '#e6a63b';

  return createTheme({
    palette: {
      mode,
      primary: { main: accent, contrastText: '#17120b' },
      secondary: { main: isDark ? '#7fa99a' : '#35685a' },
      background: { default: paper, paper: surface },
      text: { primary: ink, secondary: isDark ? '#b9afa3' : '#6b625b' },
      divider: alpha(ink, 0.13),
      error: { main: '#d45c4c' },
    },
    typography: {
      fontFamily: '"DM Sans", sans-serif',
      h1: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
      h2: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
      h3: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
      h4: { fontFamily: '"Playfair Display", serif', fontWeight: 700 },
      button: { fontWeight: 700, letterSpacing: '0.04em' },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 999, textTransform: 'none', paddingInline: 20 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${alpha(ink, 0.1)}`,
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiOutlinedInput: {
        styleOverrides: { root: { borderRadius: 12 } },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundImage: isDark
              ? 'radial-gradient(circle at 15% 10%, rgba(230,166,59,.08), transparent 30%), radial-gradient(circle at 90% 40%, rgba(65,112,98,.08), transparent 35%)'
              : 'radial-gradient(circle at 15% 10%, rgba(230,166,59,.13), transparent 30%), radial-gradient(circle at 90% 40%, rgba(65,112,98,.08), transparent 35%)',
            backgroundAttachment: 'fixed',
          },
          '::selection': { backgroundColor: accent, color: '#17120b' },
        },
      },
    },
  });
};
