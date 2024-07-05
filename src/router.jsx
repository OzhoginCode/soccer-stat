import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import LeagueList from './components/LeagueList.jsx';
import LeagueDetail from './components/LeagueDetail.jsx';
import TeamList from './components/TeamList.jsx';
import TeamDetail from './components/TeamDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'leagues',
        element: <LeagueList />,
      },
      {
        path: 'leagues/:id',
        element: <LeagueDetail />,
      },
      {
        path: 'teams',
        element: <TeamList />,
      },
      {
        path: 'teams/:id',
        element: <TeamDetail />,
      },
    ],
  },
]);

export default router;
