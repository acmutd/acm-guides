import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import './styles.css';

const Home = React.lazy(() => import('./pages/Home'));
const DocsLayout = React.lazy(() => import('./docs/DocsLayout'));
const NotFound = React.lazy(() => import('./components/NotFound'));

const router = createBrowserRouter([
  { path: '/', element: <Suspense><Home /></Suspense> },
  { path: '/docs/*', element: <Suspense><DocsLayout /></Suspense> },
  { path: '*', element: <Suspense><NotFound /></Suspense> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
