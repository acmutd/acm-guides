import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import DocsLayout from './docs/DocsLayout';
import { ThemeProvider } from './ThemeContext';
import './styles.css';
import NotFound from './components/NotFound';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/docs/*', element: <DocsLayout /> },
  { path: '*', element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
