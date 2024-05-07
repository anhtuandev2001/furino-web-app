import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
          textTransform: 'capitalize',
        },
        outlined: {
          border: '1px solid black',
          color: 'black',
          '&:hover': {
            color: 'white',
            backgroundColor: 'black',
            borderColor: 'black',
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#000',
    },
  },
});
