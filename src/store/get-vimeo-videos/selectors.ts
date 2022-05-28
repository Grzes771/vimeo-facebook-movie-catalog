import { AppState } from '../reducers';

export const addVimeoVideoIsLoadingRX = (state: AppState): boolean =>
  state.getVimeoVideos.isLoading;

export const addVimeoVideoIsSuccessRX = (state: AppState): boolean =>
  state.getVimeoVideos.isSuccess;
