import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage/index.ts';
import Leagues from './pages/Leagues/index.ts';
import LeagueCalendar from './pages/LeagueCalendar/index.ts';
import Teams from './pages/Teams/index.ts';
import TeamCalendar from './pages/TeamCalendar/index.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to="/leagues" />,
      },
      {
        path: 'leagues',
        element: <Leagues />,
      },
      {
        path: 'leagues/:id',
        element: <LeagueCalendar />,
      },
      {
        path: 'teams',
        element: <Teams />,
      },
      {
        path: 'teams/:id',
        element: <TeamCalendar />,
      },
    ],
  },
], { basename: '/soccer-stat' });

export default router;
