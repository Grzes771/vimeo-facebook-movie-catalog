import { createAction } from 'typesafe-actions';
import { TVideosArrItem } from '../types/movie-item';

import { SET_MODAL_IS_ACTIVE, SET_VIDEO_DETAILS } from './consts';

type TSetModalActiveStarted = {
  value: string;
};

export const setModalActive = createAction(
  SET_MODAL_IS_ACTIVE,
  (value): TSetModalActiveStarted => ({
    value,
  })
)();

export const setVideoDetails = createAction(
  SET_VIDEO_DETAILS,
  (video: TVideosArrItem) => ({
    video,
  })
)();
