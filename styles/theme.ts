import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: blue,
    secondary: deepOrange,
  },
  typography: {
    fontFamily: 'Roboto',
  },
  props: {
    MuiLink: {
      underline: 'none',
    },
  },
});

export default theme;
