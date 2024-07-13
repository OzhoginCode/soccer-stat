import { Outlet } from 'react-router-dom';

import Navigation from './components/Navigation.jsx';

const App = () => (
  <div className="min-h-full">
    <Navigation />
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-16">
        <Outlet />
      </div>
    </main>
  </div>
);

export default App;
