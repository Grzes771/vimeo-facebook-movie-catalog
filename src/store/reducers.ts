import { combineReducers } from 'redux';
import {
  getYoutubeVideos,
  TGetYoutubeVideosDataState,
} from './get-youtube-videos/reducer';
import {
  getVimeoVideos,
  TGetVimeoVideosDataState,
} from './get-vimeo-videos/reducer';
import {
  inputValueChange,
  TSelectActionState,
} from './change-panel-values/reducer';
import { videoModal, TVideoModalDataState } from './modal/reducer';
import {
  setYoutubeFavorite,
  TSetYoutubeFavoriteDataState,
} from './add-delete-favorite-youtube/reducer';
import {
  setVimeoFavorite,
  TSetVimeoFavoriteDataState,
} from './add-delete-favorite-vimeo/reducer';
import {
  deleteSingleVideo,
  TDeleteSingleVideoDataState,
} from './delete-single-video/reducer';

export type AppState = {
  getYoutubeVideos: TGetYoutubeVideosDataState;
  getVimeoVideos: TGetVimeoVideosDataState;
  inputValueChange: TSelectActionState;
  videoModal: TVideoModalDataState;
  setYoutubeFavorite: TSetYoutubeFavoriteDataState;
  setVimeoFavorite: TSetVimeoFavoriteDataState;
  deleteSingleVideo: TDeleteSingleVideoDataState;
};
export const reducer = combineReducers<AppState>({
  getYoutubeVideos,
  getVimeoVideos,
  inputValueChange,
  videoModal,
  setYoutubeFavorite,
  setVimeoFavorite,
  deleteSingleVideo,
});

export type RootState = ReturnType<typeof reducer>;
