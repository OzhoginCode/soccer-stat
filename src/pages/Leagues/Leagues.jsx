import { useState } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination/Pagination.jsx';
import Search from '../../components/Search/Search.jsx';
import ErrorModal from '../../components/ErrorModal/ErrorModal.jsx';

import useErrorHandling from '../../hooks/useErrorHandling.js';
import { useGetCompetitions } from '../../tools/queries.js';

import './Leagues.css';

const LeagueList = ({ currentPage, setCurrentPage, leagues }) => {
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
            {currentData.map((league) => (
              <Link key={league.id} to={`${league.id}`} className="league-list-item group">
                <h3 className="league-list-item-title">{league.name}</h3>
                <div className="league-list-item-area">{league.area.name}</div>
              </Link>
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
    error, data: leagues, fetchStatus,
  } = useGetCompetitions();

  const {
    modalOpen, setModalOpen, reloadTime, reload, errorType,
  } = useErrorHandling(error, fetchStatus);

  const currentLeagues = searchText !== ''
    ? leagues.filter((league) => league.name === searchText)
    : leagues;

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
