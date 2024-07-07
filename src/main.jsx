import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';

import router from './router.jsx';

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);

root.render((
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
));
