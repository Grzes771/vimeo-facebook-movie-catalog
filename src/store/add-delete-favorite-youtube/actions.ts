import { createAction } from 'typesafe-actions';

import { SET_YOUTUBE_FAVORITE } from './consts';

export const setYtFavoriteStarted = createAction(
  SET_YOUTUBE_FAVORITE.started,
  (url: string) => ({
    url,
  })
)();
