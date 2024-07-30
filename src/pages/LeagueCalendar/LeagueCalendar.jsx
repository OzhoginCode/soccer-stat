import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Datepicker from 'react-tailwindcss-datepicker';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.jsx';
import MatchesTable from '../../components/MatchesTable/MatchesTable.jsx';
import ErrorModal from '../../components/ErrorModal/ErrorModal.jsx';

import useErrorHandling from '../../hooks/useErrorHandling.js';
import { useGetCompetitionData } from '../../tools/queries.js';

import './LeagueCalendar.css';

const LeagueCalendar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { id } = useParams();
  const { error, data, fetchStatus } = useGetCompetitionData(id, dateRange);

  const {
    modalOpen, setModalOpen, reloadTime, reload, errorType,
  } = useErrorHandling(error, fetchStatus);

  const { matches, competition } = data;
  const leagueName = competition.name;

  return (
    <>
      <Breadcrumbs itemName={leagueName} />
      <h2 className="league-calendar-header">Матчи</h2>
      <div className="league-calendar-datepicker-container">
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

      <ErrorModal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        initialReloadTime={reloadTime}
        reload={reload}
        errorType={errorType}
      />
    </>
  );
};

export default LeagueCalendar;
