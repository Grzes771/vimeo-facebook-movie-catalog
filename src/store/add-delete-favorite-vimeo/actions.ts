import { createAction } from 'typesafe-actions';

import { SET_VIMEO_FAVORITE } from './consts';

export const setVimeoFavoriteStarted = createAction(
  SET_VIMEO_FAVORITE.started,
  (url: string) => ({
    url,
  })
)();
