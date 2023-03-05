import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2B87AE',
      contrastText: '#ffffff',
      dark: '#257596',
      light: '#EDFAFF',
    },
    secondary: {
      main: '#4d6706',
      contrastText: '#ffffff',
      dark: '#151f00',
      light: '#ceef83',
    },
    error: {
      main: '#ba1a1a',
    },
    background: {
      paper: '#fffbff',
    },
  },
  typography: {
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

export default theme;
