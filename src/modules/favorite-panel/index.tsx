import React from 'react';

import * as S from './index.styles';
import { useVideosListContext } from 'contexts/video-list-context';
import { EVideosListTypeKeys } from 'types/video-list-context-enums';

export const FavoritePanel = () => {
  const { listType, handleOnClick } = useVideosListContext();

  return (
    <S.StyledForm>
      <S.StyledButton
        type="button"
        listType={listType}
        onClick={() => handleOnClick(EVideosListTypeKeys.ALL)}
        id={EVideosListTypeKeys.ALL}
      >
        wszystkie filmy
      </S.StyledButton>
      <S.StyledButton
        type="button"
        listType={listType}
        onClick={() => handleOnClick(EVideosListTypeKeys.FAVORITE)}
        id={EVideosListTypeKeys.FAVORITE}
      >
        ulubione
      </S.StyledButton>
    </S.StyledForm>
  );
};
