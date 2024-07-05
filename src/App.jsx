import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        {`count is ${count}`}
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="leagues">Лиги</Link>
          </li>
          <li>
            <Link to="teams">Команды</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;
