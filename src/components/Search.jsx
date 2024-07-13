import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = ({ searchText, setSearchText, setCurrentPage }) => (
  <div className="relative mt-2 rounded-md shadow-sm w-64 flex">
    <input
      name="search"
      type="search"
      value={searchText}
      onChange={(e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
      }}
      placeholder="Поиск..."
      className="block w-auto flex-grow rounded-md border-0 py-1.5 pl-5 pr-9 bg-white text-gray-900 focus:outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-slate-800 dark:ring-gray-900 dark:focus:ring-indigo-600 dark:text-white sm:text-sm sm:leading-6"
    />
    <div className="absolute right-4 inset-y-0 flex items-center pointer-events-none">
      <MagnifyingGlassIcon className="h-4 w-4" />
    </div>
  </div>
);

export default Search;
