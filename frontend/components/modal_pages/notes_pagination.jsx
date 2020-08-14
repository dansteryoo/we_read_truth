import React from 'react';

const Pagination = ({
  notesPerPage,
  totalNotes,
  paginate,
  currentPage,
  nextPage,
  prevPage,
}) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={() => prevPage()}>
            Prev
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className={number === currentPage ? "active-link" : ""}
            >
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" onClick={() => nextPage()}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
