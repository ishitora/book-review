import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      main: '#00bcd4',
      dark: '#0097a7',
      light: '#80deea',
      50: '#e0f7fa',
      100: '#b2ebf2',
      200: '#80deea',
      300: '#4dd0e1',
      400: '#26c6da',
      500: '#00bcd4',
      600: '#00acc1',
      700: '#0097a7',
      800: '#00838f',
      900: '#006064',
    },
  },
  styles: {
    global: {
      svg: {
        color: 'primary.700',
      },

      a: {
        color: 'primary.700',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },

  defaultProps: {
    colorScheme: 'primary',
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'primary' },
    },
    Input: {
      defaultProps: { colorScheme: 'primary' },
    },
    Heading: {
      defaultProps: { colorScheme: 'primary' },
    },
  },
});
console.log(theme);
export default theme;
