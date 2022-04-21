import { AppState } from '../reducers';
import { TVideosArrItem } from '../types/movie-item';

export const youtubeVideosDataRX = (state: AppState): TVideosArrItem[] =>
  state.getYoutubeVideos.youtubeVideos;
