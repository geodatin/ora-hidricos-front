import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './assets/css/styles.css';
import ChartDefaults from './constants/chartDefaults';
import { ThemeProvider } from './contexts/theming';
import Routes from './routes';
import 'fontsource-roboto';
import './i18n/config';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ChartDefaults />
        <CssBaseline />
        <Routes />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
