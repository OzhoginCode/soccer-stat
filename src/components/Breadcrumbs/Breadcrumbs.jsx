import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import './Breadcrumbs.css';

const Breadcrumbs = ({ itemName }) => {
  const location = useLocation();
  const [tab] = location.pathname.split('/').filter((x) => x);
  const namesTables = {
    teams: 'Команды',
    leagues: 'Лиги',
  };
  const tabName = namesTables[tab];

  return (
    <nav className="breadcrumbs-nav">
      <div className="breadcrumbs-item">
        <Link to={`/${tab}`} className="breadcrumbs-link">
          {tabName}
        </Link>
      </div>

      <ChevronRightIcon className="breadcrumbs-separator" />

      <div className="breadcrumbs-item-last">
        <span>{itemName}</span>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
