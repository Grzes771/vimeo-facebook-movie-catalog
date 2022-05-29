import React, { useEffect } from 'react';

import { TVideosArrItem } from 'store/types/movie-item';
import { useVideosListContext } from 'contexts/video-list-context';

import * as S from './index.styles';

type TProps = {
  filterAndSort: TVideosArrItem[];
  filterAndSortFavorite: TVideosArrItem[] | undefined;
};

export const ListPagination = ({
  filterAndSort,
  filterAndSortFavorite,
}: TProps) => {
  const { currentPage, setCurrentPage, listType } = useVideosListContext();

  const showInputValues = {
    favorite: listType,
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
      <S.Container aria-label="Page navigation example">
        <S.StyledListItem isActive={currentPage > 0}>
          <S.StyledButton
            onClick={(e) => handleClick(e, 0)}
            data-testid="pagination-link"
          >
            &laquo;
          </S.StyledButton>
        </S.StyledListItem>
        <S.StyledListItem isActive={currentPage > 0}>
          <S.StyledButton
            onClick={(e) => handleClick(e, currentPage - 1)}
            data-testid="pagination-link"
          >
            &#8249;
          </S.StyledButton>
        </S.StyledListItem>
        {[...Array(pagesCount)].map((video, i) => (
          <S.StyledListItem isActive={true} key={i}>
            <S.StyledButton
              onClick={(e) => handleClick(e, i)}
              data-testid="pagination-link"
              backgroundActive={currentPage === i}
            >
              {i + 1}
            </S.StyledButton>
          </S.StyledListItem>
        ))}
        <S.StyledListItem isActive={currentPage < pagesCount - 1}>
          <S.StyledButton
            data-testid="pagination-link"
            onClick={(e) => handleClick(e, currentPage + 1)}
          >
            &#8250;
          </S.StyledButton>
        </S.StyledListItem>
        <S.StyledListItem isActive={currentPage < pagesCount - 1}>
          <S.StyledButton
            data-testid="pagination-link"
            onClick={(e) => handleClick(e, pagesCount - 1)}
          >
            &raquo;
          </S.StyledButton>
        </S.StyledListItem>
      </S.Container>
    </div>
  );
};
