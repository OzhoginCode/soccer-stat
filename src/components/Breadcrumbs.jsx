import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const Breadcrumbs = ({ itemName }) => {
  const location = useLocation();
  const [tab] = location.pathname.split('/').filter((x) => x);
  const namesTables = {
    teams: 'Команды',
    leagues: 'Лиги',
  };
  const tabName = namesTables[tab];

  return (
    <nav className="flex items-center space-x-2 text-gray-600 dark:text-gray-500">
      <div className="flex items-center space-x-2">
        <Link to={`/${tab}`} className="hover:text-gray-900 dark:hover:text-gray-400">
          {tabName}
        </Link>
      </div>
      <div className="flex items-center space-x-2 cursor-default">
        <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        <span>{itemName}</span>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
