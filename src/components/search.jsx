import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Search = ({ setSearchText, setCurrentPage }) => (
  <div className="relative mt-2 rounded-md shadow-sm w-72">
    <form
      className="flex w-auto"
      onSubmit={(e) => {
        e.preventDefault();
        const { value } = e.target.elements.search;
        setSearchText(value.trim());
        setCurrentPage(1);
      }}
    >
      <input
        name="search"
        type="text"
        placeholder="Поиск..."
        className="block w-auto flex-grow rounded-l-md border-0 py-1.5 pl-5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button type="submit" aria-label="Search" className="inset-y-0 flex items-center bg-gray-200 px-4 border-slate-700 rounded-r-md ring-gray-300 hover:bg-gray-300 transition-colors">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>
    </form>
  </div>
);

export default Search;
