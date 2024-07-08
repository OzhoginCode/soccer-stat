import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';

import client from '../apiClient.js';
import Breadcrumbs from './Breadcrumbs.jsx';
import MatchesTable from './MatchesTable.jsx';

import paths from '../paths.js';

const TeamCalendar = () => {
  const [matches, setMatches] = useState([]);
  const [teamName, setTeamName] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { id } = useParams();

  useEffect(() => {
    const params = {
      dateFrom: dateRange.startDate,
      dateTo: dateRange.endDate,
    };

    const fetchMatches = async () => {
      const resp = await client.get(paths.teamMatches(id), { params });
      setMatches(resp.data.matches);
      setCurrentPage(1);
    };
    fetchMatches();
  }, [id, dateRange]);

  useEffect(() => {
    const fetchTeamName = async () => {
      const resp = await client.get(paths.team(id));
      setTeamName(resp.data.name);
    };
    fetchTeamName();
  }, [id]);

  return (
    <>
      <Breadcrumbs itemName={teamName} />
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
        matches={matches}
      />
    </>
  );
};

export default TeamCalendar;
