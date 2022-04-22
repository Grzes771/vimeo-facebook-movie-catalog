import { createAction } from 'typesafe-actions';
import { TVideosArrItem } from '../types/movie-item';

import {
  GET_VIMEO_VIDEOS_DATA,
  SET_VIMEO_FAVORITE,
  CLEAR_VIMEO_VIDEOS_DATA,
  ADD_VIMEO_DEMO_DATA,
  DELETE_SINGLE_VIMEO_VIDEO,
} from './consts';

export const getVimeoVideosStarted = createAction(
  GET_VIMEO_VIDEOS_DATA.started,
  (url: string) => ({
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

export const deleteSingleVimeoVideo = createAction(
  DELETE_SINGLE_VIMEO_VIDEO,
  (movie: TVideosArrItem) => ({ movie })
)();
