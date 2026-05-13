// import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { ThemeProvider } from '@/components/theme-provider';
import { Provider } from 'react-redux';
import { store } from './store/configure-store';
import RoutesApp from './app/auth/routes.tsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <RouterProvider router={RoutesApp} />
      <ToastContainer />
    </ThemeProvider>
  </Provider>,
);
