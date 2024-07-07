import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';

import Breadcrumbs from './Breadcrumbs.jsx';
import MatchesTable from './MatchesTable.jsx';

import teams from '../__fixtures__/teams.js';
import matches from '../__fixtures__/matches.js';

const TeamDetail = () => {
  const location = useLocation();
  const [, id] = location.pathname.split('/').filter((x) => x);

  const team = teams.find((t) => t.id === parseInt(id, 10));
  const teamMatches = matches;

  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  return (
    <>
      <Breadcrumbs itemName={team.name} />
      <h2 className="text-5xl mt-3">Матчи</h2>
      <div className="w-72 mt-3">
        <Datepicker
          value={dateRange}
          onChange={setDateRange}
          displayFormat="DD/MM/YYYY"
          placeholder="дд/мм/гггг - дд/мм/гггг"
          separator="-"
          startWeekOn="mon"
          i18n="ru"
          primaryColor="indigo"
        />
      </div>
      <MatchesTable
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        matches={teamMatches}
      />
    </>
  );
};

export default TeamDetail;
