import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from 'lib/theme';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
