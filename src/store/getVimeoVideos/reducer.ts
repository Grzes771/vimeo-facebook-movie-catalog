import { getType } from 'typesafe-actions';
import { vimeoDemo } from '../../common/demo/vimeoDemo';
import { Action } from '../types/actions';
import { TVideosArrItem } from '../types/movie-item';
import { getVimeoVideosStarted } from './actions';
import {
  GET_VIMEO_VIDEOS_DATA,
  SET_VIMEO_FAVORITE,
  CLEAR_VIMEO_VIDEOS_DATA,
  ADD_VIMEO_DEMO_DATA,
} from './consts';

export type TGetVimeoVideosDataState = {
  isLoading: boolean;
  isError: string;
  vimeoVideos: TVideosArrItem[];
};

export const initialState: TGetVimeoVideosDataState = {
  isLoading: false,
  isError: '',
  vimeoVideos: [],
};

export const getVimeoVideos = (state = initialState, action: Action): any => {
  switch (action.type) {
    case getType(getVimeoVideosStarted):
      return {
        ...state,
        isLoading: true,
        isError: initialState.isError,
      };
    case GET_VIMEO_VIDEOS_DATA.success:
      return {
        ...state,
        isLoading: false,
        isError: initialState.isError,
        vimeoVideos: state.vimeoVideos.some(
          (vimeoVideo) => vimeoVideo.path === action.payload[0].path
        )
          ? state.vimeoVideos
          : [...state.vimeoVideos, ...action.payload],
      };
    case GET_VIMEO_VIDEOS_DATA.failure:
      return {
        ...state,
        isLoading: initialState.isLoading,
        isError: action.payload.error,
      };
    case SET_VIMEO_FAVORITE:
      return {
        ...state,
        vimeoVideos: state.vimeoVideos.map((vimeoVideo) =>
          vimeoVideo.path === action.payload.url
            ? { ...vimeoVideo, favorite: !vimeoVideo.favorite }
            : vimeoVideo
        ),
      };
    case ADD_VIMEO_DEMO_DATA:
      return {
        ...state,
        vimeoVideos: vimeoDemo,
      };
    case CLEAR_VIMEO_VIDEOS_DATA:
      return {
        ...state,
        vimeoVideos: [],
      };
    default:
      return { ...state };
  }
};
