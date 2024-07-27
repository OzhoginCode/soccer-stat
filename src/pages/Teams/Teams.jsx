import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination/Pagination.jsx';
import Search from '../../components/Search/Search.jsx';
import ErrorModal from '../../components/ErrorModal/ErrorModal.jsx';

import client from '../../tools/apiClient.js';
import paths from '../../tools/paths.js';

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
              <Link key={team.id} to={`${team.id}`} className="group">
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
  const [teams, setTeams] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const currentTeams = searchText !== ''
    ? teams.filter((team) => team.name === searchText)
    : teams;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const resp = await client.get(paths.teams());
        setTeams(resp.data.teams);
      } catch (err) {
        if (err.response.status === 429) setModalOpen(true);
      }
    };
    fetchTeams();
  }, []);

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
      <ErrorModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default Teams;
