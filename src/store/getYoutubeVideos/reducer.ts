import { getType } from 'typesafe-actions';
import { youtubeDemo } from '../../common/demo/youtube-demo';
import { Action } from '../types/actions';
import { TVideosArrItem } from '../types/movie-item';
import { getYoutubeVideosStarted } from './actions';
import {
  GET_YOUTUBE_VIDEOS_DATA,
  SET_YT_FAVORITE,
  CLEAR_YT_VIDEOS_DATA,
  ADD_YT_DEMO_DATA,
  DELETE_SINGLE_YT_VIDEO,
} from './consts';

export type TGetYoutubeVideosDataState = {
  isLoading: boolean;
  isError: string;
  youtubeVideos: TVideosArrItem[];
};

export const initialState: TGetYoutubeVideosDataState = {
  isLoading: false,
  isError: '',
  youtubeVideos: [],
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
        isError: initialState.isError,
      };
    case GET_YOUTUBE_VIDEOS_DATA.success:
      return {
        ...state,
        isLoading: false,
        isError: initialState.isError,
        youtubeVideos: state.youtubeVideos.some(
          (youtubeVideo) => youtubeVideo.path === action.payload[0].path
        )
          ? state.youtubeVideos
          : [...state.youtubeVideos, ...action.payload],
      };
    case GET_YOUTUBE_VIDEOS_DATA.failure:
      return {
        ...state,
        isLoading: initialState.isLoading,
        isError: action.payload.error,
      };
    case SET_YT_FAVORITE:
      return {
        ...state,
        youtubeVideos: state.youtubeVideos.map((youtubeVideo) =>
          youtubeVideo.path === action.payload.url
            ? { ...youtubeVideo, favorite: !youtubeVideo.favorite }
            : youtubeVideo
        ),
      };
    case DELETE_SINGLE_YT_VIDEO:
      return {
        ...state,
        youtubeVideos: state.youtubeVideos.filter(
          (arrItem) => arrItem.date !== action.payload.movie.date
        ),
      };

    case CLEAR_YT_VIDEOS_DATA:
      return {
        ...state,
        youtubeVideos: [],
      };
    case ADD_YT_DEMO_DATA:
      return {
        ...state,
        youtubeVideos: youtubeDemo,
      };
    default:
      return { ...state };
  }
};
