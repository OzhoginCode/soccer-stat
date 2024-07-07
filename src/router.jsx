import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Leagues from './components/Leagues.jsx';
import LeagueDetail from './components/LeagueDetail.jsx';
import Teams from './components/Teams.jsx';
import TeamDetail from './components/TeamDetail.jsx';

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
        element: <LeagueDetail />,
      },
      {
        path: 'teams',
        element: <Teams />,
      },
      {
        path: 'teams/:id',
        element: <TeamDetail />,
      },
    ],
  },
]);

export default router;
