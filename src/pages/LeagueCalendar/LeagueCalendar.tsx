import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';

import Breadcrumbs from '../../components/Breadcrumbs/index.ts';
import MatchesTable from '../../components/MatchesTable/index.ts';
import ErrorModal from '../../components/ErrorModal/index.ts';

import useErrorHandling from '../../hooks/useErrorHandling.ts';
import { useGetCompetitionData } from '../../tools/queries.ts';

import './LeagueCalendar.css';

const LeagueCalendar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateRange, setDateRange] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const { id } = useParams();

  const {
    error, data, fetchStatus, queryKey,
  } = useGetCompetitionData(id!, dateRange);

  const {
    modalOpen, setModalOpen, reloadTime, reload, errorType,
  } = useErrorHandling(error, fetchStatus, queryKey);

  const { matches, competition } = data;
  const leagueName = competition.name;

  const showSkeleton = fetchStatus === 'fetching';

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
        showSkeleton={showSkeleton}
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
