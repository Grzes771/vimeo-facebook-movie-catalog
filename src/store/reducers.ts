import { combineReducers } from 'redux';
import {
  getYoutubeVideos,
  TGetYoutubeVideosDataState,
} from './getYoutubeVideos/reducer';
import {
  getVimeoVideos,
  TGetVimeoVideosDataState,
} from './getVimeoVideos/reducer';
import {
  inputValueChange,
  TSelectActionState,
} from './changePanelValues/reducer';
import { videoModal, TVideoModalDataState } from './modal/reducer';

export type AppState = {
  getYoutubeVideos: TGetYoutubeVideosDataState;
  getVimeoVideos: TGetVimeoVideosDataState;
  inputValueChange: TSelectActionState;
  videoModal: TVideoModalDataState;
};
export const reducer = combineReducers<AppState>({
  getYoutubeVideos,
  getVimeoVideos,
  inputValueChange,
  videoModal,
});

export type RootState = ReturnType<typeof reducer>;
