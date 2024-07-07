import { useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination.jsx';
import Search from './search.jsx';

import teams from '../__fixtures__/teams.js';

const TeamList = ({ currentPage, setCurrentPage, teams }) => { // eslint-disable-line no-shadow
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
          <h2 className="sr-only">Команды</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
            {currentData.map((team) => (
              <Link key={team.id} to={`${team.id}`} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    alt={team.imageAlt}
                    src={team.crest}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 duration-200 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 text-lg text-gray-900 text-center">{team.name}</h3>
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
    </>
  );
};

export default Teams;
