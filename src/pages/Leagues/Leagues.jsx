import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../../components/Pagination/Pagination.jsx';
import Search from '../../components/Search/Search.jsx';
import ErrorModal from '../../components/ErrorModal/ErrorModal.jsx';

import client from '../../tools/apiClient.js';
import paths from '../../tools/paths.js';

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
  const [leagues, setLeagues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const currentLeagues = searchText !== ''
    ? leagues.filter((league) => league.name === searchText)
    : leagues;

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const resp = await client.get(paths.competitions());
        setLeagues(resp.data.competitions);
      } catch (err) {
        if (err.response.status === 429) setModalOpen(true);
      }
    };
    fetchLeagues();
  }, []);

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
      <ErrorModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default Leagues;