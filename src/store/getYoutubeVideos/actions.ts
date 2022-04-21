import { createAction } from 'typesafe-actions';

import {
  GET_YOUTUBE_VIDEOS_DATA,
  SET_YT_FAVORITE,
  CLEAR_YT_VIDEOS_DATA,
  ADD_YT_DEMO_DATA,
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

export const setYtFavorite = createAction(SET_YT_FAVORITE, (url: string) => ({
  url,
}))();

export const clearYoutubeVideosData = createAction(
  CLEAR_YT_VIDEOS_DATA,
  () => ({})
)();

export const addYoutubeDemoData = createAction(ADD_YT_DEMO_DATA, () => ({}))();
