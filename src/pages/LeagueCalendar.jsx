import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';

import Breadcrumbs from '../components/Breadcrumbs.jsx';
import MatchesTable from '../components/MatchesTable.jsx';
import ErrorModal from '../components/ErrorModal.jsx';

import client from '../tools/apiClient.js';
import paths from '../tools/paths.js';

const LeagueCalendar = () => {
  const [matches, setMatches] = useState([]);
  const [leagueName, setLeagueName] = useState([]);

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

    const fetchData = async () => {
      try {
        const { data } = await client.get(paths.competitionMatches(id), { params });
        setMatches(data.matches);
        setLeagueName(data.competition.name);
        setCurrentPage(1);
      } catch (err) {
        if (err.response.status === 429) setModalOpen(true);
      }
    };
    fetchData();
  }, [id, dateRange]);

  return (
    <>
      <Breadcrumbs itemName={leagueName} />
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

export default LeagueCalendar;
