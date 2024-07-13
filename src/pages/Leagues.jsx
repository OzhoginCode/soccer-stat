import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../components/Pagination.jsx';
import Search from '../components/Search.jsx';
import ErrorModal from '../components/ErrorModal.jsx';

import client from '../tools/apiClient.js';
import paths from '../tools/paths.js';

const LeagueList = ({ currentPage, setCurrentPage, leagues }) => {
  const itemsPerPage = 10;
  const totalItems = leagues.length;

  const currentData = leagues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <>
      <div className="bg-white mt-4 dark:bg-slate-800 rounded-t-lg">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Лиги</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
            {currentData.map((league) => (
              <Link key={league.id} to={`${league.id}`} className="group h-44 flex flex-col mr-a border-2 rounded-lg dark:border-gray-600 duration-200 hover:scale-105 hover:border-indigo-500 hover:shadow-lg dark:hover:border-indigo-500">
                <h3 className="mt-12 text-2xl sm:text-3xl text-gray-900 dark:text-gray-200 text-center">{league.name}</h3>
                <div className="mt-auto mb-6 text-lg text-gray-900 dark:text-gray-200 text-center">{league.area.name}</div>
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
