import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import { deleteSingleVideoStarted } from './actions';

import { DELETE_SINGLE_VIDEO } from './consts';

export type TDeleteSingleVideoDataState = {
  isLoading: boolean;
  isError: boolean;
};

export const initialState: TDeleteSingleVideoDataState = {
  isLoading: false,
  isError: false,
};

export const deleteSingleVideo = (
  state = initialState,
  action: Action
): TDeleteSingleVideoDataState => {
  switch (action.type) {
    case getType(deleteSingleVideoStarted):
      return {
        ...state,
        isLoading: true,
        isError: initialState.isError,
      };
    case DELETE_SINGLE_VIDEO.success:
      return {
        ...state,
        isLoading: initialState.isLoading,
      };
    case DELETE_SINGLE_VIDEO.failure:
      return {
        ...state,
        isLoading: initialState.isLoading,
        isError: true,
      };
    default:
      return { ...state };
  }
};
