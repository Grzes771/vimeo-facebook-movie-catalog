import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFavoriteStarted } from 'store/change-panel-values/actions';
import { setInputDataRX } from 'store/change-panel-values/selector';

import { Form, Button } from './index.styles';
import { useVideosListContext } from 'contexts/video-list-context';

export const FavoritePanel = () => {
  const { setCurrentPage } = useVideosListContext();
  const dispatch = useDispatch();

  const handleFavoriteChange = (prop: string, e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setFavoriteStarted(prop));
    setCurrentPage(0);
  };

  const showFavoriteStoreValue = useSelector(setInputDataRX).favorite;

  return (
    <Form>
      <Button
        favorite={showFavoriteStoreValue}
        id="all"
        onClick={(e: React.MouseEvent) => handleFavoriteChange('all', e)}
      >
        wszystkie filmy
      </Button>
      <Button
        favorite={showFavoriteStoreValue}
        id="favorite"
        onClick={(e: React.MouseEvent) => handleFavoriteChange('favorite', e)}
      >
        ulubione
      </Button>
    </Form>
  );
};
