import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#719B8D',
      contrastText: '#ffffff',
      dark: '#446d60',
      light: '#a0ccbd',
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
  // typography: {
  //   fontFamily: roboto.style.fontFamily,
  // },
});

export default theme;
