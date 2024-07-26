import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const PageNumbers = ({ currentPage, totalPages, setCurrentPage }) => {
  const inactiveClassNames = 'relative items-center px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 focus:z-20 focus:outline-offset-0';
  const activeClassNames = 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

  const range = (from, to) => [...Array(to - from + 1).keys()].map((i) => i + from);

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      pages.push(...range(1, totalPages));
      return pages;
    }
    if (currentPage <= 4) {
      pages.push(...range(1, 5));
      pages.push('...', totalPages);
      return pages;
    }
    if (currentPage > 4 && currentPage <= totalPages - 4) {
      pages.push(1, '...');
      pages.push(...range(currentPage - 1, currentPage + 1));
      pages.push('...', totalPages);
      return pages;
    }
    pages.push(1, '...');
    pages.push(...range(totalPages - 4, totalPages));
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...') {
      setCurrentPage(page);
    }
  };
  return (
    <>
      {generatePageNumbers().map((page, index) => (
        <button
          key={index} // eslint-disable-line react/no-array-index-key
          type="button"
          disabled={page === '...'}
          aria-current={page === currentPage ? 'page' : undefined}
          className={page === currentPage ? activeClassNames : inactiveClassNames}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
    </>
  );
};

const Pagination = ({
  currentPage, itemsPerPage, setCurrentPage, totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const togglePrevious = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const toggleNext = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const firstItem = totalItems ? 1 + ((currentPage - 1) * itemsPerPage) : 0;
  const lastItem = (firstItem + itemsPerPage - 1) < totalItems
    ? firstItem + itemsPerPage - 1
    : totalItems;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white dark:bg-slate-800 dark:border-gray-600 px-4 py-3 sm:px-6 rounded-b-lg">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          type="button"
          onClick={togglePrevious}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:hover:bg-white dark:disabled:hover:bg-slate-800"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={toggleNext}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 disabled:hover:bg-white dark:disabled:hover:bg-slate-800"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mr-4">
            Показаны <span className="font-medium">{firstItem}</span> - <span className="font-medium">{lastItem}</span> из{' '}
            <span className="font-medium">{totalItems}</span> результатов
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            <button
              type="button"
              onClick={togglePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:hover:bg-white dark:hover:bg-slate-700 dark:disabled:hover:bg-slate-800"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            <PageNumbers
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
            <button
              type="button"
              onClick={toggleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:hover:bg-white dark:hover:bg-slate-700 dark:disabled:hover:bg-slate-800"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
