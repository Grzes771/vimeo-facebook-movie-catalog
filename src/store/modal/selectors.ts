import { AppState } from '../../store/reducers';
import { TVideosArrItem } from '../types/movie-item';

export const singleModalVideosDataRX = (
  state: AppState
): TVideosArrItem | null => state.videoModal.videoDetails;

export const modalIsOpenRX = (state: AppState): boolean =>
  state.videoModal.isOpen;
