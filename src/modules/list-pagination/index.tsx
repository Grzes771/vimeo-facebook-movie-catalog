import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { setInputDataRX } from '../../store/change-panel-values/selector';
import { TVideosArrItem } from '../../store/types/movie-item';

import './style.css';

type TProps = {
  filterAndSort: TVideosArrItem[];
  filterAndSortFavorite: TVideosArrItem[] | undefined;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
};

export const ListPagination = (props: TProps) => {
  const { filterAndSort, filterAndSortFavorite, setCurrentPage, currentPage } =
    props;
  const showDisplayInputStoreValue = useSelector(setInputDataRX);
  const showInputValues = {
    favorite: showDisplayInputStoreValue.favorite,
  };

  const pagesCount =
    showInputValues.favorite === 'favorite'
      ? Math.ceil(filterAndSortFavorite!.length / 4)
      : Math.ceil(filterAndSort.length / 4);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  return (
    <div className="pagination-wrapper">
      <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink
            onClick={(e) => handleClick(e, 0)}
            previous
            href="#"
            data-testid="pagination-link"
          />
        </PaginationItem>
        <PaginationItem disabled={currentPage <= 0}>
          <PaginationLink
            onClick={(e) => handleClick(e, currentPage - 1)}
            previous
            href="#"
            data-testid="pagination-link"
          />
        </PaginationItem>
        {[...Array(pagesCount)].map((video, i) => (
          <PaginationItem
            active={i === currentPage}
            key={
              showInputValues.favorite === 'favorite'
                ? filterAndSortFavorite![i].date
                : filterAndSort[i].date
            }
          >
            <PaginationLink
              onClick={(e) => handleClick(e, i)}
              href="#"
              data-testid="pagination-link"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem disabled={currentPage >= pagesCount - 1}>
          <PaginationLink
            data-testid="pagination-link"
            onClick={(e) => handleClick(e, currentPage + 1)}
            next
            href="#"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            data-testid="pagination-link"
            onClick={(e) => handleClick(e, pagesCount - 1)}
            next
            href="#"
          />
        </PaginationItem>
      </Pagination>
    </div>
  );
};
