import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App';

import ErrorPage from './pages/ErrorPage';
import Leagues from './pages/Leagues';
import LeagueCalendar from './pages/LeagueCalendar';
import Teams from './pages/Teams';
import TeamCalendar from './pages/TeamCalendar';

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
