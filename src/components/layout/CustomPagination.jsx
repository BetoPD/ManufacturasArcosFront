import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function CustomPagination({
  resPerPage,
  filteredProductsCount,
}) {
  const [currentPage, setCurrentPage] = useState();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (searchParams.has('page')) {
      searchParams.set('page', currentPage);
    } else {
      searchParams.append('page', currentPage);
    }

    const path = window.location.pathname + '?' + searchParams.toString();
    navigate(path);
  };

  return (
    <div className="d-flex justify-content-center my-5">
      {filteredProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          onChange={setCurrentPageNo}
          nextPageText={'Sig'}
          prevPageText={'Prev'}
          firstPageText={'Primera'}
          lastPageText={'Última'}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
}
