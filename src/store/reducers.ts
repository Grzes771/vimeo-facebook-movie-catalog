import { combineReducers } from 'redux';
import {
  getSingleVideo,
  TGetSingleVideoDataState,
} from './getSingleYoutubeVideo/reducer';
import { getSingleVimeoVideo, TGetSingleVimeoVideoDataState } from './getSingleVimeoVideo/reducer'

export type AppState = {
  getSingleVideo: TGetSingleVideoDataState;
  getSingleVimeoVideo: TGetSingleVimeoVideoDataState;
};
export const reducer = combineReducers<AppState>({
  getSingleVideo,
  getSingleVimeoVideo
});

export type RootState = ReturnType<typeof reducer>;
