import { AppState } from '../reducers';
import { TVideosArrItem } from '../types/movie-item';

export const vimeoVideosDataRX = (state: AppState): TVideosArrItem[] =>
  state.getVimeoVideos.vimeoVideos;

export const vimeoVideoIsLoadingRX = (state: AppState): boolean =>
  state.getVimeoVideos.isLoading;