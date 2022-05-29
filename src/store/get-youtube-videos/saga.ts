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

import { TVideosArrItem } from '../types/movie-item';
import { EVideosPlatform } from 'types/video-list-context-enums';

import * as C from './consts';

toast.configure();

export function* getYoutubeVideos({
  payload,
}: ReturnType<typeof getYoutubeVideosStarted>) {
  try {
    //@ts-ignore
    const request = yield call(getYoutubeData, payload.url);

    if (!request.data?.items?.length) {
      toast.error('Nie znaleziono filmu');
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
        platform: EVideosPlatform.YOUTUBE,
      })
    );

    const isAlreadyAdded = getLocalStorage(FAV_VIDEOS)?.some(
      (video: TVideosArrItem) => video.path === payload.url
    );

    if (!isAlreadyAdded && !!parsedYoutubeVideos[0])
      addItemToLS(parsedYoutubeVideos[0]);
    if (isAlreadyAdded) toast.error('Ten film jest już dodany');

    yield put({
      type: C.GET_YOUTUBE_VIDEOS_DATA.success,
    });
  } catch (e) {
    toast.error('Coś poszło nie tak');

    yield put({
      type: C.GET_YOUTUBE_VIDEOS_DATA.failure,
    });
  }
}

export function* getSingleVideoSaga(): SagaIterator {
  yield takeLatest(getType(getYoutubeVideosStarted), getYoutubeVideos);
}
