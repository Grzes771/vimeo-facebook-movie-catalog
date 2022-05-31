import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './index.styles';
import { useVideosListContext } from 'contexts/video-list-context';
import { EVideosListTypeKeys } from 'types/video-list-context-enums';

import { VIMEO_YOUTUBE_MOVIE_CATALOG } from 'App';

export const FavoritePanel = () => {
  const { listType, handleOnClick } = useVideosListContext();

  const navigate = useNavigate();
  return (
    <S.StyledForm>
      <S.StyledButton
        type="button"
        listType={listType}
        onClick={() => {
          handleOnClick(EVideosListTypeKeys.ALL);
          navigate(`/${VIMEO_YOUTUBE_MOVIE_CATALOG}`);
        }}
        id={EVideosListTypeKeys.ALL}
      >
        wszystkie filmy
      </S.StyledButton>
      <S.StyledButton
        type="button"
        listType={listType}
        onClick={() => {
          handleOnClick(EVideosListTypeKeys.FAVORITE);
          navigate(`/${VIMEO_YOUTUBE_MOVIE_CATALOG}`);
        }}
        id={EVideosListTypeKeys.FAVORITE}
      >
        ulubione
      </S.StyledButton>
    </S.StyledForm>
  );
};
