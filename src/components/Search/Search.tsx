import { FC } from 'react';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import './Search.css';

interface SearchProps {
  searchText: string
  setSearchText: (text: string) => void
  setCurrentPage: (page: number) => void
}

const Search: FC<SearchProps> = ({ searchText, setSearchText, setCurrentPage }) => (
  <div className="search-container">
    <input
      name="search"
      type="search"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
      }}
      placeholder="Поиск..."
      className="search-input"
    />

    <div className="search-icon-container">
      <MagnifyingGlassIcon className="search-icon" />
    </div>
  </div>
);

export default Search;
