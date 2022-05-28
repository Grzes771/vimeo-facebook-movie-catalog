import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import { TVideosArrItem } from '../types/movie-item';
import { setYtFavoriteStarted } from './actions';

import { SET_YOUTUBE_FAVORITE } from './consts';

export type TSetYoutubeFavoriteDataState = {
  isLoading: boolean;
  isError: boolean;
  youtubeVideos: TVideosArrItem[];
};

export const initialState: TSetYoutubeFavoriteDataState = {
  isLoading: false,
  isError: false,
  youtubeVideos: [],
};

export const setYoutubeFavorite = (
  state = initialState,
  action: Action
): TSetYoutubeFavoriteDataState => {
  switch (action.type) {
    case getType(setYtFavoriteStarted):
      return {
        ...state,
        isLoading: true,
        isError: initialState.isError,
      };
    case SET_YOUTUBE_FAVORITE.success:
      return {
        ...state,
        isLoading: initialState.isLoading,
      };
    case SET_YOUTUBE_FAVORITE.failure:
      return {
        ...state,
        isLoading: initialState.isLoading,
        isError: true,
      };
    default:
      return { ...state };
  }
};
