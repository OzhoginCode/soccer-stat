import { useState, FC } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination/index.ts';
import Search from '../../components/Search/index.ts';
import ErrorModal from '../../components/ErrorModal/index.ts';

import useErrorHandling from '../../hooks/useErrorHandling.ts';
import { useGetCompetitions } from '../../tools/queries.ts';

import { Competition } from '../../tools/types.ts';

import './Leagues.css';

const LeagueCard = ({ league }: { league: Competition }) => (
  <Link to={String(league.id)} className="league-list-item group">
    <h3 className="league-list-item-title">{league.name}</h3>
    <div className="league-list-item-area">{league.area.name}</div>
  </Link>
);

const SkeletonLeagueCard = () => (
  <div className="league-list-item animate-pulse">
    <div className="league-list-item-title" />
    <div className="league-list-item-area" />
  </div>
);

interface LeagueListProps {
  currentPage: number
  setCurrentPage: (n: number) => void
  leagues: Competition[]
  showSkeleton: boolean
}

const LeagueList: FC<LeagueListProps> = ({
  currentPage, setCurrentPage, leagues, showSkeleton,
}) => {
  const itemsPerPage = 10;
  const totalItems = leagues.length;

  const currentData = leagues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <div className="league-list-container">
        <div className="league-list-content">
          <h2 className="sr-only">Лиги</h2>
          <div className="league-list-grid">
            {showSkeleton
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonLeagueCard key={index} /> // eslint-disable-line react/no-array-index-key
              ))
              : currentData.map((league) => (
                <LeagueCard league={league} key={league.id} />
              ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
      />
    </>
  );
};

const Leagues = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    error, data: leagues, fetchStatus, queryKey,
  } = useGetCompetitions();

  const {
    modalOpen, setModalOpen, reloadTime, reload, errorType,
  } = useErrorHandling(error, fetchStatus, queryKey);

  const currentLeagues = leagues.filter((team) => team.name
    .toLowerCase()
    .includes(searchText.toLowerCase()));

  const showSkeleton = fetchStatus === 'fetching';

  return (
    <>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />

      <LeagueList
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        leagues={currentLeagues}
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

export default Leagues;
