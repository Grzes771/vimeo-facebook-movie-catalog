import React, { useEffect } from 'react';

import { useVideosListContext } from 'contexts/video-list-context';

import { EVideosListTypeKeys } from 'types/video-list-context-enums';

import * as S from './index.styles';

export const ListPagination = () => {
  const {
    currentPage,
    listType,
    videosList,
    videosTotalCount,
    setCurrentPage,
  } = useVideosListContext();

  const pagesCount =
    listType === EVideosListTypeKeys.FAVORITE
      ? Math.ceil(videosList.map(({ favorite }) => favorite).length / 12)
      : Math.ceil(videosTotalCount / 12);

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
        {[...Array(pagesCount)].map((page: number, i) => (
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
        <S.StyledListItem isActive={currentPage !== pagesCount - 1}>
          <S.StyledButton
            data-testid="pagination-link"
            onClick={(e) => handleClick(e, currentPage + 1)}
          >
            &#8250;
          </S.StyledButton>
        </S.StyledListItem>
        <S.StyledListItem isActive={currentPage !== pagesCount - 1}>
          <S.StyledButton
            data-testid="pagination-link"
            onClick={(e) => handleClick(e, pagesCount)}
          >
            &raquo;
          </S.StyledButton>
        </S.StyledListItem>
      </S.Container>
    </div>
  );
};
