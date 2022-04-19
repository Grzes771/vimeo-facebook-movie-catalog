import { getType } from 'typesafe-actions';
import { Action } from '../types/actions';
import { getSingleVimeoVideoStarted } from './actions';
import { GET_SINGLE_VIMEO_VIDEO_DATA } from './consts';

export type TGetSingleVimeoVideoDataState = {
  isLoading: boolean;
  isError: string;
  singleVimeoVideo: any | null | undefined;
};

export const initialState: any = {
  isLoading: false,
  isError: '',
  singleVimeoVideo: null,
};

export const getSingleVimeoVideo = (state = initialState, action: Action): any => {
  switch (action.type) {
    case getType(getSingleVimeoVideoStarted):

      return {
        ...state,
        isLoading: true,
        isError: initialState.isError,
        singleVimeoVideo: initialState.singleVimeoVideo,
      };
    case GET_SINGLE_VIMEO_VIDEO_DATA.success:
       console.log(action.payload, 'payload w reducerze vimeo success')
      return {
        ...state,
        isLoading: false,
        isError: initialState.isError,
        singleVimeoVideo: action.payload,
      };
    case GET_SINGLE_VIMEO_VIDEO_DATA.failure:
      return {
        ...state,
        isLoading: initialState.isLoading,
        isError: action.payload.error,
        singleVimeoVideo: initialState.singleVimeoVideo,
      };
    default:
      return { ...state };
  }
};
