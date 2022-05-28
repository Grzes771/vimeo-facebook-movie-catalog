import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import { getVimeoVideosStarted } from './actions';

import { GET_VIMEO_VIDEOS_DATA } from './consts';

export type TGetVimeoVideosDataState = {
  isLoading: boolean;
  isSuccess: boolean;
};

export const initialState: TGetVimeoVideosDataState = {
  isLoading: false,
  isSuccess: false,
};

export const getVimeoVideos = (
  state = initialState,
  action: Action
): TGetVimeoVideosDataState => {
  switch (action.type) {
    case getType(getVimeoVideosStarted):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case GET_VIMEO_VIDEOS_DATA.success:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case GET_VIMEO_VIDEOS_DATA.failure:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return { ...state };
  }
};
