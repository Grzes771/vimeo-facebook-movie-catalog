import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import { getYoutubeVideosStarted } from './actions';

import { GET_YOUTUBE_VIDEOS_DATA } from './consts';

export type TGetYoutubeVideosDataState = {
  isLoading: boolean;
  isSuccess: boolean;
};

export const initialState: TGetYoutubeVideosDataState = {
  isLoading: false,
  isSuccess: false,
};

export const getYoutubeVideos = (
  state = initialState,
  action: Action
): TGetYoutubeVideosDataState => {
  switch (action.type) {
    case getType(getYoutubeVideosStarted):
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case GET_YOUTUBE_VIDEOS_DATA.success:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };

    case GET_YOUTUBE_VIDEOS_DATA.failure:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };

    default:
      return { ...state };
  }
};
