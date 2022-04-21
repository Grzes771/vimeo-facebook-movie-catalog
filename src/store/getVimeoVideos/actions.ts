import { createAction } from 'typesafe-actions';

import {
  GET_VIMEO_VIDEOS_DATA,
  SET_VIMEO_FAVORITE,
  CLEAR_VIMEO_VIDEOS_DATA,
  ADD_VIMEO_DEMO_DATA,
} from './consts';

type TGetVimeoVideosStarted = {
  url: string;
};

export const getVimeoVideosStarted = createAction(
  GET_VIMEO_VIDEOS_DATA.started,
  (url): TGetVimeoVideosStarted => ({
    url,
  })
)();

export const setVimeoFavorite = createAction(
  SET_VIMEO_FAVORITE,
  (url: string) => ({
    url,
  })
)();

export const clearVimeoVideosData = createAction(
  CLEAR_VIMEO_VIDEOS_DATA,
  () => ({})
)();
export const addVimeoDemoData = createAction(ADD_VIMEO_DEMO_DATA, () => ({}))();
