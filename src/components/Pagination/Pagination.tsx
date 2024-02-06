import React from 'react';

interface IPagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<IPagination> = (props) => {
  const { currentPage, totalPages, onPageChange } = props;

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];
    for (let index = 1; index <= totalPages; index++) {
      pageNumbers.push(index);
    }
    return pageNumbers;
  };
  const pageNumbers = getPageNumbers();
  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`${currentPage === 1 ? 'disabled' : ''} page-item `}>
          <a className="page-link" href="#" onClick={handlePrevClick}>
            Prev
          </a>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`${pageNumber === currentPage ? 'active' : ''} page-item `}>
            <a className="page-link" href="#" onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </a>
          </li>
        ))}
        <li className={`${currentPage === totalPages ? 'disabled' : ''} page-item `}>
          <a className="page-link" href="#" onClick={handleNextClick}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
