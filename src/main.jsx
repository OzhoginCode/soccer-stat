import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';

import router from './router.jsx';

const queryClient = new QueryClient();

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);

root.render((
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
));
