import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.jsx';
import MatchesTable from '../../components/MatchesTable/MatchesTable.jsx';
import ErrorModal from '../../components/ErrorModal/ErrorModal.jsx';

import { useGetTeamData } from '../../tools/queries.js';

import './TeamCalendar.css';

const TeamCalendar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { id } = useParams();

  const dataQueries = useGetTeamData(id, dateRange);

  const isPending = dataQueries.some((query) => query.isLoading);
  const error = dataQueries.find((query) => query.error) || null;

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const [teamNameQuery, teamMatchesQuery] = dataQueries;
  const { data: teamName } = teamNameQuery;
  const { data: matches } = teamMatchesQuery;

  return (
    <>
      <Breadcrumbs itemName={teamName} />
      <h2 className="team-calendar-header">Матчи</h2>
      <div className="team-calendar-datepicker-container">
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
