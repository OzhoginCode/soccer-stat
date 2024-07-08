import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../components/Pagination.jsx';
import Search from '../components/search.jsx';
import ErrorModal from '../components/ErrorModal.jsx';

import client from '../tools/apiClient.js';
import paths from '../tools/paths.js';

const LeagueList = ({ currentPage, setCurrentPage, teams }) => {
  const itemsPerPage = 10;
  const totalItems = teams.length;

  const currentData = teams.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <>
      <div className="bg-white mt-4">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Лиги</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {currentData.map((team) => (
              <Link key={team.id} to={`${team.id}`} className="group border-2 rounded-lg duration-200 hover:scale-105 hover:border-indigo-500 hover:shadow-lg">
                <h3 className="mt-12 text-2xl sm:text-3xl text-gray-900 text-center">{team.name}</h3>
                <div className="mt-14 mb-6 text-lg text-gray-900 text-center">{team.area.name}</div>
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
  const [teams, setLeagues] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const currentCompetitions = teams.filter((team) => team.name
    .toLowerCase()
    .includes(searchText.toLowerCase()));

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
        teams={currentCompetitions}
      />
      <ErrorModal isOpen={modalOpen} setIsOpen={setModalOpen} />
    </>
  );
};

export default Leagues;
