import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './store/root/config.store.ts';
import { BrowserRouter } from 'react-router-dom';
import Routers from './Routers/Routers.tsx';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/hooks/theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <ToastContainer autoClose={1500} />
          <Routers />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
