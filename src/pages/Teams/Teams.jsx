import { useState } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination/Pagination.jsx';
import Search from '../../components/Search/Search.jsx';
import ErrorModal from '../../components/ErrorModal/ErrorModal.jsx';

import useErrorHandling from '../../hooks/useErrorHandling.js';
import { useGetTeams } from '../../tools/queries.js';

import './Teams.css';

const TeamList = ({ currentPage, setCurrentPage, teams }) => {
  const itemsPerPage = 10;
  const totalItems = teams.length;

  const currentData = teams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <div className="team-list-container">
        <div className="team-list-content">
          <h2 className="sr-only">Команды</h2>
          <div className="team-list-grid">
            {currentData.map((team) => (
              <Link key={team.id} to={String(team.id)} className="group">
                <div className="team-list-item-img-container">
                  <img
                    alt="Логотип команды"
                    src={team.crestUrl}
                    className="team-list-item-img"
                  />
                </div>
                <h3 className="team-list-item-title">{team.name}</h3>
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

const Teams = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const {
    error, data: teams, fetchStatus, queryKey,
  } = useGetTeams();

  const {
    modalOpen, setModalOpen, reloadTime, reload, errorType,
  } = useErrorHandling(error, fetchStatus, queryKey);

  const currentTeams = teams.filter((team) => team.name
    .toLowerCase()
    .includes(searchText.toLowerCase()));

  return (
    <>
      <Search
        searchText={searchText}
        setSearchText={setSearchText}
        setCurrentPage={setCurrentPage}
      />

      <TeamList
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        teams={currentTeams}
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

export default Teams;
