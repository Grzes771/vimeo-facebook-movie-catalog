import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { setInputDataRX } from 'store/change-panel-values/selector';
import { TVideosArrItem } from 'store/types/movie-item';
import { useVideosListContext } from 'contexts/video-list-context';

import { PaginationWrapper, StyledListItem, ButtonStyle } from './index.styles';

type TProps = {
  filterAndSort: TVideosArrItem[];
  filterAndSortFavorite: TVideosArrItem[] | undefined;
};

export const ListPagination = ({
  filterAndSort,
  filterAndSortFavorite,
}: TProps) => {
  const { currentPage, setCurrentPage } = useVideosListContext();

  const showDisplayInputStoreValue = useSelector(setInputDataRX);
  const showInputValues = {
    favorite: showDisplayInputStoreValue.favorite,
  };

  const pagesCount =
    showInputValues.favorite === 'favorite'
      ? Math.ceil(filterAndSortFavorite!.length / 12)
      : Math.ceil(filterAndSort?.length / 12);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage, setCurrentPage]);

  const handleClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  return (
    <div>
      <PaginationWrapper aria-label="Page navigation example">
        <StyledListItem isActive={currentPage > 0}>
          <ButtonStyle
            onClick={(e) => handleClick(e, 0)}
            data-testid="pagination-link"
          >
            &laquo;
          </ButtonStyle>
        </StyledListItem>
        <StyledListItem isActive={currentPage > 0}>
          <ButtonStyle
            onClick={(e) => handleClick(e, currentPage - 1)}
            data-testid="pagination-link"
          >
            &#8249;
          </ButtonStyle>
        </StyledListItem>
        {[...Array(pagesCount)].map((video, i) => (
          <StyledListItem isActive={true} key={i}>
            <ButtonStyle
              onClick={(e) => handleClick(e, i)}
              data-testid="pagination-link"
              backgroundActive={currentPage === i}
            >
              {i + 1}
            </ButtonStyle>
          </StyledListItem>
        ))}
        <StyledListItem isActive={currentPage < pagesCount - 1}>
          <ButtonStyle
            data-testid="pagination-link"
            onClick={(e) => handleClick(e, currentPage + 1)}
          >
            &#8250;
          </ButtonStyle>
        </StyledListItem>
        <StyledListItem isActive={currentPage < pagesCount - 1}>
          <ButtonStyle
            data-testid="pagination-link"
            onClick={(e) => handleClick(e, pagesCount - 1)}
          >
            &raquo;
          </ButtonStyle>
        </StyledListItem>
      </PaginationWrapper>
    </div>
  );
};
