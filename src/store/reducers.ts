import { combineReducers } from 'redux';
import {
  getYoutubeVideos,
  TGetYoutubeVideosDataState,
} from './get-youtube-videos/reducer';
import {
  getVimeoVideos,
  TGetVimeoVideosDataState,
} from './get-vimeo-videos/reducer';

export type AppState = {
  getYoutubeVideos: TGetYoutubeVideosDataState;
  getVimeoVideos: TGetVimeoVideosDataState;
};
export const reducer = combineReducers<AppState>({
  getYoutubeVideos,
  getVimeoVideos,
});

export type RootState = ReturnType<typeof reducer>;
