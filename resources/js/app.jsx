import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Create a custom MUI theme with the specified font family
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'system-ui',
      '"Segoe UI"',
      'Roboto',
      'Noto',
      'Oxygen-Sans',
      'Ubuntu',
      'Cantrell',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: [
            '-apple-system',
            'system-ui',
            '"Segoe UI"',
            'Roboto',
            'Noto',
            'Oxygen-Sans',
            'Ubuntu',
            'Cantrell',
            '"Helvetica Neue"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
  },
});

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App {...props} />
        </ThemeProvider>
      </Provider>,
    );
  },
  progress: {
    color: '#4B5563',
  },
});
