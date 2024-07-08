import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Leagues from './pages/Leagues.jsx';
import LeagueCalendar from './pages/LeagueCalendar.jsx';
import Teams from './pages/Teams.jsx';
import TeamCalendar from './pages/TeamCalendar.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
