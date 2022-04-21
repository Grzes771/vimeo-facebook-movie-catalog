import { createAction } from 'typesafe-actions';
import { TVideosArrItem } from '../types/movie-item';

import {
  GET_YOUTUBE_VIDEOS_DATA,
  SET_YOUTUBE_FAVORITE,
  CLEAR_YOUTUBE_VIDEOS_DATA,
  ADD_YOUTUBE_DEMO_DATA,
  DELETE_SINGLE_YOUTUBE_VIDEO,
} from './consts';

type TGetYoutubeVideosStarted = {
  url: string;
};

export const getYoutubeVideosStarted = createAction(
  GET_YOUTUBE_VIDEOS_DATA.started,
  (url): TGetYoutubeVideosStarted => ({
    url,
  })
)();

export const setYtFavorite = createAction(
  SET_YOUTUBE_FAVORITE,
  (url: string) => ({
    url,
  })
)();

export const clearYoutubeVideosData = createAction(
  CLEAR_YOUTUBE_VIDEOS_DATA,
  () => ({})
)();

export const addYoutubeDemoData = createAction(
  ADD_YOUTUBE_DEMO_DATA,
  () => ({})
)();

export const deleteSingleYoutubeVideo = createAction(
  DELETE_SINGLE_YOUTUBE_VIDEO,
  (movie: TVideosArrItem) => ({ movie })
)();
