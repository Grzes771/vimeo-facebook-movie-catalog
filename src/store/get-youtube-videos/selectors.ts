import { AppState } from '../reducers';

export const addYoutubeVideoIsLoadingRX = (state: AppState): boolean =>
  state.getYoutubeVideos.isLoading;

export const addYoutubeVideoIsSuccessRX = (state: AppState): boolean =>
  state.getYoutubeVideos.isSuccess;
