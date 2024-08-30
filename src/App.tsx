import { Outlet } from 'react-router-dom';

import Navigation from './components/Navigation/index.ts';

const App = () => (
  <div className="min-h-full">
    <Navigation />
    <main>
      <div className="main-container">
        <Outlet />
      </div>
    </main>
  </div>
);

export default App;
