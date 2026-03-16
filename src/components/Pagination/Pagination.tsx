interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
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

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Hotel list pagination">
      <ul className="pagination justify-content-center">
        <li className={`${currentPage === 1 ? 'disabled' : ''} page-item `}>
          <button className="page-link" onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`${pageNumber === currentPage ? 'active' : ''} page-item `}>
            <button className="page-link" onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        ))}
        <li className={`${currentPage === totalPages ? 'disabled' : ''} page-item `}>
          <button className="page-link" onClick={handleNextClick} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
