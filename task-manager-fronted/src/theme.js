import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF', // A nice, modern purple
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // Use the Poppins font
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Give buttons slightly rounded corners
          textTransform: 'none', // Use normal case for button text
        },
      },
    },
  },
});