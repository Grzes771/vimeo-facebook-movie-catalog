import { SagaIterator } from 'redux-saga';
import { getType } from 'typesafe-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getYoutubeData } from '../../common/axios/youtube-api';
import {
  getLocalStorage,
  FAV_VIDEOS,
  addItemToLS,
} from '../../helpers/local-storage';
import { getYoutubeVideosStarted } from './actions';

import * as C from './consts';
import { TVideosArrItem } from '../types/movie-item';

toast.configure();

export function* getYoutubeVideos({
  payload,
}: ReturnType<typeof getYoutubeVideosStarted>) {
  try {
    //@ts-ignore
    const request = yield call(getYoutubeData, payload.url);

    if (!request.data?.items?.length) {
      toast.error('Video not found');
      yield put({
        type: C.GET_YOUTUBE_VIDEOS_DATA.success,
      });
    }
    type TParsedYoutubeVideoArrItem = {
      id: string;
      statistics: {
        viewCount: number;
        likeCount: string;
      };
      snippet: {
        localized: {
          title: string;
        };
        thumbnails: {
          medium: {
            url: string;
          };
        };
      };
    };
    const parsedYoutubeVideos = request.data.items.map(
      (arrItem: TParsedYoutubeVideoArrItem) => ({
        path: arrItem?.id,
        viewsCount: arrItem?.statistics.viewCount,
        title: arrItem?.snippet.localized.title,
        thumbNails: arrItem?.snippet.thumbnails.medium.url,
        likes: arrItem?.statistics.likeCount,
        favorite: false,

        date: Date.now(),
        platform: 'youtube',
      })
    );

    const isAlreadyAdded = getLocalStorage(FAV_VIDEOS)?.some(
      (video: TVideosArrItem) => video.path === payload.url
    );

    if (!isAlreadyAdded && !!parsedYoutubeVideos[0])
      addItemToLS(parsedYoutubeVideos[0]);
    if (isAlreadyAdded) toast.error('Video is already added');

    yield put({
      type: C.GET_YOUTUBE_VIDEOS_DATA.success,
    });
  } catch (e) {
    toast.error('Something went wrong');

    yield put({
      type: C.GET_YOUTUBE_VIDEOS_DATA.failure,
    });
  }
}

export function* getSingleVideoSaga(): SagaIterator {
  yield takeLatest(getType(getYoutubeVideosStarted), getYoutubeVideos);
}
