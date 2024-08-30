import { FC } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

import './Pagination.css';

interface PageNumbersProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

const PageNumbers: FC<PageNumbersProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  enum Separator {
    dots = '...'
  }
  const { dots } = Separator;

  // возвращает числа в указанном диапазоне
  const range = (from: number, to: number) => [...Array(to - from + 1).keys()].map((i) => i + from);

  // возвращает номера страниц доступные для перехода пользователю
  const generatePageNumbers = (): (number | Separator)[] => {
    const pages = [];

    if (totalPages <= 7) {
      pages.push(...range(1, totalPages));
      return pages;
    }
    if (currentPage <= 4) {
      pages.push(...range(1, 5));
      pages.push(dots, totalPages);
      return pages;
    }
    if (currentPage > 4 && currentPage <= totalPages - 4) {
      pages.push(1, dots);
      pages.push(...range(currentPage - 1, currentPage + 1));
      pages.push(dots, totalPages);
      return pages;
    }
    pages.push(1, dots);
    pages.push(...range(totalPages - 4, totalPages));
    return pages;
  };

  const handlePageClick = (page: number | Separator) => {
    if (page !== dots) {
      setCurrentPage(page);
    }
  };

  // возвращает кнопки для перехода на страницы
  return (
    <>
      {generatePageNumbers().map((page, index) => (
        <button
          key={index} // eslint-disable-line react/no-array-index-key
          type="button"
          disabled={page === dots}
          aria-current={page === currentPage ? 'page' : undefined}
          className={page === currentPage ? 'pagination-page-active' : 'pagination-page-inactive'}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
    </>
  );
};

interface PaginationProps {
  currentPage: number
  itemsPerPage: number
  setCurrentPage: (page: number) => void
  totalItems: number
}

const Pagination: FC<PaginationProps> = ({
  currentPage, itemsPerPage, setCurrentPage, totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const togglePrevious = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const toggleNext = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };

  const firstItem = totalItems ? 1 + ((currentPage - 1) * itemsPerPage) : 0;
  const lastItem = (firstItem + itemsPerPage - 1) < totalItems
    ? firstItem + itemsPerPage - 1
    : totalItems;

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <button
          type="button"
          onClick={togglePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={toggleNext}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>

      <div className="pagination-info">
        <div>
          <p className="pagination-text">
            Показаны <span className="font-medium">{firstItem}</span> - <span className="font-medium">{lastItem}</span> из{' '}
            <span className="font-medium">{totalItems}</span> результатов
          </p>
        </div>

        <div>
          <nav aria-label="Pagination" className="pagination-nav">
            <button
              type="button"
              onClick={togglePrevious}
              disabled={currentPage === 1}
              className="pagination-icon-button-left"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="pagination-icon" />
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
              className="pagination-icon-button-right"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="pagination-icon" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
