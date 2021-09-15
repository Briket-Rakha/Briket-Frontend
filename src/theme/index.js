import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#287094',
    },
    secondary: {
      main: '#F6F6F6',
    },
    ternary: {
      main: '#023246',
    },
    accent: {
      main: '#D4D4CE',
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
