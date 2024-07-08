import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Leagues from './components/Leagues.jsx';
import LeagueCalendar from './components/LeagueCalendar.jsx';
import Teams from './components/Teams.jsx';
import TeamCalendar from './components/TeamCalendar.jsx';

const router = createBrowserRouter([
  {
    path: '/soccer-stat/',
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
]);

export default router;
