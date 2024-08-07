import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from './App';

import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import Leagues from './pages/Leagues/Leagues.jsx';
import LeagueCalendar from './pages/LeagueCalendar/LeagueCalendar.jsx';
import Teams from './pages/Teams/Teams.jsx';
import TeamCalendar from './pages/TeamCalendar/TeamCalendar.jsx';

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
