import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';
import { deepOrange } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
    background: {
      default: '#eee',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export default theme;
