import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import { TVideosArrItem } from '../types/movie-item';
import { setVimeoFavoriteStarted } from './actions';

import { SET_VIMEO_FAVORITE } from './consts';

export type TSetVimeoFavoriteDataState = {
  isLoading: boolean;
  isError: boolean;
  vimeoVideos: TVideosArrItem[];
};

export const initialState: TSetVimeoFavoriteDataState = {
  isLoading: false,
  isError: false,
  vimeoVideos: [],
};

export const setVimeoFavorite = (
  state = initialState,
  action: Action
): TSetVimeoFavoriteDataState => {
  switch (action.type) {
    case getType(setVimeoFavoriteStarted):
      return {
        ...state,
        isLoading: true,
        isError: initialState.isError,
      };
    case SET_VIMEO_FAVORITE.success:
      return {
        ...state,
        isLoading: initialState.isLoading,
      };
    case SET_VIMEO_FAVORITE.failure:
      return {
        ...state,
        isLoading: initialState.isLoading,
        isError: true,
      };
    default:
      return { ...state };
  }
};
