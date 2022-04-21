import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import { TVideosArrItem } from '../types/movie-item';
import { setVideoDetails, setModalActive } from './actions';

export type TVideoModalDataState = {
  isOpen: boolean;
  videoDetails: TVideosArrItem | null;
};

export const initialState: TVideoModalDataState = {
  isOpen: false,
  videoDetails: null,
};

export const videoModal = (
  state = initialState,
  action: Action
): TVideoModalDataState => {
  switch (action.type) {
    case getType(setModalActive):
      return {
        ...state,
        isOpen: action.payload.value,
      };

    case getType(setVideoDetails):
      return {
        ...state,
        videoDetails: action.payload.video,
      };
    default:
      return { ...state };
  }
};
