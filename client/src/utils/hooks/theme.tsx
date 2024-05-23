import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Assistant, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 400,
          padding: '16px 40px',
          textTransform: 'capitalize',
        },
        outlined: {
          border: '1px solid black',
          color: 'black',
          '&:hover': {
            color: {xs: 'black', md:'white'},
            backgroundColor: {md:'black', xs: 'white'},
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
  breakpoints: {
    values: {
      xs: 0, // custom breakpoint for extra small devices
      sm: 640, // custom breakpoint for small devices
      md: 768, // default medium breakpoint
      lg: 1024, // default large breakpoint
      xl: 1280, // default extra-large breakpoint
    },
  },
});
