import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import { getSingleVideoStarted } from './actions';
import { GET_SINGLE_VIDEO_DATA } from './consts';

export type TGetSingleVideoDataState = {
  isLoading: boolean;
  isError: string;
  singleVideoData: any | null | undefined;
};

export const initialState: any = {
  isLoading: false,
  isError: '',
  singleVideoData: null,
};

export const getSingleVideo = (state = initialState, action: Action): any => {
  switch (action.type) {
    case getType(getSingleVideoStarted):
   
      return {
        ...state,
        isLoading: true,
        isError: initialState.isError,
        singleVideoData: initialState.singleVideoData,
      };
    case GET_SINGLE_VIDEO_DATA.success:
   
      return {
        ...state,
        isLoading: false,
        isError: initialState.isError,
        singleVideoData: action.payload.items[0],
      };
    case GET_SINGLE_VIDEO_DATA.failure:
      return {
        ...state,
        isLoading: initialState.isLoading,
        isError: action.payload.error,
        singleVideoData: initialState.singleVideoData,
      };
    default:
      return { ...state };
  }
};
