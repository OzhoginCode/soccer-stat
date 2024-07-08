import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';

import Breadcrumbs from './Breadcrumbs.jsx';
import MatchesTable from './MatchesTable.jsx';
import ErrorModal from './ErrorModal.jsx';

import client from '../tools/apiClient.js';
import paths from '../tools/paths.js';

const TeamCalendar = () => {
  const [matches, setMatches] = useState([]);
  const [teamName, setTeamName] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const params = {
      dateFrom: dateRange.startDate,
      dateTo: dateRange.endDate,
    };
    const fetchMatches = async () => {
      try {
        const resp = await client.get(paths.teamMatches(id), { params });
        setMatches(resp.data.matches);
        setCurrentPage(1);
      } catch (err) {
        if (err.response.status === 429) setModalOpen(true);
      }
    };
    fetchMatches();
  }, [id, dateRange]);

  useEffect(() => {
    const fetchTeamName = async () => {
      try {
        const resp = await client.get(paths.team(id));
        setTeamName(resp.data.name);
      } catch (err) {
        if (err.response.status === 429) setModalOpen(true);
      }
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
      <ErrorModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default TeamCalendar;
